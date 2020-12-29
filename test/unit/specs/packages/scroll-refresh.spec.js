import Vue from 'vue';
import Icon from 'components/icon';
import List from 'components/list';
import ListItem from 'components/list-item';
import ScrollRefresh from 'packages/scroll-refresh';
import { mount } from '@vue/test-utils';
import { triggerTouch } from '../../util';


Vue.use(Icon);
Vue.use(List);
Vue.use(ListItem);
Vue.use(ScrollRefresh);
describe('ScrollRefresh', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('pull up', (done) => {
        const spy = sinon.spy();

        vm = mount({
            template: `
                <div class="demo__div" style="height: 500px; overflow-y: auto">
                    <som-scroll-refresh 
                        ref="scrollRefresh" 
                        :pull-up="loadMore"
                        :bottom-distance="50">
                        <som-list>
                            <som-list-item v-for="(item, index) in list"
                                :title="item"
                                :key="index">
                            </som-list-item>
                        </som-list>
                    </som-scroll-refresh>
                </div>
            `,
            data () {
                return {
                    list: [],
                    num: 0
                };
            },
            methods: {
                loadMore (e) {
                    this.list = this.list.concat(new Array(10).fill('every-item'));
                    this.list.length > 50 ? e.completed() : e.loaded();
                    spy();
                }
            }
        }, {attachToDocument: true});


        setTimeout(() => {
            expect(spy.calledOnce).to.true;
            triggerTouch(vm.find('.som-scroll-infinite'), 'touchstart', 0, 10);
            triggerTouch(vm.find('.som-scroll-infinite'), 'touchmove', 0, 30);

            setTimeout(() => {
                expect(spy.calledTwice).to.false;
                vm.vm.$refs.scrollRefresh.$emit('loadmore:reset');
                setTimeout(() => {
                    expect(spy.calledTwice).to.true;
                    done();
                }, 100);
            }, 100);
        }, 100);
    });

    it('pull down', (done) => {
        const spy = sinon.spy();

        vm = mount({
            template: `
                <div class="demo__div" style="height: 500px; overflow-y: auto">
                    <som-scroll-refresh 
                        ref="scrollRefresh" 
                        :pull-down="refresh"
                        :offset-h="50">
                        <som-list>
                            <som-list-item v-for="(item, index) in list"
                                :title="item"
                                :key="index">
                            </som-list-item>
                        </som-list>
                    </som-scroll-refresh>
                </div>
            `,
            data () {
                return {
                    list: [],
                    num: 0
                };
            },
            methods: {
                refresh (e) {
                    this.list = new Array(10).fill('every-item');
                    e.refreshed();
                    spy();
                }
            }
        }, {attachToDocument: true});


        setTimeout(() => {
            triggerTouch(vm.find('.som-scroll-infinite'), 'touchstart', 0, 10);
            triggerTouch(vm.find('.som-scroll-infinite'), 'touchmove', 0, 30);
            triggerTouch(vm.find('.som-scroll-infinite'), 'touchend', 0, 80);

            setTimeout(() => {
                expect(spy.calledOnce).to.false;
                triggerTouch(vm.find('.som-scroll-infinite'), 'touchstart', 0, 10);
                triggerTouch(vm.find('.som-scroll-infinite'), 'touchmove', 0, 80);
                triggerTouch(vm.find('.som-scroll-infinite'), 'touchend', 0, 80);
                setTimeout(() => {
                    expect(spy.calledOnce).to.true;
                    done();
                }, 100);
            }, 100);
        }, 100);
    });
});

