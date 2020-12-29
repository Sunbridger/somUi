import Vue from 'vue';
import Sticky from 'components/sticky';
import { mount } from '@vue/test-utils';

Vue.use(Sticky);
describe('Sticky', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('create', (done) => {
        const spy = sinon.spy();

        vm = mount({
            template: `
                <div style="height: 200px; overflow-y: scroll;" class="wrap">
                    <div style="height: 100px"></div>
                    <som-sticky  @scrollSticky="scrollSticky" ref="sticky">
                        <p>
                            滚动页面，我会固定在头部哦！
                        </p>
                    </som-sticky>
                    <div style="height: 400px"></div>
                </div>
            `,
            methods: {
                scrollSticky () {
                    spy();
                },
                fn () {
                    this.$refs.sticky.toSticky();
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.vm.fn();
            setTimeout(() => {
                vm.find('.wrap').trigger('scroll');
                setTimeout(() => {
                    expect(spy.calledOnce).to.true;
                    done();
                }, 10);
            }, 100);
        }, 100);
    });
});
