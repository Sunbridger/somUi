import Vue from 'vue';
import ModalPlugin from 'som-ui/src/plugins/modal';
import { createVue, destroyVM, triggerEvent } from '../util';

Vue.use(ModalPlugin);

describe('Modal', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('show', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    title="操作提示"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: false
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-mask').style.display).to.equal('none');
            vm.show = true;
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-fade-enter-active')).to.exist;
                expect(vm.$el.querySelector('.som-modal__title').textContent).to.equal('操作提示');
                expect(vm.$el.querySelector('.som-modal__bd > div').textContent).to.equal('哈哈哈哈');
                done();
            }, 200);
        }, 200);
    });

    it('show-input', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    show-input
                    placeholder="请输入"
                    title="操作提示"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-prompt')).to.exist;
            expect(vm.$el.querySelector('.som-prompt > input').placeholder).to.equal('请输入');
            done();
        }, 200);
    });

    it('is-confirm', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    isConfirm
                    title="操作提示"
                    confirm-text="yes"
                    cancel-text="no"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-modal__ft > a')[0].textContent).to.equal('no');
            expect(vm.$el.querySelectorAll('.som-modal__ft > a')[1].textContent).to.equal('yes');
            done();
        }, 200);
    });

    it('android theme', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    theme="android"
                    title="操作提示"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-skin_android')).to.exist;
            done();
        }, 200);
    });

    it('hide-on-blur', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    hide-on-blur
                    title="操作提示"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            let mask = vm.$el.querySelector('.som-mask');
            mask.click();
            setTimeout(() => {
                expect(vm.show).to.be.false;
                done();
            }, 200);
        }, 200);
    });

    it('event on-cancel', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    isConfirm
                    @on-cancel="handleCancel"
                    title="操作提示"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: true,
                    isCancel: false
                };
            },
            methods: {
                handleCancel () {
                    this.isCancel = true;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-modal__ft > a')[0].click();
            setTimeout(() => {
                expect(vm.isCancel).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('event on-confirm', (done) => {
        vm = createVue({
            template: `
                <som-modal v-model="show"
                    isConfirm
                    show-input
                    @on-confirm="handleConfirm"
                    title="操作提示"
                    content="哈哈哈哈">
                </som-modal>
            `,
            data () {
                return {
                    show: true,
                    value: ''
                };
            },
            methods: {
                handleConfirm (v) {
                    this.value = v;
                }
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('.som-prompt > input');
            input.value = 'i defend';
            triggerEvent(input, 'input');
            vm.$el.querySelectorAll('.som-modal__ft > a')[1].click();
            setTimeout(() => {
                expect(vm.value).to.equal('i defend');
                done();
            }, 200);
        }, 200);
    });

    it('plugin', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-button @click.native="onClick"></som-button>
                    <som-button @click.native="onClick1"></som-button>
                </div>
            `,
            data () {
                return {
                    value: ''
                };
            },
            methods: {
                onClick () {
                    this.$som.modal.show({
                        title: '标题',
                        content: '内容',
                        isConfirm: true
                    });
                },
                onClick1 () {
                    const _this = this;
                    this.$som.modal.prompt('123', {
                        title: '标题',
                        isConfirm: true,
                        onShow () {
                            _this.$som.modal.setInputValue('set input value');
                        },
                        onConfirm (msg) {
                            _this.value = msg;
                        }
                    });
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-button')[0].click();
            setTimeout(() => {
                expect(document.querySelector('.som-modal__title').textContent).to.equal('标题');
                expect(document.querySelector('.som-modal__bd > div').textContent).to.equal('内容');
                expect(document.querySelectorAll('.som-modal__ft > a')[1].textContent).to.equal('确定');
                document.querySelectorAll('.som-modal__ft > a')[0].click();
                setTimeout(() => {
                    vm.$el.querySelectorAll('.som-button')[1].click();
                    setTimeout(() => {
                        document.querySelectorAll('.som-modal__ft > a')[1].click();
                        setTimeout(() => {
                            expect(vm.value).to.equal('set input value');
                            done();
                        }, 200);
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });
});

