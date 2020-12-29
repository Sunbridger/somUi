import ActionTip from 'packages/action-tip';
import Vue from 'vue';
import { mount } from '@vue/test-utils';

Vue.use(ActionTip);
describe('ActionTip', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('create', () => {
        vm = mount({
            template: `
            <som-action-tip
                :visible.sync="visible"
                :title="title" 
                :customClass='customClass'>
                </som-action-tip>
            `,
            data () {
                return {
                    visible: true,
                    title: 'garbage',
                    customClass: 'custom'
                };
            }
        });
        expect(vm.classes()).contain('som-action-tip');

        let title = vm.find('.tip-title .title');
        expect(title.exists()).to.be.true;
        expect(title.text()).to.equal('garbage');
        expect(vm.find('.custom').exists()).to.be.true;
    });

    it('visible', (done) => {
        vm = mount({
            template: `
            <div class="demo"
                <som-action-tip :visible.sync="visible">
                </som-action-tip>
            </div>
            `,
            data () {
                return {
                    visible: false
                };
            }
        });
        expect(vm.find('.som-action-tip').exists()).to.be.false;
        vm.vm.visible = true;
        setTimeout(() => {
            expect(vm.find('.som-action-tip').exists()).to.be.true;
            vm.vm.visible = false;
            setTimeout(() => {
                expect(vm.find('.som-action-tip').exists()).to.be.false;
                done();
            }, 300);
        }, 500);
    });

    it('close', (done) => {
        vm = mount({
            template: `
            <div class="demo"
                <som-action-tip :visible.sync="visible">
                    <span id="close" slot='closeIcon'>关闭</span>
                </som-action-tip>
            </div>
            `,
            data () {
                return {
                    visible: true
                };
            }
        });
        setTimeout(() => {
            vm.find('#close').trigger('click');
            setTimeout(() => {
                expect(vm.find('.som-action-tip').exists()).to.false;
                done();
            }, 500);
        }, 10);

    });

    it('mask click', (done) => {
        vm = mount({
            template: `
            <div class="demo"
                <som-action-tip :visible.sync="visible" @clickMask="visible = false">
                    <span id="close" slot='closeIcon'>关闭</span>
                </som-action-tip>
            </div>
            `,
            data () {
                return {
                    visible: true
                };
            }
        });
        vm.find('.modal').trigger('click');
        setTimeout(() => {
            expect(vm.find('.som-action-tip').exists()).to.false;
            done();
        }, 500);
    });

    it('slot content', () => {
        vm = mount({
            template: `
            <div class="demo"
                <som-action-tip :visible.sync="visible">
                    <span id="content" slot='content'>this is garbage</span>
                </som-action-tip>
            </div>
            `,
            data () {
                return {
                    visible: true
                };
            }
        });
        expect(vm.find('#content').text()).to.equal('this is garbage');
    });
});

