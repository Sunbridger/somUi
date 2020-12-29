import Vue from 'vue';
import ActionPicker from 'packages/action-picker';
import { mount } from '@vue/test-utils';

import mock from 'examples/docs/components/packages/action-picker/mock';

Vue.use(ActionPicker);
describe('ActionPicker', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('create', (done) => {
        vm = mount({
            template: `
                <som-action-picker
                    :leftList="leftList"
                    :rightList="rightList"
                    @fetchRightList="fetchRightList"
                    @result="result">
                </som-action-picker>
            `,
            data () {
                return {
                    leftList: mock.rightList.data,
                    rightList: [],
                    res: ''
                };
            },
            methods: {
                fetchRightList(id) {
                    mock.rightList.data.forEach((it) => {
                        if (it.id === id) {
                            this.rightList = it.treeList;
                        }
                    });
                },
                result(val) {
                    this.res = val;
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            expect(vm.find('.level1')).to.exist;
            expect(vm.findAll('.level1 .inner-list').length).to.equal(12);
            expect(vm.find('.level2-title').text()).to.equal('');

            vm.findAll('.level1 .inner-list').at(0).trigger('click'); //点击常用职务

            setTimeout(() => {
                expect(vm.find('.level2-title').text()).to.equal('常用职务');
                expect(vm.findAll('.level2 .inner-list').length).to.equal(6);

                vm.findAll('.level2 .inner-list').at(0).trigger('click');

                setTimeout(() => {
                    expect(vm.vm.res.name).to.equal('常用职务');
                    expect(vm.vm.res.level2List.name).to.equal('销售顾问');

                    vm.findAll('.level1 .inner-list').at(1).trigger('click'); //点击门店管理类

                    setTimeout(() => {
                        expect(vm.find('.level2-title').text()).to.equal('门店管理类');
                        vm.findAll('.level2 .inner-list').at(0).trigger('click');
                        setTimeout(() => {
                            expect(vm.vm.res.name).to.equal('门店管理类');
                            expect(vm.vm.res.level2List.name).to.equal('董事长');
                            done();
                        }, 10);
                    }, 10);
                }, 10);
            }, 100);
        }, 100);
    });
});

