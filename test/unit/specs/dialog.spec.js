import Vue from 'vue';
import ConfigPlugin from 'som-ui/src/plugins/config';
import { createVue, destroyVM } from '../util';

Vue.use(ConfigPlugin, {
    $layout: 'VIEW_BOX'
});

describe('Dialog', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('dialog show', (done) => {
        vm = createVue({
            template: `
                <som-dialog v-model="show" class="dialog-demo">
                    <div style="padding:15px;">
                        <som-button type="primary">show button</som-button>
                    </div>
                </som-dialog>
            `,
            data () {
                return {
                    show: false
                };
            }
        }, true);
        setTimeout(() => {
            vm.show = true;
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-mask').classList.contains('som-mask-enter-active')).to.be.true;
                vm.show = false;
                setTimeout(() => {
                    expect(vm.$el.querySelector('.som-mask').classList.contains('som-mask-leave-active')).to.be.true;
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('dialog close', (done) => {
        vm = createVue({
            template: `
                <som-dialog v-model="show" class="dialog-demo">
                    <div style="padding:15px;">
                        <som-button type="primary">show button</som-button>
                    </div>
                </som-dialog>
            `,
            data () {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            let close = vm.$el.querySelector('.som-dialog__close');
            close.click();
            setTimeout(() => {
                expect(vm.show).to.be.false;
                done();
            }, 200);
        }, 200);
    });

    it('dialog hide-on-blur', (done) => {
        vm = createVue({
            template: `
                <som-dialog v-model="show" class="dialog-demo" hide-on-blur>
                    <div style="padding:15px;">
                        <som-button type="primary">show button</som-button>
                    </div>
                </som-dialog>
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

});

