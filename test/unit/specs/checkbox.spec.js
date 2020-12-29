import Checkbox from 'components/checkbox';
import { createTest, createVue, destroyVM } from '../util';

const commonList = [ 'China', 'Japan', 'America' ];
const objectList = [{key: '001 value', value: '1'}, {key: '002 value', value: '2'}];

describe('Checkbox', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('align', () => {
        vm = createTest(Checkbox, {
            align: 'horizontal',
            title: '国家',
            options: commonList
        }, true);
        expect(vm.$el.querySelector('.som-checkbox--horizontal')).to.exist;
        expect(vm.$el.querySelector('.som-list-item__hd').textContent).to.equal('国家');
        expect(vm.$el.querySelectorAll('.som-list-item__ft .som-checkbox-label')[0].textContent).to.equal('China');
    });

    it('titlt', () => {
        vm = createTest(Checkbox, {
            title: '国家',
            options: commonList
        }, true);
        expect(vm.$el.querySelector('.som-checkbox__title').style.display).not.to.equal('none');
        expect(vm.$el.querySelectorAll('.som-list-item__bd')[0].textContent).to.equal('China');
    });

    it('inline-desc-click', (done) => {
        vm = createVue({
            template: `
                <som-checkbox :options="commonList" v-model="checklist001" :inline-desc-click="clickHandle" >
                    <template slot-scope="inlineDesc">
                        <span class="right">这是选择数字</span>
                    </template>
                </som-checkbox>
            `,
            data () {
                return {
                    commonList: commonList,
                    checklist001: ['China'],
                    changeVal: [],
                    clickOne: ''
                };
            },
            methods: {
                clickHandle (one) {
                    this.clickOne = one;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-list-item .right')[0].click();
            setTimeout(() => {
                expect(vm.clickOne).to.equal('China');
                done();
            }, 200);
        }, 200);
    });

    it('max', () => {
        vm = createTest(Checkbox, {
            options: commonList,
            max: 2,
            value: ['China', 'Japan']
        }, true);
        expect(vm.$el.querySelectorAll('.som-list-item')[2].classList.contains('som-checkbox-label-disable')).to.true;
    });

    it('min', (done) => {
        vm = createVue({
            template: `
                <som-checkbox :min="2" v-model="checklist001" @on-error="handleError" :options="commonList"></som-checkbox>
            `,
            data () {
                return {
                    commonList: commonList,
                    checklist001: ['China'],
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
            expect(vm.err.min).to.equal(2);
            done();
        }, 200);
    });

    it('radio', (done) => {
        vm = createVue({
            template: `
                <som-checkbox :options="commonList" v-model="checklist001" :max="1"></som-checkbox>
            `,
            data () {
                return {
                    commonList: commonList,
                    checklist001: ['China'],
                    changeVal: []
                };
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-list-item')[1].click();
            setTimeout(() => {
                expect(vm.checklist001[0]).to.equal('Japan');
                done();
            }, 200);
        }, 200);
    });

    it('on-change', (done) => {
        vm = createVue({
            template: `
                <som-checkbox required :options="commonList" v-model="checklist001" @on-change="change"></som-checkbox>
            `,
            data () {
                return {
                    commonList: commonList,
                    checklist001: [],
                    changeVal: []
                };
            },
            methods: {
                change (val) {
                    this.changeVal = val;
                }
            }
        }, true);
        setTimeout(() => {
            let items = vm.$el.querySelectorAll('.som-list-item');
            items[0].click();
            items[1].click();
            setTimeout(() => {
                expect(vm.checklist001[0]).to.equal('China');
                expect(vm.checklist001[1]).to.equal('Japan');
                expect(vm.changeVal[0]).to.equal('China');
                expect(vm.changeVal[1]).to.equal('Japan');
                done();
            }, 200);
        }, 200);
    });

    it('option object', (done) => {
        vm = createVue({
            template: `
                <som-checkbox required :options="commonList" @on-change="change" ref="checkbox"></som-checkbox>
            `,
            data () {
                return {
                    commonList: objectList,
                    labels: [],
                    changeVal: [],
                    checklist001: []
                };
            },
            methods: {
                change (val, labels) {
                    this.changeVal = val;
                    this.labels = labels;
                }
            }
        }, true);
        setTimeout(() => {
            let items = vm.$el.querySelectorAll('.som-list-item');
            items[0].click();
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-list-item__bd')[0].textContent).to.equal('001 value');
                expect(vm.changeVal[0]).to.equal('1');
                expect(vm.labels[0]).to.equal('001 value');
                items[1].click();
                setTimeout(() => {
                    let object = vm.$refs.checkbox.getFullValue();
                    expect(object[1].label).to.equal('002 value');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('group', (done) => {
        vm = createVue({
            template: `
                <som-checkbox-group label="不限排放" v-model="groupVal" ref="group">
                    <som-checkbox :options="group1" title="排放" ref="checkbox"></som-checkbox>
                </som-checkbox-group>
            `,
            data () {
                return {
                    group1: commonList,
                    groupVal: [ 'China', 'Japan', 'America' ]
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$refs.checkbox.currentValue[0]).to.equal('China');
            expect(vm.$refs.group.currentValue).to.be.true;
            vm.$refs.group.$el.querySelectorAll('.som-list-item__hd')[0].click();
            setTimeout(() => {
                expect(vm.groupVal.length).to.equal(0);
                vm.$refs.checkbox.$el.querySelectorAll('.som-list-item')[2].click();
                setTimeout(() => {
                    expect(vm.groupVal[0]).to.equal('America');
                    vm.$refs.group.$el.querySelectorAll('.som-list-item__hd')[0].click();
                    setTimeout(() => {
                        expect(vm.groupVal.length).to.equal(3);
                        done();
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });
});
