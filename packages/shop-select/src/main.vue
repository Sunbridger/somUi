<template>
    <!-- 平铺下单选模式 -->
    <div v-if="isFlat && !multiple" class="som-shop-select" v-show="show">
        <som-list title="我的门店" v-if="myShop">
            <som-list-item
                @click.native="selectMyShop(myShop)">
                <span slot="title" 
                    :class="!isAllShop && isMyShop && 'shop--selected'">{{myShop[nameKey]}}</span>
            </som-list-item>
        </som-list>

        <som-list title="*" v-if="allShop.show">
            <som-list-item
                :disabled="allShop.disabled"
                @click.native="SelectAllShops">
                <span slot="title" :class="isAllShop && 'all--selected'">{{allShopTitle}}</span>
            </som-list-item>
        </som-list>
        <som-list
            :class="getSelectStatus(item) && !isAllShop ? 'city-all-shop--selected' : ''"
            :title="item[cityKey]" 
            v-for="(item, index) in shopData" 
            :key="index">
            <som-list-item @click.native="SelectCityAll(item)" v-if="isAll">
                <span class="city-all-label" slot="title" >{{item[cityKey]}}全部</span>
            </som-list-item>

            <som-list-item
                @click.native="selectShop(shop, item)"
                v-for="shop in item.shops"
                :key="shop[storeKey]">
                <span slot="title" :class="getSelectStatus(shop[storeKey]) && !isAllShop && 'shop--selected'">{{shop[nameKey]}}</span>
            </som-list-item>
        </som-list>
    </div>

    <!-- 平铺下多选模式 -->
    <div v-else-if="isFlat && multiple" class="som-shop-select som-shop-select--multipleflat" v-show="show">
        <div class="multiple-flat">
            <som-checkbox :options="[{key: myShop[nameKey], value: myShop[storeKey]}]"
                v-if="myShop"
                title="我的门店"
                :max="shopNumber + 1"
                v-model="myShopVal"></som-checkbox>

            <p class="multiple-group-title">*</p>
            <som-checkbox-group :label="allShopTitle" @on-change-group="changeGroup">
                <som-checkbox
                    :max="shopNumber"
                    v-for="item in shopData"
                    :key="item[cityCodeKey]"
                    :options="FormatShops(item.shops, item[cityKey])"
                    v-model="multipleVal[item[cityKey]]" 
                    :title="item[cityKey]"></som-checkbox>
            </som-checkbox-group>
        </div>
        <div>
            <som-button-group flex-rank="three">
                <som-button @click="resetData" large>重置</som-button>
                <som-button type="primary" @click="selectMultiple" large>确定</som-button>
            </som-button-group>
        </div>
    </div>

    <!-- 二级筛选模式 -->
    <div class="som-shop-select" v-else v-show="show">
        <!-- 第一层 -->
        <som-index-list 
            :list="cityFristLetters" 
            :class="['index-list', multiple && 'multiple-frist-level']" 
            :bound-top="96">
            <som-list title="我的门店" v-if="myShop">
                <som-list-item
                    @click.native="selectMyShop(myShop)">
                    <span slot="title" 
                        :class="getSelectStatus(myShop[storeKey]) && !isAllShop && 'shop--selected'">{{myShop[nameKey]}}</span>
                </som-list-item>
            </som-list>

            <som-list title="*" v-if="allShop.show">
                <som-list-item
                    :disabled="allShop.disabled"
                    @click.native="SelectAllShops">
                    <span slot="title" :class="isAllShop && 'all--selected'">{{allShopTitle}}</span>
                </som-list-item>
            </som-list>

            <som-list
                :title="letter.title"
                :key="index"
                v-if="cityLettersGroup[letter.key]"
                v-for="(letter, index) in cityFristLetters">
                <som-list-item
                    @click.native="goSelectShop(area)"
                    v-for="(area, i) in cityLettersGroup[letter.key]"
                    :key="i">
                    <span slot="title" :class="((!isAllShop && selectCity.indexOf(area[cityKey]) !== -1) || activeProvince === area[cityKey]) && 'shop--selected'">{{area[cityKey]}}</span>
                </som-list-item>
            </som-list>
        </som-index-list>
        <div class="multiple-tool-fixed multiple-tool" v-if="multiple">
            <som-button-group flex-rank="three">
                <som-button @click="resetData" large>重置</som-button>
                <som-button type="primary" @click="selectMultiple" large>确定</som-button>
            </som-button-group>
        </div>

        <!-- 第二层弹窗 -->
        <div v-transfer-dom class="som-shop-select__popup">
            <som-popup v-model="showCityShop" position="right" :popup-style="{width: '80%'}" is-transparent>
                <div :class="['right-content', singleCityMultiple && 'sing-city-mult']">
                    <div class="right-shop-area">
                        <div>
                            <span class="popup-back" @click="showCityShop = false; activeProvince = '';">返回</span>
                            <span>{{rightDatas[cityKey]}}</span>
                        </div>
                    </div>

                    <!-- 单选 -->
                    <div v-if="!multiple && !singleCityMultiple" :class="getSelectStatus(rightDatas) && !isAllShop && 'city-all-shop--selected'">
                        <som-list>
                            <som-list-item @click.native="SelectCityAll(rightDatas, false)" v-if="isAll">
                                <span class="city-all-label" slot="title" >{{rightDatas[cityKey]}}全部</span>
                            </som-list-item>
                        </som-list>

                        <som-list :title="rightDatas[cityKey]">
                            <som-list-item
                                @click.native="selectShop(shop, rightDatas, false)"
                                v-for="shop in rightDatas.shops"
                                :key="shop[storeKey]">
                                <span slot="title" :class="getSelectStatus(shop[storeKey]) && !isAllShop && 'shop--selected'">{{shop[nameKey]}}</span>
                            </som-list-item>
                        </som-list>
                    </div>

                    <!-- 多选 -->
                    <div v-else>
                        <som-checkbox-group 
                            :label="rightDatas[cityKey] + '全部'" 
                            v-if="showCityShop"
                            v-model="multipleVal[rightDatas[cityKey]]"
                            @on-change-group="(val) => multipleChangeGroup(val, rightDatas[cityKey])">
                            <som-checkbox
                                :options="FormatShops(rightDatas.shops)"
                                :title="rightDatas[cityKey]"></som-checkbox>
                        </som-checkbox-group>
                    </div>
                    
                    <som-white-space size="54px"></som-white-space>
                </div>
                <div class="multiple-tool-single" v-if="singleCityMultiple">
                    <som-button-group flex-rank="three">
                        <som-button @click="resetData" large>重置</som-button>
                        <som-button type="primary" @click="selectMultiple" large>确定</som-button>
                    </som-button-group>
                </div>
            </som-popup>
        </div>
    </div>
</template>

<script>
import { TransferDom } from 'main';
import './main.css';

export default {
    name: 'SomShopSelect',
    directives: {
        TransferDom
    },
    props: {
        shopData: {
            type: Array,
            default () {
                return []
            }
        },
        props: {
            type: Object,
            default () {
                return {
                    store: 'store',
                    storeName: 'storeName',
                    cityCode: 'cityCode',
                    city: 'city',
                    firstLetter: 'firstLetter'
                }
            }
        },
        show: Boolean,
        flatNumer: {
            type: Number,
            default: 15
        },
        myShop: Object,
        allShop: {
            type: Object,
            default () {
                return {show: false, disabled: false, title: '全部门店'}
            }
        },
        isAll: Boolean,
        value: {
            type: Array,
            default () {
                return []
            }
        },
        multiple: Boolean,
        singleCityMultiple: Boolean
    },
    data () {
        return {
            singleCity: [],
            currentVal: [],
            cityFristLetters: [],
            cityLettersGroup: {},
            showCityShop: false,
            rightDatas: {shops: []},
            shopNumber: 0,
            multipleVal: {
                owner: [],
                all: []
            },
            selectCity: [],
            myShopVal: [],
            myShopCity: '',
            activeProvince: ''
        }
    },
    watch: {
        shopData () {
            this.initShopData();
        },
        myShopVal (val) {
            this.$nextTick(() => {
                let index = this.multipleVal[this.myShopCity].indexOf(this.myShop[this.storeKey]);
                if (val[0] && index === -1 && !this.isAllShop) {
                    this.multipleVal[this.myShopCity].push(this.myShop[this.storeKey]);
                }

                if (!val[0] && index !== -1) {
                    this.multipleVal[this.myShopCity].splice(index, 1);
                }
            });
        },
        isAllShop (val) {
            if (val && this.multiple && !this.isFlat) {
                this.selectCity = [];
                for (let city in this.multipleVal) {
                    this.selectCity.push(city);
                }
            }
        },
        value (val) {
            this.currentVal = val.slice();
            if (!this.isFlat) {
                this.getSelectCity();
            }
        },
        show (val) {
            if (val
                && !this.isFlat
                && !this.multiple &&
                !this.singleCityMultiple &&
                !this.isAllShop && this.currentVal.length) {
                this.showCityShop = true;
            }
        }
    },
    created () {
        if (this.value) this.currentVal = this.value.slice();
    },
    mounted () {
        this.initShopData();
    },
    computed: {
        allShopTitle () {
            return this.allShop.title || '全部门店'
        },
        isAllShop () {
            return this.currentVal.length === this.shopNumber;
        },
        isMyShop () {
            return this.currentVal.indexOf(this.myShop[this.storeKey]) !== -1;
        },
        isFlat () {
            let num = 0;
            for (let cityShop of this.shopData) {
                num += cityShop.shops.length;
            }
            this.shopNumber = num;
            return num < this.flatNumer;
        },
        cityCodeKey () {
            return this.props.cityCode || 'cityCode';
        },
        cityKey () {
            return this.props.city || 'city';
        },
        firstLetterKey () {
            return this.props.firstLetter || 'firstLetter';
        },
        storeKey () {
            return this.props.store || 'store';
        },
        nameKey () {
            return this.props.storeName || 'storeName'
        }
    },
    methods: {
        initShopData () {
            this.cityFristLetters = [];
            this.multipleVal = {};
            this.cityLettersGroup = {};
            this.selectCity = [];

            if (this.myShop) {
                this.cityFristLetters.push({key: '我', title: '我的门店'});
            }
            if (this.allShop.show) {
                this.cityFristLetters.push({key: '*', title: '*'});
            }

            for (let cityShop of this.shopData) {
                if (this.multiple || this.singleCityMultiple) {
                    this.multipleVal[cityShop[this.cityKey]] = [];
                }

                let letter = cityShop[this.firstLetterKey].toUpperCase();
                if (JSON.stringify(this.cityFristLetters).indexOf(letter) === -1) {
                    this.cityFristLetters.push({ key: letter, title: letter});
                }

                if (letter in this.cityLettersGroup) {
                    this.cityLettersGroup[letter].push(cityShop);
                } else {
                    this.cityLettersGroup[letter] = [];
                    this.cityLettersGroup[letter].push(cityShop);
                }

                if (!this.isFlat) {
                    for (let shop of cityShop.shops) {
                        if (this.currentVal.indexOf(shop[this.storeKey]) !== -1) {
                            if (this.selectCity.indexOf(cityShop[this.cityKey]) === -1) {
                                this.rightDatas = cityShop;
                                this.selectCity.push(cityShop[this.cityKey]);
                            }
                        }
                    }
                }
            }
            this.multipleVal= Object.assign({}, this.multipleVal)
        },
        getSelectCity () {
            this.selectCity = [];
            for (let cityShop of this.shopData) {
                for (let shop of cityShop.shops) {
                    if (this.currentVal.indexOf(shop[this.storeKey]) !== -1) {
                        if (this.selectCity.indexOf(cityShop[this.cityKey]) === -1) {
                            this.rightDatas = cityShop;
                            this.selectCity.push(cityShop[this.cityKey]);
                        }
                    }
                }
            }
        },
        initalMulGroupVals () {
            for (let city of this.shopData) {
                for (let shop of city.shops) {
                    if (this.currentVal.indexOf(shop[this.storeKey]) !== -1) {
                        this.multipleVal[city[this.cityKey]].push(shop[this.storeKey]);
                    }
                }
            }
        },
        resetData () {
            this.selectCity = [];
            this.activeProvince = '';
            this.showCityShop = false;
            for (let key in this.multipleVal) {
                this.multipleVal[key] = [];
            }
            this.$emit('input', []);
        },
        selectShop (shop, area, flat = true) {
            let city = {
                name: area[this.cityKey],
                code: area[this.cityCodeKey]
            }

            this.showCityShop = false;
            if (!this.multiple) {
                this.$emit('update:show', false);
            }
            if (!flat) this.selectCity = [city.name];
            if (this.value.join('') === shop[this.storeKey]) return;
            this.$emit('input', [shop[this.storeKey]]);
            this.$emit('on-change', {label: shop[this.nameKey], key: shop[this.storeKey], city});
        },
        selectMyShop (shop) {
            this.activeProvince = '';
            this.selectShop(shop, shop);
        },
        SelectAllShops () {
            if (this.allShop.disabled) return;
            this.activeProvince = '';
            let shops = [];
            for (let item of this.shopData) {
                for (let shop of item.shops) {
                    shops.push(shop[this.storeKey]);
                }
            }

            if (!this.multiple) {
                this.$emit('input', shops);
                this.$emit('update:show', false);
                this.$emit('on-change', { label: this.allShopTitle, key: shops });
                return;
            }
            this.currentVal = shops;
        },
        SelectCityAll (rightData, flat = true) {
            let city = {
                name: rightData[this.cityKey],
                code: rightData[this.cityCodeKey]
            }

            let shops = [];
            for (let shop of rightData.shops) {
                shops.push(shop[this.storeKey]);
            }
            this.showCityShop = false;
            this.$emit('update:show', false);

            if (this.value.join('') === shops.join('')) return;
            this.$emit('input', shops);
            if (!flat) this.selectCity = [city.name];
            this.$emit('on-change', { label: `${rightData[this.cityKey]}全部`, key: shops, city});
        },
        selectMultiple () {
            this.showCityShop = false;
            this.activeProvince = '';
            if (this.singleCityMultiple) {
                this.currentVal = this.singleCity;
                this.$emit('on-change', this.currentVal, this.selectCity);
            } else {
                this.$emit('on-change', this.currentVal);
            }
            this.$emit('input', this.currentVal);
            this.$emit('update:show', false);
        },
        changeGroup (val) {
            this.currentVal = val;
            if (val.indexOf(this.myShop[this.storeKey]) === -1 && this.myShopVal[0]) {
                this.myShopVal = [];
            }
            if (val.indexOf(this.myShop[this.storeKey]) !== -1 && !this.myShopVal[0]) {
                this.myShopVal = [this.myShop[this.storeKey]];
            }
        },
        multipleChangeGroup (value, city) {
            if(this.singleCityMultiple) {
                this.selectCity = value.length ? [city] : [];
                this.singleCity = value;
                return;
            }

            let cityIndex = this.selectCity.indexOf(city);
            if (value.length && cityIndex === -1) {
                this.selectCity.push(city)
            } else if (!value.length && cityIndex !== -1) {
                this.selectCity.splice(cityIndex, 1);
            }

            for (let shop of this.rightDatas.shops) {
                let id = shop[this.storeKey];
                let sindex = value.indexOf(id);
                let cindex = this.currentVal.indexOf(id);

                if (sindex === -1 && cindex !== -1) {
                    this.currentVal.splice(cindex, 1);
                }

                if (sindex !== -1 && cindex === -1) {
                    this.currentVal.push(id);
                }
            }
        },
        getSelectStatus (item) {
            // 判断是否地区全部
            if (item.shops) {
                let flag = true;
                for (let shop of item.shops) {
                    if (this.value.indexOf(shop[this.storeKey]) === -1){
                        flag = false;
                        return false;
                    }
                }
                return flag;
            }

            // 判断是否有门店
            return this.value.indexOf(item) !== -1;
        },
        FormatShops (shops, city) {
            let res = [];
            if (shops) {
                for (let shop of shops) {
                    if (this.myShop && shop[this.storeKey] === this.myShop[this.storeKey]) {
                        this.myShopCity = city || '';
                    };
                    res.push({key: shop[this.nameKey], value: shop[this.storeKey]});
                }
            }
            return res;
        },
        goSelectShop (area) {
            this.activeProvince = area[this.cityKey];
            this.showCityShop = true;

            if(this.multiple || this.singleCityMultiple) {
                this.multipleVal[area[this.cityKey]] = [];
                for (let shop of area.shops) {
                    if (this.currentVal.indexOf(shop[this.storeKey]) !== -1) {
                        this.multipleVal[area[this.cityKey]].push(shop[this.storeKey]);
                    }
                }
            }
            this.rightDatas = area;
        }
    }
}
</script>
