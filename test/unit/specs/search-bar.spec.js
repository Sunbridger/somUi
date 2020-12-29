import SearchBar from 'components/search-bar';
import { createTest, createVue, destroyVM, triggerEvent } from '../util';

describe('SearchBar', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('type', () => {
        vm = createTest(SearchBar, {
            type: 'light'
        }, true);
        expect(vm.$el.classList.contains('som-search-bar--light')).to.true;
    });

    it('placeholder', () => {
        vm = createTest(SearchBar, {
            placeholder: '请输入'
        }, true);
        expect(vm.$el.querySelector('input').placeholder).to.equal('请输入');
    });

    it('cancelText', () => {
        vm = createTest(SearchBar, {
            cancelText: '删除',
            isCancel: true
        }, true);
        expect(vm.$el.querySelector('.som-search__cancel-btn').textContent).to.equal('删除');
    });

    it('value', () => {
        vm = createTest(SearchBar, {
            value: '大搜车'
        }, true);
        expect(vm.$el.querySelector('input').value).to.equal('大搜车');
    });

    it('labelId', () => {
        vm = createTest(SearchBar, {
            labelId: 'searchInput'
        }, true);
        expect(vm.$el.querySelector('.som-search__label').style.display).not.to.equal('none');
    });

    it('select', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" 
                    select 
                    :select-list="selectList"
                    :gutter="15"
                    @on-select-change="selectChange"
                    placement="bottom-start"></som-search-bar>
            `,
            data () {
                return {
                    selectList: ['one', { text: '33', link: '222'}, 'three'],
                    val: ''
                };
            },
            methods: {
                selectChange(val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.text').click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-tips')).to.exist;
                expect(vm.$el.querySelector('.text').textContent).to.equal('one');
                vm.$el.querySelectorAll('.som-tips-item')[2].click();
                setTimeout(() => {
                    expect(vm.val).to.equal('three');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('on-fouce', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" @on-focus="onFocus"></som-search-bar>
            `,
            data () {
                return {
                    focus: false
                };
            },
            methods: {
                onFocus () {
                    this.focus = true;
                }
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('input');
            triggerEvent(input, 'focus');
            setTimeout(() => {
                expect(vm.focus).to.true;
                done();
            }, 200);
        }, 200);
    });

    it('on-blur', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" @on-blur="onBlur"></som-search-bar>
            `,
            data () {
                return {
                    blur: false
                };
            },
            methods: {
                onBlur () {
                    this.blur = true;
                }
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('input');
            triggerEvent(input, 'focus');
            triggerEvent(input, 'blur');
            setTimeout(() => {
                expect(vm.blur).to.true;
                done();
            }, 200);
        }, 200);
    });

    it('on-submit', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" @on-submit="onSubmit"></som-search-bar>
            `,
            data () {
                return {
                    submit: false
                };
            },
            methods: {
                onSubmit () {
                    this.submit = true;
                }
            }
        }, true);
        setTimeout(() => {
            let form = vm.$el.querySelector('form');
            triggerEvent(form, 'submit');
            setTimeout(() => {
                expect(vm.submit).to.true;
                done();
            }, 200);
        }, 200);
    });

    it('clear', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" v-model="value"></som-search-bar>
            `,
            data () {
                return {
                    value: 'test'
                };
            }
        }, true);
        setTimeout(() => {
            let clear = vm.$el.querySelector('.som-icon-circle-close');
            clear.click();
            setTimeout(() => {
                expect(vm.value).to.equal('');
                done();
            }, 200);
        }, 200);
    });

    it('on-cancel', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" v-model="value" @on-cancel="onCancel" is-cancel>
                </som-search-bar>
            `,
            data () {
                return {
                    value: 'test',
                    cancel: false
                };
            },
            methods: {
                onCancel() {
                    this.cancel = true;
                }
            }
        }, true);
        setTimeout(() => {
            let cancel = vm.$el.querySelector('.som-search__cancel-btn');
            cancel.click();
            setTimeout(() => {
                expect(vm.value).to.equal('');
                expect(vm.cancel).to.true;
                done();
            }, 200);
        }, 200);
    });

    it('auto-fixed', (done) => {
        vm = createVue({
            template: `
                <som-search-bar
                    @on-result-click="resultClick"
                    @on-change="getResult"
                    auto-fixed
                    :results="results"
                    v-model="value"
                    auto-scroll-to-top
                    ref="search">
                    <som-list v-if="!value">
                        <som-list-item title="大家都在找" class="title"></som-list-item>
                        <som-list-item title="6" @click.native="onResultClick"></som-list-item>
                        <som-list-item title="7" @click.native="onResultClick"></som-list-item>
                        <som-list-item title="8" @click.native="onResultClick"></som-list-item>
                    </som-list>
                </som-search-bar>
            `,
            data () {
                return {
                    results: [],
                    value: 'test',
                    resultVal: ''
                };
            },
            methods: {
                onResultClick () {
                    this.$refs.search.handleResultClick('6');
                },
                resultClick (item) {
                    this.resultVal = item;
                },
                getResult (val) {
                    this.results = val ? ['1', '2', '3', '4', '5'] : [];
                }
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('input');
            triggerEvent(input, 'touch');
            setTimeout(() => {
                expect(vm.$el.querySelector('.no-result .som-list-item__bd').textContent).to.equal('抱歉， 暂无相关信息');
                input.value = 'test22';
                triggerEvent(input, 'input');
                setTimeout(() => {
                    triggerEvent(vm.$el.querySelector('.som-search-bar__result'), 'touchstart');
                    let res3 = vm.$el.querySelectorAll('.som-result-cell')[2];
                    res3.click();
                    setTimeout(() => {
                        expect(vm.resultVal).to.equal('3');
                        vm.value = '';
                        setTimeout(() => {
                            let res1 = vm.$el.querySelectorAll('.som-list-item')[1];
                            res1.click();
                            setTimeout(() => {
                                expect(vm.resultVal).to.equal('6');
                                done();
                            }, 20);
                        }, 20);
                    }, 20);
                }, 20);
            }, 20);
        }, 20);
    });

    it('auto-fixed change', (done) => {
        vm = createVue({
            template: `
                <som-search-bar
                    @on-result-click="resultClick"
                    @on-change="getResult"
                    auto-fixed
                    :results="results"
                    v-model="value"
                    auto-scroll-to-top
                    ref="search">
                    <som-list v-if="!value">
                        <som-list-item title="大家都在找" class="title"></som-list-item>
                        <som-list-item title="6" @click.native="onResultClick"></som-list-item>
                        <som-list-item title="7" @click.native="onResultClick"></som-list-item>
                        <som-list-item title="8" @click.native="onResultClick"></som-list-item>
                    </som-list>
                </som-search-bar>
            `,
            data () {
                return {
                    results: [],
                    value: 'test',
                    resultVal: ''
                };
            },
            methods: {
                onResultClick () {
                    this.$refs.search.handleResultClick('6');
                },
                resultClick (item) {
                    this.resultVal = item;
                },
                getResult (val) {
                    this.results = val ? ['1', '2', '3', '4', '5'] : [];
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.som-icon-circle-close').click();
            setTimeout(() => {
                triggerEvent(vm.$el.querySelector('.som-search-bar__result'), 'touchstart');
                let res3 = vm.$el.querySelectorAll('.som-list-item')[3];
                res3.click();
                setTimeout(() => {
                    expect(vm.resultVal).to.equal('6');
                    done();
                }, 20);
            }, 20);
        }, 20);
    });

    it('on-composition', (done) => {
        vm = createVue({
            template: `
                <som-search-bar type="corner" v-model="value" @on-change="onChange"></som-search-bar>
            `,
            data () {
                return {
                    value: 'test',
                    time: 0
                };
            },
            methods: {
                onChange () {
                    this.time += 1;
                }
            }
        }, true);
        setTimeout(() => {
            let input = vm.$el.querySelector('input');
            triggerEvent(input, 'compositionstart');
            triggerEvent(input, 'compositionend');
            setTimeout(() => {
                expect(vm.time).to.equal(1);
                done();
            }, 200);
        }, 200);
    });
});

