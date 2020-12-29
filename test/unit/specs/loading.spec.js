import Vue from 'vue';
import LoadingPlugin from 'som-ui/src/plugins/loading';
import { createVue, destroyVM } from '../util';

Vue.use(LoadingPlugin);

describe('Loading', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('show', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-button @click.native="show1 = true" type="primary">显示加载</som-button>
                    <som-loading :show="show1">加载</som-loading>
                </div>
            `,
            data () {
                return {
                    show1: false
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-loading > div').style.display).to.equal('none');
            expect(vm.$el.querySelector('.som-loading-decs').textContent).to.equal('加载');
            vm.$el.querySelector('.som-button').click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-loading > div').display).not.to.equal('none');
                done();
            }, 200);
        }, 200);
    });

    it('text', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-loading text="loading"></som-loading>
                </div>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-loading-decs').textContent).to.equal('loading');
            done();
        }, 200);
    });

    it('fullscreen', () => {
        vm = createVue({
            template: `
                <som-loading text="loading" fullscreen></som-loading>
            `
        }, true);

        expect(vm.$el.classList.contains('is-fullscreen')).to.true;
    });

    it('plugin', (done) => {
        vm = createVue({
            template: `
                <div>
                    <som-button @click.native="showLoading" type="primary">显示加载</som-button>
                </div>
            `,
            data () {
                return {
                    show: false
                };
            },
            methods: {
                showLoading () {
                    this.show = !this.show;
                    if (this.show) {
                        this.$som.loading.show({
                            text: 'Loading',
                            delay: 10000
                        });
                    } else {
                        this.$som.loading.hide();
                    }
                }
            }
        }, true);
        vm.$som.loading.show('Loading');
        setTimeout(() => {
            expect(document.body.querySelector('.som-loading > div').style.display).to.equal('');
            vm.$som.loading.hide();
            setTimeout(() => {
                expect(document.body.querySelector('.som-loading > div').classList.contains('som-mask-leave')).to.true;
                done();
            }, 0);
        }, 200);
    });

    it('plugin options', (done) => {
        vm = createVue({
            data() {
                return {
                    show: ''
                };
            }
        }, true);

        vm.$som.loading.show({
            text: 'Loading',
            onShow: () => {
                vm.show = true;
            },
            onHide: () => {
                vm.show = false;
            }
        });
        setTimeout(() => {

            expect(vm.show).to.true;
            vm.$som.loading.hide();
            setTimeout(() => {
                expect(vm.show).to.false;
                done();
            }, 300);
        }, 200);
    });
});

