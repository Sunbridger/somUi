import Switch from 'components/switch';
import { createTest, createVue, destroyVM } from '../util';

describe('Switch', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(Switch, {
            title: 'switch'
        }, true);
        expect(vm.$el).to.exist;
    });

    it('title', () => {
        vm = createTest(Switch, {
            title: '<span style="color:red">我是红色</span>'
        }, true);
        expect(vm.$el.querySelector('.som-list-item-label span')).to.exist;
        expect(vm.$el.querySelector('.som-list-item-label span').textContent).to.equal('我是红色');
    });

    it('disabled', () => {
        vm = createTest(Switch, {
            title: 'switch',
            disabled: true
        }, true);
        expect(vm.$el.querySelector('.som-switch__ft input').disabled).to.be.true;
    });

    it('value', (done) => {
        vm = createTest(Switch, {
            title: 'switch',
            value: true
        }, true);
        expect(vm.currentValue).to.be.true;
        vm.value = false;
        setTimeout(() => {
            expect(vm.currentValue).to.be.false;
            done();
        }, 100);
    });

    it('inline-desc', () => {
        vm = createTest(Switch, {
            title: 'switch',
            inlineDesc: '描述'
        }, true);
        expect(vm.$el.querySelector('.som-list-item__label-desc')).to.exist;
        expect(vm.$el.querySelector('.som-list-item__label-desc').textContent).to.equal('描述');
    });

    it('prevent-default', (done) => {
        vm = createTest(Switch, {
            title: 'switch',
            preventDefault: true
        }, true);
        vm.$el.querySelector('.som-switch__ft--overlay').click();
        setTimeout(() => {
            expect(vm.currentValue).to.be.false;
            done();
        });
    });

    it('value-map', () => {
        vm = createTest(Switch, {
            title: 'switch',
            valueMap: ['0', '1'],
            value: '1'
        }, true);
        expect(vm.currentValue).to.be.true;
    });

    it('on-change', (done) => {
        vm = createVue({
            template: `
                <som-switch title="默认 false" @on-change="handleChange"></som-switch>
            `,
            data () {
                return {
                    value: false
                };
            },
            methods: {
                handleChange(currentValue) {
                    this.value = currentValue;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.som-switch__ft__input').click();
            setTimeout(() => {
                expect(vm.value).to.be.true;
                done();
            }, 100);
        }, 100);
    });

    it('on-click', (done) => {
        vm = createVue({
            template: `
                <som-switch title="默认 false" @on-click="handleClick" prevent-default></som-switch>
            `,
            data () {
                return {
                    oldVal: '',
                    newVal: ''
                };
            },
            methods: {
                handleClick(newVal, oldVal) {
                    this.newVal = newVal;
                    this.oldVal = oldVal;
                }
            }
        }, true);

        setTimeout(() => {
            vm.$el.querySelector('.som-switch__ft--overlay').click();
            setTimeout(() => {
                expect(vm.newVal).to.be.true;
                expect(vm.oldVal).to.be.false;
                done();
            }, 100);
        }, 100);
    });

    it('single-button', () => {
        vm = createTest(Switch, {
            singleButton: true
        }, true);

        expect(vm.$el.classList.contains('som-switch__ft')).to.true;
        expect(vm.$el.classList.contains('som-switch')).to.false;
    });

});
