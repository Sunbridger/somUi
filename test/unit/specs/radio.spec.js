import Radio from 'components/radio';
import { createTest, createVue, destroyVM, triggerEvent } from '../util';

describe('radio', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });
    it('radio mode button', () => {
        vm = createTest(Radio, {
            title: '国家',
            options: ['china', 'japan']
        }, true);
        expect(vm.$el.querySelector('.som-radio--button')).to.exist;
        expect(vm.$el.querySelector('.som-radio--button .som-list-item__hd').textContent).to.equal('国家');
        expect(vm.$el.querySelectorAll('.som-radio--button .som-radio-button .som-radio__ft').length).to.equal(2);
    });

    it('radio mode icon', () => {
        vm = createTest(Radio, {
            mode: 'icon',
            options: ['china', 'japan']
        }, true);
        expect(vm.$el.querySelector('.som-radio--button')).not.to.exist;
        expect(vm.$el.querySelectorAll('.som-radio__label').length).to.equal(2);
        expect(vm.$el.querySelectorAll('.som-radio__label')[0].querySelector('.som-radio-label').textContent).to.equal('china');
    });

    it('radio fill-mode', () => {
        vm = createTest(Radio, {
            mode: 'icon',
            options: ['china', 'japan'],
            fillMode: true,
            fillPlaceholder: '请输入其他国家',
            fillLabel: '其他'
        }, true);
        expect(vm.$el.querySelectorAll('.som-list-item').length).to.equal(3);
        let inputContainer = vm.$el.querySelectorAll('.som-list-item')[2];
        expect(inputContainer.querySelector('.som-list-item__hd').textContent).to.equal('其他');
        expect(inputContainer.querySelector('.som-radio-input').placeholder).to.equal('请输入其他国家');
    });

    it('radio button disabled', () => {
        vm = createTest(Radio, {
            title: '国家',
            options: ['china', 'japan'],
            disabled: true
        }, true);
        expect(vm.$el.querySelector('.som-radio--button-disabled')).to.exist;
        expect(vm.$el.querySelector('.som-radio-check').disabled).to.be.true;
    });

    it('radio icon disabled', () => {
        vm = createTest(Radio, {
            mode: 'icon',
            options: ['china', 'japan'],
            disabled: true
        }, true);
        expect(vm.$el.querySelector('.som-radio-check').disabled).to.be.true;
    });

    it('radio value', (done) => {
        vm = createVue({
            template: `
                <som-radio 
                    :options="value" 
                    @on-change="change" 
                    title="是否换置新车" 
                    v-model="v">
                </som-radio>
            `,
            data () {
                return {
                    value: [{
                        key: '是',
                        value: true
                    }, {
                        key: '否',
                        value: false
                    }],
                    v: true,
                    label: ''
                };
            },
            methods: {
                change (value, label) {
                    this.label = label;
                }
            }
        }, true);

        setTimeout(() => {
            let value1 = vm.$el.querySelectorAll('.som-radio__ft')[0];
            let value2 = vm.$el.querySelectorAll('.som-radio__ft')[1];
            expect(value1.querySelector('.som-radio-label').classList.contains('som-radio-label-selected')).to.true;
            value2.querySelector('.som-radio-check').click();
            setTimeout(() => {
                expect(value2.querySelector('.som-radio-label').classList.contains('som-radio-label-selected')).to.true;
                expect(vm.label).to.equal('否');
                expect(vm.v).to.false;
                done();
            }, 200);
        }, 200);
    });

    it('radio icon value', (done) => {
        vm = createVue({
            template: `
                <som-radio 
                    :options="value"
                    mode="icon"
                    @on-change="change" 
                    v-model="v">
                </som-radio>
            `,
            data () {
                return {
                    value: [{
                        key: '中国',
                        value: 'china'
                    }, {
                        key: '日本',
                        value: 'japan'
                    }],
                    v: 'china',
                    label: ''
                };
            },
            methods: {
                change (value, label) {
                    this.label = label;
                }
            }
        }, true);

        setTimeout(() => {
            let label1 = vm.$el.querySelectorAll('.som-radio__bd')[0];
            let label2 = vm.$el.querySelectorAll('.som-radio__bd')[1];
            let value2 = vm.$el.querySelectorAll('.som-radio__ft')[1];
            expect(label1.querySelector('.som-radio-label').classList.contains('som-radio-label-selected')).to.true;
            value2.querySelector('.som-radio-check').click();
            setTimeout(() => {
                expect(label2.querySelector('.som-radio-label').classList.contains('som-radio-label-selected')).to.true;
                expect(vm.label).to.equal('日本');
                expect(vm.v).to.equal('japan');
                done();
            }, 200);
        }, 200);
    });

    it('radio fillmode value', (done) => {
        vm = createVue({
            template: `
                <som-radio 
                    :options="value"
                    mode="icon"
                    fillMode
                    @on-change="change" 
                    v-model="v">
                </som-radio>
            `,
            data () {
                return {
                    value: [{
                        key: '中国',
                        value: 'china'
                    }, {
                        key: '日本',
                        value: 'japan'
                    }],
                    v: '',
                    label: ''
                };
            },
            methods: {
                change (value, label) {
                    this.label = label;
                }
            }
        }, true);

        setTimeout(() => {
            let fillInput = vm.$el.querySelector('.som-radio-input');
            fillInput.value = 'spalish';
            triggerEvent(fillInput, 'input');
            triggerEvent(fillInput, 'focus');
            setTimeout(() => {
                expect(vm.v).to.equal('spalish');
                fillInput.value = '中国';
                triggerEvent(fillInput, 'input');
                fillInput.focus();
                setTimeout(() => {
                    expect(vm.v).to.equal('');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });
});
