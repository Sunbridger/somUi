import { createVue, destroyVM } from '../util';

describe('Filter', () => {
    let vm;

    const radio = {
        key: '单选1',
        value: 'cheyuan',
        options: [
            { key: '选项一', value: 0},
            { key: '选项二22222222', value: 1},
            { key: '选项三', value: 2}
        ]
    };
    const multiple = {
        key: '多选1',
        value: 'cheyuan1',
        options: [
            { key: '选项一', value: '0'},
            { key: '选项二', value: '1'},
            { key: '选项三', value: '3'}
        ]
    };

    const group = {
        key: '筛选',
        value: 'filter',
        options: [
            {
                key: '价格区间',
                value: 'price',
                options: [
                    { key: '0-20', value: 'low' },
                    { key: '20-40', value: 'middle'},
                    { key: '40-100', value: 'high'}
                ]
            },
            {
                key: '颜色',
                value: 'color',
                multiple: true,
                options: [
                    { key: '黑', value: 'black'},
                    { key: '白', value: 'white'}
                ]
            },
            {
                key: '口味',
                value: 'taste',
                options: ['微辣', '中辣', '重辣', '超级辣']
            }
        ]
    };

    const getVm = (configs = {}) => {
        const vm = createVue({
            template: `
                <som-filter 
                    ref="filter"
                    @on-change="onChange" 
                    :hide-on-blur="hideOnBlur"
                    :show-mask="showMask"
                    :show-value="true"
                    :change-arrow="changeArrow"
                    :max-length="maxLength"
                    v-model="value">
                    <som-filter-item
                        :label="radio.key"
                        :value="radio.value"
                        :options="radio.options">
                    </som-filter-item>

                    <som-filter-item
                        :label="multiple.key"
                        :value="multiple.value"
                        multiple
                        full
                        :options="multiple.options">
                    </som-filter-item>

                    <som-filter-item
                        :label="group.key"
                        :value="group.value"
                        :options="group.options"
                        group>
                    </som-filter-item>
            </som-filter>
            `,
            data () {
                return {
                    num: 0,
                    radio: radio,
                    multiple: multiple,
                    group: group,
                    value: configs.value || {},
                    hideOnBlur: configs.hideOnBlur || true,
                    showMask: typeof configs.showMask === 'undefined' ? true : configs.showMask,
                    changeArrow: typeof configs.changeArrow === 'undefined' ? true : configs.changeArrow,
                    maxLength: configs.maxLength || 4
                };
            },
            methods: {
                onChange () {
                    this.num += 1;
                }
            }
        }, true);

        return vm;
    };

    afterEach(() => {
        destroyVM(vm);
    });

    it('radio', (done) => {
        vm = getVm();
        expect(vm.$el.querySelectorAll('.som-filter-item').length).to.equal(3);
        let radio = vm.$el.querySelectorAll('.som-filter-item')[0];
        expect(radio.textContent.trim()).be.equal('单选1');
        radio.click();
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-radio__label').length).to.equal(3);
            vm.$el.querySelectorAll('.som-radio__label')[0].click();
            setTimeout(() => {
                expect(radio.textContent.trim()).to.equal('选项一');
                expect(vm.value.cheyuan).to.equal(0);
                done();
            }, 200);
        }, 200);
    });

    it('hide-on-blur', (done) => {
        vm = getVm({
            hideOnBlur: true
        });
        vm.$el.querySelectorAll('.som-filter-item')[0].click();
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-filter__options').style.display).not.to.equal('none');
            vm.$el.querySelector('.som-mask').click();
            setTimeout(() => {
                expect(vm.$refs.filter.show).to.false;
                vm.hideOnBlur = false;
                setTimeout(() => {
                    vm.$el.querySelectorAll('.som-filter-item')[0].click();
                    vm.$el.querySelector('.som-mask').click();
                    setTimeout(() => {
                        expect(vm.$el.querySelector('.som-filter__options').style.display).not.to.equal('none');
                        done();
                    }, 200);
                }, 200);
            }, 800);
        }, 200);
    });

    it('show-mask', (done) => {
        vm = getVm({
            showMask: false
        });
        vm.$el.querySelectorAll('.som-filter-item')[0].click();
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-mask')).not.to.exist;
            done();
        }, 200);
    });

    it('max-length', (done) => {
        vm = getVm({
            maxLength: 3
        });
        vm.$el.querySelectorAll('.som-filter-item')[0].click();
        setTimeout(() => {
            vm.$el.querySelectorAll('.som-radio__label')[1].click();
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-filter-item')[0].textContent.trim()).to.equal('选...2');
                done();
            }, 200);
        }, 200);
    });

    it('change-arrow', (done) => {
        vm = getVm({
            changeArrow: true,
            value: {cheyuan: 0}
        });
        let radio = vm.$el.querySelectorAll('.som-filter-item')[0];
        setTimeout(() => {
            expect(radio.querySelector('.som-icon-caret-bottom')).not.to.exist;
            done();
        }, 400);

    });

    it('multiple', (done) => {
        vm = getVm({
            changeArrow: true,
            value: {cheyuan1: '0'}
        });
        let multiple = vm.$el.querySelectorAll('.som-filter-item')[1];
        multiple.click();
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-tag')[0].classList.contains('som-tag--primary')).to.true;
            vm.$el.querySelectorAll('.som-tag')[0].click();
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-tag')[0].classList.contains('som-tag--primary')).to.false;
                vm.$el.querySelectorAll('.som-tag')[2].click();
                vm.$el.querySelectorAll('.som-tag')[1].click();
                vm.$el.querySelector('.som-button').click();
                setTimeout(() => {
                    expect(vm.value.cheyuan1).to.equal('3; 1');
                    done();
                }, 200);
            }, 200);
        });
    });

    it('group', (done) => {
        vm = getVm({
            value: {
                price: 'low',
                taste: '超级辣'
            }
        });
        let group = vm.$el.querySelectorAll('.som-filter-item')[2];
        group.click();
        setTimeout(() => {
            let price = vm.$el.querySelectorAll('.som-tag-group')[0];
            let color = vm.$el.querySelectorAll('.som-tag-group')[1];
            let taste = vm.$el.querySelectorAll('.som-tag-group')[2];
            price.querySelectorAll('.som-tag')[0].click();
            color.querySelectorAll('.som-tag')[0].click();
            color.querySelectorAll('.som-tag')[1].click();
            taste.querySelectorAll('.som-tag')[1].click();
            vm.$el.querySelectorAll('.som-button')[1].click();
            setTimeout(() => {
                expect(vm.$el.querySelector('sup').textContent).to.equal('2');
                expect(vm.value.price).to.equal('');
                expect(vm.value.color).to.equal('black; white');
                expect(vm.value.taste).to.equal('中辣');
                group.click();
                setTimeout(() => {
                    vm.$el.querySelectorAll('.som-button')[0].click();
                    vm.$el.querySelectorAll('.som-button')[1].click();
                    setTimeout(() => {
                        expect(vm.value.price).to.equal('');
                        expect(vm.value.color).to.equal('');
                        expect(vm.value.taste).to.equal('');
                        done();
                    }, 200);
                }, 200);
            }, 200);
        });
    });

    it('on-change', (done) => {
        vm = getVm();
        let group = vm.$el.querySelectorAll('.som-filter-item')[2];
        group.click();
        setTimeout(() => {
            let price = vm.$el.querySelectorAll('.som-tag-group')[0];
            let color = vm.$el.querySelectorAll('.som-tag-group')[1];
            let taste = vm.$el.querySelectorAll('.som-tag-group')[2];
            price.querySelectorAll('.som-tag')[0].click();
            color.querySelectorAll('.som-tag')[0].click();
            color.querySelectorAll('.som-tag')[1].click();
            taste.querySelectorAll('.som-tag')[1].click();
            vm.$el.querySelectorAll('.som-button')[1].click();
            setTimeout(() => {
                expect(vm.num).to.equal(2);
                done();
            }, 200);
        });
    });

    it('not submit', (done) => {
        vm = getVm({
            value: {
                price: 'low',
                taste: '超级辣'
            }
        });
        let group = vm.$el.querySelectorAll('.som-filter-item')[2];
        group.click();
        setTimeout(() => {
            let color = vm.$el.querySelectorAll('.som-tag-group')[1];
            let taste = vm.$el.querySelectorAll('.som-tag-group')[2];
            color.querySelectorAll('.som-tag')[0].click();
            color.querySelectorAll('.som-tag')[1].click();
            taste.querySelectorAll('.som-tag')[1].click();
            group.click();
            setTimeout(() => {
                expect(vm.$el.querySelector('sup').textContent).to.equal('2');
                done();
            }, 200);
        }, 200);
    });
});

