import Vue from 'vue';
import ConfigPlugin from 'som-ui/src/plugins/config';
import { createVue, destroyVM } from '../util';

Vue.use(ConfigPlugin, {
    $layout: 'VIEW_BOX'
});

describe('Popup', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('show-mask', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" :show-mask="false">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        vm.show = false;
        setTimeout(() => {
            // console.log(document.querySelectorAll('.som-popup-mask'));
            // expect(document.querySelector('.som-popup-mask').classList.contains('som-popup-show')).to.be.false;
            done();
        }, 1000);
    });

    it('value', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.classList.contains('som-popup-show')).to.be.true;
            done();
        }, 200);
    });

    it('height', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" height="300px" >
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.height).to.equal('300px');
            done();
        }, 200);
    });

    it('hide-on-blur', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" :hide-on-blur="false">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            let mask = document.querySelector('.som-popup-mask');
            mask.click();
            setTimeout(() => {
                expect(vm.$el.classList.contains('som-popup-show')).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('width', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" width="300px" position="right">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.width).to.equal('300px');
            done();
        }, 200);
    });

    it('on-hide', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" @on-hide="handleHide">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true,
                    hide: false
                };
            },
            methods: {
                handleHide () {
                    this.hide = true;
                }
            }
        }, true);
        setTimeout(() => {
            vm.show = false;
            setTimeout(() => {
                expect(vm.hide).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('on-show', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" @on-show="handleShow">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: false,
                    showed: false
                };
            },
            methods: {
                handleShow () {
                    this.showed = true;
                }
            }
        }, true);
        setTimeout(() => {
            vm.show = true;
            setTimeout(() => {
                expect(vm.showed).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('is-transparent', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" height="300px" is-transparent>
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.background).to.equal('');
            done();
        }, 200);
    });

    it('max-height', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" max-height="500px">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.maxHeight).to.equal('500px');
            done();
        }, 200);
    });

    it('popupStyle', (done) => {
        vm = createVue({
            template: `
                <som-popup v-model="show" :popupStyle="popupStyle">
                    <div class="popup0">
                        hahahahahhaahahahh
                    </div>
                </som-popup>
            `,
            data () {
                return {
                    show: true,
                    popupStyle: {
                        color: 'red'
                    }
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.color).to.equal('red');
            done();
        }, 200);
    });

});

