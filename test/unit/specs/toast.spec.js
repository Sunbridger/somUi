import Vue from 'vue';
import ToastPlugin from 'som-ui/src/plugins/toast';
import { TransferDom } from 'som-ui/src';
import { createVue, destroyVM } from '../util';

Vue.use(ToastPlugin);

describe('Toast', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('show', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-button @click.native="show1 = true" type="primary">Top</som-button>
                    <som-toast v-model="show1" is-show-mask :position="position">基本用法</som-toast>
                </div>
            `,
            data () {
                return {
                    show1: false,
                    position: 'top'
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-toast__wrap').style.display).to.equal('none');
            expect(vm.$el.querySelector('.som-toast__wrap').classList.contains('som-toast-top')).to.be.true;
            let button = vm.$el.querySelector('.som-button');
            button.click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-toast__wrap').style.display).to.not.equal('none');
                done();
            }, 200);
        }, 200);
    });

    it('time', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-toast v-model="show1" :time="100">基本用法</som-toast>
                </div>
            `,
            data () {
                return {
                    show1: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-toast__wrap').style.display).to.not.equal('none');
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-toast__wrap').classList.contains('som-fade-leave')).to.true;
                done();
            }, 90);
        }, 10);
    });

    it('type', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-toast v-model="show1" type="info">基本用法</som-toast>
                </div>
            `,
            data () {
                return {
                    show1: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-toast__icon')).to.exist;
            done();
        }, 200);
    });

    it('transfer-dom', (done) => {
        vm = createVue({
            template: `
                <div>
                    <div id="wrap"></div>
                    <som-toast 
                        v-if="show"
                        class="d"
                        v-model="show1"
                        :type="type"
                        v-transfer-dom.value="wrap">

                        <p>基本用法</p>
                        <span v-if="two">基本用法</span>
                        
                    </som-toast>
                </div>
            `,
            directives: {
                TransferDom
            },
            data () {
                return {
                    type: 'info',
                    show: true,
                    wrap: '#wrap',
                    two: false,
                    show1: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('#wrap .som-toast--type')).to.exist;
            vm.type = undefined;
            vm.two = true;
            setTimeout(() => {
                expect(document.querySelector('#wrap .d')).to.exist;
                vm.show = false;
                setTimeout(() => {
                    expect(document.querySelector('#wrap .d')).not.to.exist;
                    done();
                }, 1000);
            }, 100);
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
                    show: false,
                    isshow: false
                };
            },
            methods: {
                onClick () {
                    this.show = !this.show;
                    const _this = this;
                    if (this.show) {
                        this.$som.toast.show({
                            text: 'Hello World',
                            onShow () {
                                _this.isshow = true;
                            },
                            onHide () {
                                _this.isshow = false;
                            }
                        });
                    } else {
                        this.$som.toast.hide();
                    }
                },
                onClick1 () {
                    this.$som.toast.text('How are you~');
                }
            }
        }, true);
        setTimeout(() => {
            let button = vm.$el.querySelectorAll('.som-button');
            button[0].click();
            setTimeout(() => {
                expect(vm.isshow).to.be.true;
                button[0].click();
                setTimeout(() => {
                    expect(vm.isshow).to.be.false;
                    button[1].click();
                    setTimeout(() => {
                        expect(document.querySelector('.som-toast .som-toast__content').textContent).to.equal('How are you~');
                        done();
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });

});

