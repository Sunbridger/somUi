import { createVue, destroyVM } from '../util';

describe('Select', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('render', (done) => {
        vm = createVue({
            template: `
                <som-list label-width="4em">
                    <som-select 
                        title="套餐"
                        v-model="value"
                        :options="options">
                    </som-select>
                </som-list>
            `,
            data () {
                return {
                    value: 2,
                    options: [
                        {text: '选项一', value: 1},
                        {text: '选项二', value: 2},
                        {text: '选项三', value: 3},
                        {text: '选项四', value: 4}
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('input');
            expect(input.value).to.equal('选项二');
            expect(vm.$el.querySelector('.som-input__label').textContent).to.equal('套餐');
            expect(vm.$el.querySelector('.som-input__label').style.width).to.equal('4em');
            expect(vm.$el.querySelector('.arrow.som-icon-arrow-right')).to.exist;
            input.click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-popup-show')).to.exist;
                done();
            }, 200);
        }, 500);
    });

    it('disabled', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-select 
                        ref="select"
                        disabled
                        title="套餐"
                        v-model="value"
                        :options="options">
                    </som-select>
                </som-list>
            `,
            data () {
                return {
                    value: '',
                    options: [
                        {text: '选项一', value: 1}
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('input');
            input.click();
            setTimeout(() => {
                expect(vm.$refs.select.show).to.be.false;
                done();
            }, 200);
        }, 200);
    });

    it('value async', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-select 
                        v-model="value"
                        :options="options">
                    </som-select>
                </som-list>
            `,
            data () {
                return {
                    value: '',
                    options: [
                        {text: '选项一', value: 1},
                        {text: '选项二', value: 2},
                        {text: '选项三', value: 3},
                        {text: '选项四', value: 4}
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            vm.value = 1;
            setTimeout(() => {
                expect(vm.$el.querySelector('input').value).to.equal('选项一');
                done();
            }, 200);
        }, 200);
    });

    it('options async', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-select 
                        v-model="value"
                        :options="options">
                    </som-select>
                </som-list>
            `,
            data () {
                return {
                    value: 1,
                    options: []
                };
            }
        }, true);
        setTimeout(() => {
            vm.options = [{text: '哈哈哈哈', value: 1}];
            setTimeout(() => {
                expect(vm.$el.querySelector('input').value).to.equal('哈哈哈哈');
                done();
            }, 500);
        }, 200);
    });

    it('slot', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-select 
                        show-toolbar
                        :options="options">
                        <span slot="label" style="color: red; margin-right: 12px">自定义</span>
                    </som-select>
                </som-list>
            `,
            data () {
                return {
                    value: 1,
                    options: []
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-list-item__hd').textContent).to.equal('自定义');
            done();
        }, 200);
    });

    it('on-change', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-select 
                        ref="select"
                        title="套餐"
                        :show-toolbar="false"
                        @on-change="handleChange"
                        v-model="value"
                        :options="options">
                    </som-select>
                </som-list>
            `,
            data () {
                return {
                    value: 2,
                    label: '',
                    options: [
                        {text: '选项一', value: 1},
                        {text: '选项二', value: 2},
                        {text: '选项三', value: 3},
                        {text: '选项四', value: 4}
                    ]
                };
            },
            methods: {
                handleChange (val, item) {
                    this.label = item.text;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$refs.select.handleChange('none', {text: '选项三', value: 3}, 2);
            setTimeout(() => {
                expect(vm.label).to.equal('选项三');
                done();
            }, 400);
        }, 200);
    });
});

