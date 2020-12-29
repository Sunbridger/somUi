import { createVue, destroyVM } from '../util';

describe('Tabs', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('line-width', (done) => {
        vm = createVue({
            template: `
                <som-tabs :line-width="4">
                    <som-tab-item>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tabs__ink-bar').style.height).to.equal('4px');
            done();
        }, 200);
    });

    it('vertical', (done) => {
        vm = createVue({
            template: `
                <som-tabs :line-width="4" vertical>
                    <som-tab-item selected>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tabs__ink-bar').style.width).to.equal('4px');
            done();
        }, 200);
    });

    it('active-color', (done) => {
        vm = createVue({
            template: `
                <som-tabs active-color="rgb(255, 255, 255)">
                    <som-tab-item selected>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-tab-label')[0].style.color).to.equal('rgb(255, 255, 255)');
            done();
        }, 200);
    });

    it('default-color', (done) => {
        vm = createVue({
            template: `
                <som-tabs default-color="rgb(255, 255, 255)">
                    <som-tab-item>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-tab-label')[0].style.color).to.equal('rgb(255, 255, 255)');
            done();
        }, 200);
    });

    it('disabled-color', (done) => {
        vm = createVue({
            template: `
                <som-tabs disabled-color="rgb(255, 255, 255)">
                    <som-tab-item disabled>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-tab-label')[0].style.color).to.equal('rgb(255, 255, 255)');
            done();
        }, 200);
    });

    it('bar-active-color', (done) => {
        vm = createVue({
            template: `
                <som-tabs bar-active-color="rgb(255, 255, 255)">
                    <som-tab-item selected>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tabs-bar-inner').style.backgroundColor).to.equal('rgb(255, 255, 255)');
            done();
        }, 200);
    });

    it('custom-bar-width', (done) => {
        vm = createVue({
            template: `
                <som-tabs custom-bar-width="60px">
                    <som-tab-item selected>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tabs-bar-inner').style.width).to.equal('60px');
            done();
        }, 200);
    });

    it('custom-bar-width function', (done) => {
        vm = createVue({
            template: `
                <som-tabs :custom-bar-width="getBarWidth">
                    <som-tab-item>未发货</som-tab-item>
                    <som-tab-item selected>全部订单</som-tab-item>
                </som-tabs>
            `,
            data () {
                return {
                    getBarWidth: function (index) {
                        return (index + 1) * 22 + 'px'; // eslint-disable-line
                    }
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tabs-bar-inner').style.width).to.equal('44px');
            done();
        }, 200);
    });

    it('prevent-default', (done) => {
        vm = createVue({
            template: `
                <som-tabs :prevent-default="true">
                    <som-tab-item selected>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-tab-item')[1].click();
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-tab-item')[0].classList.contains('som-tab-selected')).to.be.true;
                expect(vm.$el.querySelectorAll('.som-tab-item')[1].classList.contains('som-tab-selected')).not.to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('on-item-click', (done) => {
        vm = createVue({
            template: `
                <som-tabs>
                    <som-tab-item>未发货</som-tab-item>
                    <som-tab-item @on-item-click="handleClick">全部订单</som-tab-item>
                </som-tabs>
            `,
            data () {
                return {
                    index: ''
                };
            },
            methods: {
                handleClick (index) {
                    this.index = index;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-tab-item')[1].click();
            setTimeout(() => {
                expect(vm.index).to.equal(1);
                done();
            }, 300);
        }, 200);
    });

    it('on-index-change', (done) => {
        vm = createVue({
            template: `
                <som-tabs @on-index-change="handleClick">
                    <som-tab-item>未发货</som-tab-item>
                    <som-tab-item>全部订单</som-tab-item>
                </som-tabs>
            `,
            data () {
                return {
                    index: ''
                };
            },
            methods: {
                handleClick (val) {
                    this.index = val;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-tab-item')[1].click();
            setTimeout(() => {
                expect(vm.index).to.equal(1);
                done();
            }, 300);
        }, 200);
    });
});

