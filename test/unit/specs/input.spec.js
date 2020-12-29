import Input from 'components/input';
import { createVue, destroyVM, triggerEvent } from '../util';

describe('Input', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('no title', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input></som-input>
                </som-list>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-input__label')).not.to.exist;
            expect(vm.$el.querySelector('input').placeholder).to.equal('请输入');
            done();
        }, 200);
    });

    it('title', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh"></som-input>
                </som-list>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-input__label').textContent).to.equal('hhh');
            done();
        }, 200);
    });

    it('input text-algin', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input text-align="center" ref="input"></som-input>
                </som-list>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$refs.input.$refs.input.style.textAlign).to.equal('center');
            done();
        }, 200);
    });

    it('clear icon', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" ref=input v-model="value" :show-clear="clear"></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '111111',
                    clear: true
                };
            }
        }, true);
        setTimeout(() => {
            let clearbtn = vm.$el.querySelector('.som-icon-circle-close');
            clearbtn.click();
            setTimeout(() => {
                expect(vm.value).to.equal('');
                vm.clear = 333;
                vm.clear = false;
                setTimeout(() => {
                    expect(vm.$el.querySelector('.som-icon-circle-close').style.display).to.equal('none');
                    done();
                });
            }, 200);
        }, 200);
    });

    it('on-change', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" ref=input v-model="value" @on-change="change"></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '111111',
                    val: '',
                    clear: true
                };
            },
            methods: {
                change (val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$refs.input.focus();
            vm.$el.querySelector('input').value = '2222';
            vm.$refs.input.blur();
            setTimeout(() => {
                expect(vm.val).to.equal(vm.value);
                done();
            });
        }, 200);
    });

    it('max min', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" :max="5" :min="3" v-model="value" ref="input" required></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '333'
                };
            }
        }, true);
        setTimeout(() => {
            vm.value = '3';
            setTimeout(() => {
                let err = vm.$refs.input.errors;
                expect(err.min).to.equal('最少应该输入3个字符哦');
                vm.value = '999999';
                setTimeout(() => {
                    let err = vm.$refs.input.errors;
                    expect(err.max).to.equal('最多可以输入5个字符哦');
                    done();
                }, 300);
            }, 300);
        }, 200);
    });

    it('required', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" v-model="value" ref="input" required></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '333'
                };
            }
        }, true);
        setTimeout(() => {
            vm.value = '';
            setTimeout(() => {
                let err = vm.$refs.input.errors;
                expect(err.required).to.equal('必填哦');
                done();
            }, 300);
        }, 200);
    });

    it('is-type', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" v-model="value" ref="input" :is-type="checkIdCard"></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '333',
                    checkIdCard: function (value) {
                        return {
                            valid: (/\d{17}[\dX]$/).test(value),
                            msg: '请输入正确证件号'
                        };
                    }
                };
            }
        }, true);
        setTimeout(() => {
            let err = vm.$refs.input.errors;
            expect(err.format).to.equal('请输入正确证件号');
            vm.value = '513029199604129345';
            setTimeout(() => {
                err = vm.$refs.input.errors;
                expect(err.format).not.to.exist;
                done();
            }, 200);
        }, 200);
    });

    it('on-click-error-icon', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" :max="2" v-model="value" ref="input" 
                        required 
                        show-warn
                        @on-click-error-icon="handleError"></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '333',
                    err: ''
                };
            },
            methods: {
                handleError (err) {
                    this.err = err;
                }
            }
        }, true);
        setTimeout(() => {
            let errorIcon = vm.$el.querySelectorAll('.som-input__icon')[1];
            errorIcon.click();
            setTimeout(() => {
                expect(vm.err).to.equal('最多可以输入2个字符哦');
                done();
            }, 200);
        }, 200);
    });

    it('equal-with', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="密码" type="text" v-model="password" :min="6" :max="6"></som-input>
                    <som-input title="密码" v-model="password2" type="text" :equal-with="password" ref="input"></som-input>
                </som-list>
                `,
            data () {
                return {
                    password: '123456',
                    password2: '123',
                    err: ''
                };
            },
            methods: {
                handleError (err) {
                    this.err = err;
                }
            }
        }, true);
        setTimeout(() => {
            let err = vm.$refs.input.errors;
            expect(err.equal).not.to.exist;
            expect(vm.$el.querySelectorAll('.som-input__icon')[2].style.display).to.equal('none');
            vm.password2 = '123457';
            setTimeout(() => {
                err = vm.$refs.input.errors;
                expect(err.equal).to.equal('输入不一致');
                vm.password2 = '123456';
                setTimeout(() => {
                    err = vm.$refs.input.errors;
                    expect(err.equal).not.to.exist;
                    vm.password = '12345';
                    setTimeout(() => {
                        expect(vm.$el.querySelectorAll('.som-input__icon')[2].style.display).to.equal('none');
                        done();
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });

    it('mask', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title="hhh" v-model="value" :mask="mask"></som-input>
                </som-list>
                `,
            data () {
                return {
                    value: '1234567',
                    mask: '9999 999'
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.value).to.equal('1234 567');
            vm.mask = '999 9999';
            setTimeout(() => {
                expect(vm.value).to.equal('123 4567');
                done();
            }, 200);
        }, 200);
    });

    it('number-range', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-input title='价格区间' type="number-range" v-model="rangeVal" @on-change="change" ref="input">
                        <span slot="right" :style="{ 'color': '#1a1a1a' }">万元</span>
                    </som-input>
                </som-list>
                `,
            data () {
                return {
                    rangeVal: { min: '22', max: '333'},
                    val: ''
                };
            },
            methods: {
                change (val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            expect(vm.$refs.input.$refs.input1.value).to.equal('22');
            expect(vm.$refs.input.$refs.input2.value).to.equal('333');

            vm.$refs.input.$refs.input2.value = '456789';
            triggerEvent(vm.$refs.input.$refs.input2, 'input');
            setTimeout(() => {
                expect(vm.val.max).to.equal('456789');
                expect(vm.$refs.input.$refs.input2.style.fontSize).to.equal('14px');
                expect(vm.rangeVal.max).to.equal('456789');
                vm.rangeVal.min = '123456';
                setTimeout(() => {
                    expect(vm.$refs.input.$refs.input1.style.fontSize).to.equal('14px');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

});

