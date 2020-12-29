import Vue from 'vue';
import ShopSelect from 'packages/shop-select';
import { createVue, destroyVM, triggerEvent } from '../../util';

Vue.use(ShopSelect);

const shops = [
    {
        cityCode: '1',
        city: '北京',
        shops: [
            { 'store': '222', 'storeName': '千里发北京旗舰店', 'parent': false },
            { 'store': '223', 'storeName': '千里发北京旗舰店ww', 'parent': false }
        ],
        pinyinCiyName: 'beijing',
        firstLetter: 'B'
    },
    {
        cityCode: '2',
        city: '杭州',
        shops: [
            { 'store': '333', 'storeName': '千里发杭州拱墅店', 'parent': false }
        ],
        pinyinCiyName: 'hangzhou',
        firstLetter: 'H'
    },
    {
        cityCode: '3',
        city: '惠州',
        shops: [
            { 'store': '442', 'storeName': '惠州千里发三店', 'parent': false }
        ],
        pinyinCiyName: 'huizhou',
        firstLetter: 'h'
    },
    {
        cityCode: '4',
        city: '衢州',
        shops: [
            { 'store': '553', 'storeName': '衢州千里发三店', 'parent': false }
        ],
        pinyinCiyName: 'quzhou',
        firstLetter: 'q'
    },
    {
        cityCode: '5',
        city: '青海',
        shops: [
            { 'store': '661', 'storeName': '青海一店', 'parent': false }
        ],
        pinyinCiyName: 'qinghai',
        firstLetter: 'q'
    },
    {
        cityCode: '6',
        city: '深圳',
        shops: [
            { 'store': '788', 'storeName': '珠江四店', 'parent': false }
        ],
        pinyinCiyName: 'shenzheng',
        firstLetter: 'S'
    },
    {
        cityCode: '8',
        city: '珠海',
        shops: [
            { 'store': '995', 'storeName': '珠海发发5', 'parent': false }
        ],
        pinyinCiyName: 'zhuhai',
        firstLetter: 'z'
    }
];

const lessShop = shops.slice(0, 5);

describe('ShopSelect', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('flat radio', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="lessShop"
                    :show="true"
                    is-all
                    v-model="shop"
                    @on-change="onChange"
                    :my-shop="myshop"></som-shop-select>
                `,
            data () {
                return {
                    lessShop: lessShop,
                    shop: [],
                    valueLable: '',
                    myshop: {
                        store: '333',
                        storeName: '千里发杭州拱墅店'
                    }
                };
            },
            methods: {
                onChange (val) {
                    this.valueLable = val.label;
                }
            }
        }, true);
        let myshop = vm.$el.querySelectorAll('.som-list')[0];
        let beijin = vm.$el.querySelectorAll('.som-list')[1];
        let hangzhou = vm.$el.querySelectorAll('.som-list')[2];
        expect(beijin.querySelectorAll('.som-list-item').length).to.equal(3);
        expect(vm.$el.querySelectorAll('.som-list')[0].textContent.indexOf('千里发杭州拱墅店')).not.to.equal(-1);
        beijin.querySelectorAll('.som-list-item')[1].click();
        setTimeout(() => {
            expect(vm.shop[0]).to.equal('222');
            hangzhou.querySelectorAll('.som-list-item')[0].click();
            setTimeout(() => {
                expect(vm.valueLable).to.equal('杭州全部');
                myshop.querySelector('.som-list-item').click();
                setTimeout(() => {
                    expect(vm.shop[0]).to.equal('333');
                    done();
                }, 50);
            }, 50);
        }, 50);
    });

    it('shops change', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="lessShop"
                    :show="true"
                    v-model="shop"
                    @on-change="onChange"
                    :my-shop="myshop"></som-shop-select>
                `,
            data () {
                return {
                    lessShop: lessShop,
                    shop: [],
                    valueLable: '',
                    myshop: {
                        store: '333',
                        storeName: '千里发杭州拱墅店'
                    }
                };
            },
            methods: {
                onChange (val) {
                    this.valueLable = val.label;
                }
            }
        }, true);
        expect(vm.$el.querySelectorAll('.som-list-item').length).to.equal(7);
        vm.lessShop = vm.lessShop.slice(0, 3);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-list-item').length).to.equal(5);
            done();
        }, 100);
    });

    it('two-level radio', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="shops"
                    :show="true"
                    :all-shop="{ show: true, disabled: false, title: 'all'}"
                    is-all
                    :flat-numer="7"
                    v-model="shop"
                    @on-change="onChange"></som-shop-select>
                `,
            data () {
                return {
                    shop: [],
                    shops: shops,
                    valueLable: ''
                };
            },
            methods: {
                onChange (val) {
                    this.valueLable = val.label;
                }
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-index-list')).to.exist;
            let hangzhou = vm.$el.querySelectorAll('.som-list')[2].querySelector('.som-list-item');
            let pop = document.querySelectorAll('.som-shop-select__popup')[0];
            hangzhou.click();
            setTimeout(() => {
                expect(pop.querySelector('.som-popup').classList.contains('som-popup-show')).to.true;
                pop.querySelectorAll('.som-list-item')[0].click();
                setTimeout(() => {
                    expect(pop.querySelector('.som-popup').classList.contains('som-popup-show')).to.false;
                    expect(vm.shop[0]).to.equal('333');
                    vm.$el.querySelectorAll('.som-list')[0].querySelector('.som-list-item').click();
                    setTimeout(() => {
                        expect(vm.shop.length).to.equal(8);
                        expect(vm.valueLable).to.equal('all');
                        done();
                    }, 50);
                }, 50);
            }, 50);
        }, 100);
    });

    it('value flat render', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="lessShop"
                    :show="true"
                    v-model="shop"
                    @on-change="onChange"
                    :my-shop="myshop"></som-shop-select>
                `,
            data () {
                return {
                    lessShop: lessShop,
                    shop: ['333', '222'],
                    valueLable: '',
                    myshop: {
                        store: '333',
                        storeName: '千里发杭州拱墅店'
                    }
                };
            },
            methods: {
                onChange (val) {
                    this.valueLable = val.label;
                }
            }
        }, true);
        expect(vm.$el.querySelector('.som-list-item').querySelector('.shop--selected')).to.exist;
        vm.myshop.store = 'change';
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-list-item').querySelector('.shop--selected')).not.to.exist;
            done();
        }, 300);
    });

    it('value tow level render', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="shops"
                    :show="true"
                    :flat-numer="7"
                    multiple
                    v-model="shop"></som-shop-select>
                `,
            data () {
                return {
                    shops: shops,
                    shop: ['333', '222'],
                    valueLable: ''
                };
            }
        }, true);

        setTimeout(() => {
            expect(vm.$el.querySelector('.shop--selected').textContent).to.equal('北京');
            expect(vm.$el.querySelectorAll('.shop--selected')[1].textContent).to.equal('杭州');
            done();
        }, 300);
    });

    // beacause vue test error cant test multiple feature. and ignore temporarily
    it('flat multiple', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="lessShop"
                    :show="true"
                    is-all
                    multiple
                    v-model="shop"
                    @on-change="onChange"
                    :my-shop="myshop"></som-shop-select>
                `,
            data () {
                return {
                    lessShop: lessShop,
                    shop: [],
                    valueLable: '',
                    myshop: {
                        store: '333',
                        storeName: '千里发杭州拱墅店'
                    }
                };
            },
            methods: {
                onChange (val) {
                    this.valueLable = val.label;
                }
            }
        }, true);
        let beijin = vm.$el.querySelectorAll('.som-checkbox')[2];
        let hangzhou = vm.$el.querySelectorAll('.som-checkbox')[3];
        let allshop = vm.$el.querySelectorAll('.som-checkbox')[1];
        let confirm = vm.$el.querySelectorAll('.som-button')[1];
        let reset = vm.$el.querySelectorAll('.som-button')[0];

        expect(allshop.textContent.indexOf('全部门店')).not.to.equal(-1);

        setTimeout(() => {
            beijin.querySelectorAll('.som-list-item')[1].click();
            hangzhou.querySelectorAll('.som-list-item')[0].click();
            setTimeout(() => {
                expect(vm.shop.length).to.equal(0);
                confirm.click();
                setTimeout(() => {
                    expect(vm.shop.length).to.equal(2);
                    reset.click();
                    setTimeout(() => {
                        confirm.click();
                        setTimeout(() => {
                            expect(vm.shop.length).to.equal(0);
                            allshop.querySelector('.som-list-item').click();
                            setTimeout(() => {
                                confirm.click();
                                setTimeout(() => {
                                    expect(vm.shop.length).to.equal(6);
                                    done();
                                }, 50);
                            }, 1000);
                        }, 50);
                    }, 50);
                }, 50);
            }, 50);
        }, 50);
    });

    it('two-level multiple', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="shops"
                    :show="true"
                    multiple
                    :flat-numer="7"
                    v-model="shop"></som-shop-select>
                `,
            data () {
                return {
                    shop: [],
                    shops: shops,
                    valueLable: ''
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-index-list')).to.exist;
            let hangzhou = vm.$el.querySelectorAll('.som-list')[1].querySelector('.som-list-item');
            let pop = document.querySelectorAll('.som-shop-select__popup')[2];
            triggerEvent(hangzhou, 'click');
            setTimeout(() => {
                expect(pop.querySelector('.som-popup').classList.contains('som-popup-show')).to.true;
                pop.querySelectorAll('.som-list-item')[0].click();
                setTimeout(() => {
                    vm.$el.querySelectorAll('.som-button')[1].click();
                    setTimeout(() => {
                        expect(pop.querySelector('.som-popup').classList.contains('som-popup-show')).to.false;
                        expect(vm.shop[0]).to.equal('333');
                        done();
                    }, 50);
                }, 1000);
            }, 50);
        }, 50);
    });

    it('two-level single-city-multiple', (done) => {
        vm = createVue({
            template: `
                <som-shop-select
                    :shop-data="shops"
                    :show="true"
                    is-all
                    single-city-multiple
                    :all-shop="{ show: true, disabled: false}"
                    :flat-numer="7"
                    v-model="shop"></som-shop-select>
                `,
            data () {
                return {
                    shop: [],
                    shops: shops,
                    valueLable: ''
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-index-list')).to.exist;
            let all = vm.$el.querySelectorAll('.som-list')[0];
            let beijin = vm.$el.querySelectorAll('.som-list')[1].querySelector('.som-list-item');
            let pop = document.querySelectorAll('.som-shop-select__popup')[3];
            beijin.click();
            setTimeout(() => {
                expect(pop.querySelector('.som-popup').classList.contains('som-popup-show')).to.true;
                pop.querySelectorAll('.som-list-item')[0].click();
                setTimeout(() => {
                    pop.querySelectorAll('.som-button')[1].click();
                    setTimeout(() => {
                        expect(pop.querySelector('.som-popup').classList.contains('som-popup-show')).to.false;
                        expect(vm.shop.length).to.equal(2);
                        all.querySelector('.som-list-item').click();
                        setTimeout(() => {
                            expect(vm.shop.length).to.equal(8);
                            done();
                        }, 50);
                    }, 50);
                }, 1000);
            }, 50);
        }, 50);
    });
});

