import ActionSheet from 'components/action-sheet';
import { createVue, destroyVM } from '../util';

describe('ActionSheet', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('show', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-action-sheet v-model="show" show-cancel></som-action-sheet>
                </div>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-mask')).to.exist;
            done();
        }, 200);
    });

    it('close-on-clicking-mask', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-action-sheet v-model="show" show-cancel :close-on-clicking-mask="mask"></som-action-sheet>
                </div>
            `,
            data () {
                return {
                    show: true,
                    mask: true
                };
            }
        }, true);
        setTimeout(() => {
            let mask = vm.$el.querySelector('.som-mask');
            expect(vm.$el.querySelector('.som-mask')).to.exist;
            mask.click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-mask').classList.contains('som-actionsheet-mask-leave-active')).to.be.true;
                vm.show = true;
                vm.mask = false;
                setTimeout(() => {
                    mask.click();
                    setTimeout(() => {
                        expect(vm.$el.querySelector('.som-mask').classList.contains('som-actionsheet-mask-leave-active')).not.to.true;
                        done();
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });

    it('close-on-clicking-menu', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-action-sheet v-model="show" show-cancel :close-on-clicking-menu="menu" :menus="menus"></som-action-sheet>
                </div>
            `,
            data () {
                return {
                    show: true,
                    menu: true,
                    menus: {
                        menu1: '分享给朋友',
                        menu2: '分享到朋友圈'
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let menus = vm.$el.querySelectorAll('.som-actionsheet__cell');
            menus[0].click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-mask').classList.contains('som-actionsheet-mask-leave-active')).to.be.true;
                vm.show = true;
                vm.menu = false;
                setTimeout(() => {
                    menus[0].click();
                    setTimeout(() => {
                        expect(vm.$el.querySelector('.som-mask').classList.contains('som-actionsheet-mask-leave-active')).not.to.true;
                        done();
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });

    it('event on-click-menu', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-action-sheet v-model="show" :menus="menus" @on-click-menu="click"></som-action-sheet>
                </div>
            `,
            data () {
                return {
                    item: '',
                    show: true,
                    menus: {
                        menu1: '分享给朋友',
                        'menu1.noop': '分享到朋友圈'
                    }
                };
            },
            methods: {
                click (key, item) {
                    this.item = item;
                }
            }
        }, true);
        setTimeout(() => {
            let menus = vm.$el.querySelectorAll('.som-actionsheet__cell');
            menus[0].click();
            setTimeout(() => {
                expect(vm.item).to.equal('分享给朋友');
                menus[1].click();
                setTimeout(() => {
                    expect(vm.item).to.equal('分享给朋友');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('menu object', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-action-sheet v-model="show" :menus="menus" @on-click-menu="click"></som-action-sheet>
                </div>
            `,
            data () {
                return {
                    item: '',
                    show: true,
                    menus: [{
                        label: 'Actionsheet header',
                        type: 'info'
                    }, {
                        label: 'Primary',
                        type: 'primary',
                        value: 'primary',
                        otherProp: 'hey'
                    }, {
                        label: 'Warn',
                        type: 'warn'
                    }, {
                        label: 'Disabled',
                        type: 'disabled'
                    }, {
                        label: 'Default'
                    }]
                };
            },
            methods: {
                click (key, item) {
                    this.item = item;
                }
            }
        }, true);
        setTimeout(() => {
            let menus = vm.$el.querySelectorAll('.som-actionsheet__cell');
            menus[0].click();
            setTimeout(() => {
                expect(vm.item.type).to.equal('info');
                menus[3].click();
                setTimeout(() => {
                    expect(vm.item.label).to.equal('Actionsheet header');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

});

