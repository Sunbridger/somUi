import Keyboard from 'components/keyboard';
import { createVue, destroyVM, triggerTouch} from '../util';

describe('Keyboard', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('auto focus', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-keyboard :keyboard-parme='keyboardParme'></som-keyboard>
                </som-list>
                `,
            data () {
                return {
                    keyboardParme: {
                        isShow: true
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let keyboard = vm.$el.querySelector('.som-keyboard--content');
            expect(keyboard.style.display).to.not.equal('none');
            done();
        }, 200);
    });
    it('confirmButtonText', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-keyboard :keyboard-parme='keyboardParme'></som-keyboard>
                </som-list>
                `,
            data () {
                return {
                    keyboardParme: {
                        confirmButtonText: '确定'
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let keyboard = vm.$el.querySelector('.som-keyboard--title span');
            expect(keyboard.innerHTML).to.equal('确定');
            done();
        }, 200);
    });
    it('show', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-keyboard></som-keyboard>
                </som-list>
                `
        }, true);
        setTimeout(() => {
            let inputs = vm.$el.querySelector('.som-keyboard--input');
            let left = inputs.getBoundingClientRect().left + 15;
            let top = inputs.getBoundingClientRect().top + 15;
            triggerTouch(inputs, 'touchstart', left, top);
            triggerTouch(inputs, 'touchend', left, top);
            setTimeout(() => {
                let keyboard = vm.$el.querySelector('.som-keyboard--content');
                expect(keyboard.style.display).to.not.equal('none');
                done();
            }, 200);
        }, 200);
    });
    it('position-fixed', (done) => {
        vm = createVue({
            template: `
                <div :style="styleObj" id='som-keyboard-fixbox'>
                    <som-list>
                        <som-keyboard></som-keyboard>
                    </som-list>
                </div>
                `,
            data () {
                return {
                    styleObj: {
                        position: 'fixed',
                        bottom: 0
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let inputs = vm.$el.querySelector('.som-keyboard--input');
            let left = inputs.getBoundingClientRect().left + 15;
            let top = inputs.getBoundingClientRect().top + 15;
            triggerTouch(inputs, 'touchstart', left, top);
            triggerTouch(inputs, 'touchend', left, top);
            let keyboard = document.getElementById('som-keyboard-fixbox');
            setTimeout(() => {
                expect(keyboard.style.bottom).to.not.equal('0');
                done();
            }, 200);
        }, 200);
    });
    it('position-absolute-keyboard-Show', (done) => {
        vm = createVue({
            template: `
                <div :style="parStyleObj" id='som-keyboard-rebox'>
                    <div :style="chiStyleObj" id="som-keyboard-abbox">
                        <som-list>
                            <som-keyboard></som-keyboard>
                        </som-list>
                    </div>
                </div>
                `,
            data () {
                return {
                    parStyleObj: {
                        position: 'relative',
                        height: '900px'
                    },
                    chiStyleObj: {
                        position: 'absolute',
                        top: '800px'
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let inputs = vm.$el.querySelector('.som-keyboard--input');
            let left = inputs.getBoundingClientRect().left + 15;
            let top = inputs.getBoundingClientRect().top + 15;
            triggerTouch(inputs, 'touchstart', left, top);
            triggerTouch(inputs, 'touchend', left, top);
            setTimeout(() => {
                let keyboard = document.getElementById('som-keyboard');
                expect(keyboard.style.display).to.not.equal('none');
                done();
            }, 200);
        }, 200);
    });
    it('position-absolute-input-top', (done) => {
        vm = createVue({
            template: `
                <div :style="parStyleObj" id='som-keyboard-rebox'>
                    <div :style="chiStyleObj" id="som-keyboard-abbox">
                        <som-list>
                            <som-keyboard></som-keyboard>
                        </som-list>
                    </div>
                </div>
                `,
            data () {
                return {
                    parStyleObj: {
                        position: 'relative',
                        height: '900px'
                    },
                    chiStyleObj: {
                        position: 'absolute',
                        top: '800px'
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let inputs = vm.$el.querySelector('.som-keyboard--input');
            let left = inputs.getBoundingClientRect().left + 15;
            let top = inputs.getBoundingClientRect().top + 15;
            triggerTouch(inputs, 'touchstart', left, top);
            triggerTouch(inputs, 'touchend', left, top);
            let scrollTopOld = document.documentElement.scrollTop
            || document.body.scrollTop
            || window.pageYOffset;
            setTimeout(() => {
                let scrollTopNow = document.documentElement.scrollTop
                || document.body.scrollTop
                || window.pageYOffset;
                expect(scrollTopOld === scrollTopNow).to.equal(false);
                done();
            }, 200);
        }, 200);
    });
    it('on-confirme-del', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-keyboard :keyboard-parme='keyboardParme' @on-confirm='change'></som-keyboard>
                </som-list>
                `,
            data () {
                return {
                    val: '',
                    keyboardParme: {
                        isShow: true
                    }
                };
            },
            methods: {
                change (val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            let keys = vm.$el.querySelectorAll('.som-keyboard--keys--item');
            function touchenv (index) {
                let left = keys[index].getBoundingClientRect().left + 15;
                let top = keys[index].getBoundingClientRect().top + 15;
                triggerTouch(keys[index], 'touchstart', left, top);
                triggerTouch(keys[index], 'touchend', top, top);
            }
            touchenv(0);
            touchenv(2);
            touchenv(8);
            touchenv(11);
            let confirmBtn = vm.$el.querySelector('.som-keyboard--title').querySelector('span');
            let left = confirmBtn.getBoundingClientRect().left + 15;
            let top = confirmBtn.getBoundingClientRect().top + 15;
            triggerTouch(confirmBtn, 'touchstart', left, top);
            triggerTouch(confirmBtn, 'touchend', top, top);
            setTimeout(() => {
                expect(vm.val).to.equal('13');
                done();
            }, 200);
        }, 400);
    });
});

