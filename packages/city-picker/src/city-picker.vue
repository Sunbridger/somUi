<template>
    <div class="som-city-picker">
        <som-selector-cascader
            ref="somCitySelectorCascader"
            :confirmButtonColor="confirmButtonColor"
            :resetButtonColor="resetButtonColor"
            @close-cascader-group="closeCascaderGroup"
            @on-global-reset-selected="onGlobalResetSelected"
            @on-global-confirm-selected="onGlobalConfirmSelected"
            :hasGlobalFooter="hasGlobalFooter">
            <slot name="loading" slot="loading"></slot>
            <som-selector-group
                ref="group"
                :multiple="shouldGroupShowFooterButton(group.type)"
                :multipleSelected="multipleSelected"
                :isFirstGroup="groupIndex===0"
                :showAlphaToast="showAlphaToast"
                v-for="(group, groupIndex) in groups"
                :key="group.type"
                :label="group.label"
                :confirmButtonColor="confirmButtonColor"
                :resetButtonColor="resetButtonColor"
                @on-group-scrolling="onGroupScrolling(groupIndex)"
                @on-multiple-deselected="onMultipleDeselected(group.type)">
                <div class="som-city-picker-slot" v-if="groupIndex===0">
                    <slot></slot>
                </div>
                <som-selector-item
                    v-for="groupSection in group.children"
                    :key="groupSection.label"
                    :title="groupSection.label"
                    :index="groupSection.label">
                    <som-selector-list-item
                        v-for="item in groupSection.children"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                        :showCheckboxButton="shouldItemShowCheckbox(group.type)"
                        :selected="isItemSelected(group.type, item.value, group.parentCode)"
                        :labelActivedColor="labelActivedColor"
                        @click="itemSelected(group.type, $event,group.parentCode)">
                    </som-selector-list-item>
                </som-selector-item>
            </som-selector-group>
        </som-selector-cascader>
    </div>
</template>

<script>
import HttpRequest from '@souche-f2e/http-request';
import SomSelectorCascader from './../../components/selector-b/selector-cascader';
import SomSelectorGroup from './../../components/selector-b/selector-group';
import SomSelectorListItem from './../../components/selector-b/selector-list-item';
import SomSelectorItem from 'packages/selector-item';

import {
    toggleSelected
} from '../util.js';

const CITY = 'city';
const PROVINCE = 'province';
const DISTRICT = 'district';
const municipalities = ['北京', '重庆', '上海', '天津'];
const SINGLE_PROVINCE = 1;
const SINGLE_PROVINCE_SINGLE_CITY = 2;
const SINGLE_PROVINCE_SINGLE_CITY_SINGLE_DISTRICT = 3;
const SINGLE_PROVINCE_MULTIPLE_CITY = 4;
const MULTIPLE_PROVINCE = 5;
const MULTIPLE_PROVINCE_MULTIPLE_CITY = 6;
const GROUPINDEXS = {
    [PROVINCE]: 0,
    [CITY]: 1,
    [DISTRICT]: 2
};
// const GROUP_ORDER_ARRAY = [PROVINCE, CITY, DISTRICT];
// 全国和城市，有些情况会联动，有些情况不联动；
/**
1.省份为多选，且省份为选择栏最后一级
2.城市为多选，且城市为选择栏最后一级
3.区或者县为多选，且区或者县为选择栏最后一级
**/
// 备注：联动为全部省份选中的情况下，全国选中；
/**
数据格式：
    必备字段： code, name, (extProps.letter或者letter)
    定义查询参数名: parent
    // 判断是请求地址是json还是jsonp，决定是请求json还是jsonp
 */
//有区的情况下，直辖市，不能直接结束
export default {
    name: 'SomCityPicker',
    components: {
        SomSelectorItem,
        SomSelectorGroup,
        SomSelectorListItem,
        SomSelectorCascader
    },
    props: {
        scene: {
            type: [String, Number],
            default: 1
        },
        activedValue: {
            type: Object
        },
        provinceDataUrl: {
            type: [String,Function],
            default: 'https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area'
        },
        cityDataUrl: {
            type: [String,Function],
            default: 'https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area'
        },
        districtDataUrl: {
            type: [String,Function],
            default: 'https://dic.souche.com/api/v1/queryDictionaries/load.jsonp?type=area'
        },
        showAlphaToast: {
            type: Boolean,
            default: true
        },
        //显示全国选项，目前只在省份单选情况下允许配置
        showAll: {
            type: Boolean,
            default: true
        },
        //显示“不限城市”选项，只在城市单选情况下允许配置
        showUnlimitCity: {
            type: Boolean,
            default: true
        },
        //显示“不限区/县”选项，只在省份单选情况下允许配置
        showUnlimitDistrict: {
            type: Boolean,
            default: true
        },
        labelActivedColor: {
            type: String
        },
        confirmButtonColor: {
            type: String
        },
        resetButtonColor: {
            type: String
        },
        alphabetColor: {
            type: String
        }
    },
    data() {
        return {
            sceneNumber: Number.parseInt(this.scene),
            provinceMultiple: false,
            cityMultiple: false,
            groups: [],
            selectedData: [],
            wholeCountryOptions: {
                initialsLetter: '*',
                name: '全国',
                code: 'all'
            },
            wholeProvinceOptions: {
                name: '全省',
                code: 'all'
            },
            noLimitCityOptions: {
                name: '不限城市',
                code: 'all'
            },
            noLimitDistrictOptions: {
                name: '不限区/县',
                code: 'all'
            },
            showWholeCountryOptions: true,
            showWholeProvinceOptions: true,
            showNoLimitDistrictOptions: true,
            multipleConfig: {},
            provinceDataAll: [], //全部省份数据
            currentProvinceCityDataAll: [], //全部城市数据
            hasGlobalFooter: false,
            urlInfo: {
                //用于存储，请求路径，请求参数；对于城市和区域，在打开下一级的时候，参数会变化
                [PROVINCE]: {
                    type: 'json',
                    path: '',
                    params: {}
                },
                [CITY]: {
                    type: 'json',
                    path: '',
                    params: {}
                }
            },
            lastSelectedData: {
                [PROVINCE]: {},
                [CITY]: {},
                [DISTRICT]: {}
            }
        };
    },
    mounted() {
        this.init();
    },
    computed: {
        provinceGroupData() {
            this.$refs.group[0].buildAlphabet();
            return this.groups[0];
        }
    },
    methods: {
        init() {
            switch (this.sceneNumber) {
                case SINGLE_PROVINCE:
                    this.provinceMultiple = false;
                    this.showWholeCountryOptions = this.showAll;
                    this.type = PROVINCE;
                    break;
                case SINGLE_PROVINCE_SINGLE_CITY:
                    this.provinceMultiple = false;
                    this.cityMultiple = false;
                    this.showWholeCountryOptions = this.showAll;
                    this.showWholeProvinceOptions = this.showUnlimitCity;
                    this.type = CITY;
                    break;
                case SINGLE_PROVINCE_SINGLE_CITY_SINGLE_DISTRICT:
                    this.provinceMultiple = false;
                    this.cityMultiple = false;
                    this.districtMultiple = false;
                    this.showWholeCountryOptions = this.showAll;
                    this.showWholeProvinceOptions = this.showUnlimitCity;
                    this.showNoLimitDistrictOptions = this.showUnlimitDistrict;
                    this.type = DISTRICT;
                    break;
                case SINGLE_PROVINCE_MULTIPLE_CITY:
                    this.provinceMultiple = false;
                    this.cityMultiple = true;
                    this.showWholeCountryOptions = true;
                    this.showWholeProvinceOptions = true;
                    this.type = CITY;
                    break;
                case MULTIPLE_PROVINCE:
                    this.provinceMultiple = true;
                    this.cityMultiple = false;
                    this.showWholeCountryOptions = true;
                    this.type = PROVINCE;
                    break;
                case MULTIPLE_PROVINCE_MULTIPLE_CITY:
                    this.provinceMultiple = true;
                    this.cityMultiple = true;
                    this.showWholeCountryOptions = true;
                    this.showWholeProvinceOptions = true;
                    this.type = CITY;
                    this.hasGlobalFooter = true;
                    break;
                default:
                    throw new Error('scene 变量值只能为0, 1，2，3，4');
            }
            this.multipleConfig[PROVINCE] = this.provinceMultiple;
            this.multipleConfig[CITY] = this.cityMultiple;
            this.retrieveSourceUrlInfo();
            this.getProvince((data) => {
                this.setProvince(data);
                this.setActivedValue();
            });
        },
        setActivedValue() {
            if (!this.activedValue) return;
            let lastSelectedProvince;
            if (this.activedValue.isWholeCountrySelected) {
                lastSelectedProvince = this.wholeCountryOptions;
                this.itemSelected(PROVINCE, lastSelectedProvince, '', true);
                return;
            }
            if (this.sceneNumber === SINGLE_PROVINCE
                || this.sceneNumber === SINGLE_PROVINCE_SINGLE_CITY
                || this.sceneNumber === SINGLE_PROVINCE_SINGLE_CITY_SINGLE_DISTRICT) {
                let lastSelectedData = {};
                if (this.activedValue[PROVINCE]) {
                    lastSelectedData = this.activedValue[PROVINCE];
                    lastSelectedData && this.activedValue[CITY] && (lastSelectedData[CITY] = [this.activedValue[CITY]]);
                    lastSelectedData[CITY] && this.activedValue[DISTRICT] && (lastSelectedData[CITY][0][DISTRICT] = [this.activedValue[DISTRICT]]);
                    lastSelectedProvince = lastSelectedData;
                }
                lastSelectedProvince && this.itemSelected(PROVINCE, lastSelectedProvince, '', true);
            } else if (Array.isArray(this.activedValue[PROVINCE]) && this.activedValue[PROVINCE].length > 0) {
                let provinces = this.activedValue[PROVINCE];
                this.selectedData = provinces.slice(0, -1);
                lastSelectedProvince = provinces[provinces.length - 1];
                this.itemSelected(PROVINCE, lastSelectedProvince, '', true);
            }
        },
        setProvince(data) {
            let dataBuild = this.buildProvince(data);
            this.setGroupData({
                type: PROVINCE,
                label: '',
                children: dataBuild
            });
        },
        buildProvince(data) {
            if (!data) return;
            let provinceData = [];

            this.showWholeCountryOptions && data.unshift(this.wholeCountryOptions);
            data.map((provinceObj, index) => {
                let initialsLetter;
                if (provinceObj.initialsLetter) {
                    initialsLetter = provinceObj.initialsLetter.toUpperCase();
                } else {
                    initialsLetter = index;
                }
                if (provinceData[initialsLetter] === undefined) {
                    provinceData[initialsLetter] = [];
                }
                provinceData[initialsLetter].push({
                    label: provinceObj.name,
                    value: provinceObj
                });
            });

            let unOrderResult = Object.keys(provinceData).map((initialsLetter) => {
                return {
                    label: initialsLetter,
                    key: initialsLetter,
                    children: provinceData[initialsLetter]
                };
            });
            return unOrderResult.sort((a, b) => {
                if (a.label === this.wholeCountryOptions.label) return false;
                if (b.label === this.wholeCountryOptions.label) return true;
                return a.label.charCodeAt(0) - b.label.charCodeAt(0);
            });
        },
        buildProvinceDataFromServer(data, callback) {
            data.forEach((item) => {
                item.initialsLetter = (item.extProps && item.extProps.letter) || item.letter;
            });
            this.provinceDataAll = data;
            typeof callback === 'function' && callback(data);
        },
        getProvince(callback) {
            let provinceRequestPromise;
            if(typeof this.provinceDataUrl ==='function'){
                provinceRequestPromise=this.provinceDataUrl();
            } else {
                if (this.urlInfo[PROVINCE].type === 'jsonp') {
                    provinceRequestPromise = HttpRequest.jsonp(this.urlInfo[PROVINCE].path, this.urlInfo[PROVINCE].params);
                } else {
                    provinceRequestPromise = HttpRequest.request({
                        url: this.urlInfo[PROVINCE].path,
                        type: 'get',
                        data: this.urlInfo[PROVINCE].params
                    });
                }
            }
            provinceRequestPromise
                .then((res) => {
                    this.buildProvinceDataFromServer(res, callback);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        setCity(province, data) {
            let dataBuild = this.buildCity(province, data);
            this.setGroupData({
                type: CITY,
                label: province.name,
                children: dataBuild,
                parentCode: province.code
            });
        },
        buildCity(province, data) {
            if (!data) return;
            let provinceCityData = [];
            let resultObj = [];
            if (this.showWholeProvinceOptions) {
                if (this.multipleConfig[CITY]) {
                    data.unshift(this.wholeProvinceOptions);
                } else {
                    data.unshift(this.noLimitCityOptions);
                }
            }
            provinceCityData = data.map((cityObj) => {
                return {
                    label: cityObj.name,
                    value: cityObj
                };
            });

            if (this.showWholeProvinceOptions) {
                let wholeProvinceSection = provinceCityData[0];
                resultObj.push({
                    label: '',
                    children: [wholeProvinceSection]
                });
                provinceCityData = provinceCityData.slice(1);
            }
            //如果全省显示的情况下，则省份上面的数据需要label栏。否则不需要
            resultObj.push({
                label: this.showWholeProvinceOptions ? province.name : '',
                children: provinceCityData
            });
            return resultObj;
        },
        getCity(province, callback) {
            if (!this.cityDataUrl) return;
            let requestPromise;
            if(typeof this.cityDataUrl ==='function'){
                requestPromise=this.cityDataUrl(province);
            } else {
                let parentParamsName = this.urlInfo[CITY].parentParamName || 'parent';
                this.urlInfo[CITY].params[parentParamsName] = province.code;
                if (this.urlInfo[CITY].type === 'jsonp') {
                    requestPromise = HttpRequest.jsonp(this.urlInfo[CITY].path, this.urlInfo[CITY].params);
                } else {
                    requestPromise = HttpRequest.ajax({
                        url: this.urlInfo[CITY].path,
                        type: 'get',
                        data: this.urlInfo[CITY].params
                    });
                }
            }
            requestPromise
                .then((data) => {
                    this.currentProvinceCityDataAll = data;
                    //处理默认选中城市,模拟点击城市，打开第三级
                    if (Array.isArray(province[CITY]) && province[CITY].length > 0 && this.scene + '' === '3') {
                        this.itemSelected(CITY, province.city[0], province.code, true);
                    }
                    callback(province, data);
                })
                .catch((error) => {
                    console.error(`getCityData,${error}`);
                });
        },
        multipleSelected() {
            this.setSelectedEnd();
        },
        setSelectedEnd() {
            let dataAfterDealing = this.dealingSelectedData();
            this.$emit('onSelected', dataAfterDealing);
        },
        dealingSelectedData() {
            //处理选中全国或者选中全省这种数据;
            //选中全国时，选中数据为全国选项；选中全省时，设置选中数据为全省选项；
            /**
                 选中全国的情况下: 结果为
                 {
                   isWholeCountrySelected: true
                 }
                 全部为单选的情况下，结果为
                 {
                    province: {},
                    city: {},
                    district: {}
                 }
                 其他情况下:
                 {
                    province: [{
                        code: '',
                        city: {
                            district: ''
                        }
                    }]
                 }
             */
            //拷贝一份数据，以防用户对选中数据操作。导致选择器中的数据混乱；
            let selectedDataCopy = JSON.parse(JSON.stringify(this.selectedData));
            let hasWholeCountryOptionsSelected = false;
            if (this.showWholeCountryOptions) {
                //如果当前显示全国，判断全国是否选中
                for (let i = 0, len = selectedDataCopy.length; i < len; i += 1) {
                    if (selectedDataCopy[i].code === this.wholeCountryOptions.code) {
                        hasWholeCountryOptionsSelected = true;
                        break;
                    }
                }
                if (hasWholeCountryOptionsSelected) {
                    selectedDataCopy = [this.wholeCountryOptions];
                    return {
                        //选中全国
                        isWholeCountrySelected: true
                    };
                }
            }

            if (!hasWholeCountryOptionsSelected && this.showWholeProvinceOptions) {
                for (let i = 0, len = selectedDataCopy.length; i < len; i += 1) {
                    let provinceCityDatas = selectedDataCopy[i][CITY];
                    let hasWholeProvinceOptionsSelected = false;
                    if (provinceCityDatas) {
                        for (let j = 0, len = provinceCityDatas.length; j < len; j += 1) {
                            if (provinceCityDatas[j].code === this.wholeProvinceOptions.code) {
                                hasWholeProvinceOptionsSelected = true;
                                break;
                            }
                        }
                        if (hasWholeProvinceOptionsSelected) {
                            if (this.multipleConfig[CITY]) {
                                provinceCityDatas = [this.wholeProvinceOptions];
                            } else {
                                provinceCityDatas = [this.noLimitCityOptions];
                            }
                            selectedDataCopy[i][CITY] = provinceCityDatas;
                        }
                    }
                }
            }
            if (this.sceneNumber === SINGLE_PROVINCE
                    || this.sceneNumber === SINGLE_PROVINCE_SINGLE_CITY
                    || this.sceneNumber === SINGLE_PROVINCE_SINGLE_CITY_SINGLE_DISTRICT) {
                let provinceData = selectedDataCopy[0];
                let resultObj = {};
                resultObj[PROVINCE] = provinceData;
                if (provinceData[CITY]) {
                    resultObj[CITY] = provinceData[CITY][0];
                    delete provinceData[CITY];
                    if (resultObj[CITY][DISTRICT]) {
                        resultObj[DISTRICT] = resultObj[CITY][DISTRICT][0];
                        delete resultObj[CITY][DISTRICT];
                    }
                }
                return resultObj;
            } else {
                return {
                    [PROVINCE]: selectedDataCopy
                };
            }
        },
        itemSelected(currentSelectItemType, data, parentCode, isActiveValueTrigger) {
            if (currentSelectItemType === PROVINCE) {
                this.setProvinceSelected(data).then(() => {
                    if (!isActiveValueTrigger) {
                        if (this.isEndState(currentSelectItemType, data)) {
                            this.setSelectedEnd();
                        }
                    }
                });
                return;
            } else if (currentSelectItemType === CITY) {
                this.setCitySelected(data, parentCode);
            } else if (currentSelectItemType === DISTRICT) {
                this.setDistrictSelected(data, parentCode);
            }
            if (!isActiveValueTrigger) {
                if (this.isEndState(currentSelectItemType, data)) {
                    this.setSelectedEnd();
                }
            }
        },
        isEndState(currentSelectItemType, data) {
            //选择结束判断，分为三种情况；
            //0:如果scene为1(单省份),结束
            //1.如果scene为1(单省份单城市)，且当前点击的是城市，或者点击的是省份那一栏中的直辖市，则为结束;补充：选择的是全国，也结束；
            //2.如果scene为2(单省份多城市)，且当前点击的是省份那一栏的直辖市或者点击的是全国，则为结束
            //3.如果scene为4(多省份多城市)，不处理；全局按钮处理返回
            //4.如果scene为(单省份单城市单区),选中不限省份，不限城市，或者城市结束
            if (this.sceneNumber === SINGLE_PROVINCE) {
                return true;
            } else if (this.sceneNumber === SINGLE_PROVINCE_SINGLE_CITY) {
                return currentSelectItemType === CITY || municipalities.indexOf(data.name) > -1 || data.name === this.wholeCountryOptions.name;
            } else if (this.sceneNumber === SINGLE_PROVINCE_MULTIPLE_CITY) {
                return municipalities.indexOf(data.name) > -1 || data.name === this.wholeCountryOptions.name;
            } else if (this.sceneNumber === MULTIPLE_PROVINCE_MULTIPLE_CITY) {
                return false;
            } else if (this.sceneNumber === SINGLE_PROVINCE_SINGLE_CITY_SINGLE_DISTRICT) {
                return currentSelectItemType === DISTRICT || data.name === this.wholeCountryOptions.name || data.name === this.noLimitCityOptions.name;
            }
            return false;
        },
        setGroupData({type, label, children, parentCode}) {
            // 如果重新设置了省份的话，后面的城市数据要删除；
            let groupIndex = GROUPINDEXS[type];
            let groupData = {
                type: type,
                label: label,
                children: children,
                parentCode: parentCode //父节点的code
            };
            this.groups.splice(groupIndex, 1, groupData);
            this.groups = this.groups.slice(0, groupIndex + 1);
        },
        getProvinceSelected (province) {
            if (this.sence + '' === '6') {
                return this.selectedData.find((item) => {
                    return item.code === province.code;
                });
            }
        },
        setProvinceSelected(provinceItem) {
            return new Promise((resolve, reject) => {
                let provinceCopy = JSON.parse(JSON.stringify(provinceItem));
                this.lastSelectedData[PROVINCE] = this.getProvinceSelected(provinceCopy) || provinceCopy;
                this.removeChildDataWhenProvinceSelected(provinceCopy);

                if (!this.multipleConfig[PROVINCE]) {
                    this.setProvinceSelectedDataInSingleSelection(provinceCopy);
                } else {
                    this.setProvinceSelectedDataInMultipleSelection(provinceCopy);
                }

                this.$emit('onSelectProvince', this.selectedData);

                let hasCityes = this.hasCityGroup(provinceCopy);
                if (!hasCityes) return resolve();

                if (hasCityes === 'oneCity') {
                    this.getCity(provinceCopy, (province, data) => {
                        for (let item of this.selectedData) {
                            if (item.code === provinceCopy.code) item.city = data;
                        }
                        return resolve();
                    });
                } else {
                    this.getCity(provinceCopy, (province, data) => {
                        this.setCity(province, data);
                    });
                }

            })
        },
        hasCityGroup(province) {
            //选择器没有下一级城市的情况:
            //1.当前选择到省份则结束
            //2.当前选了全国
            //3.当前选择到城市，且省份为单选，但是省份为直辖市
            if (this.type === PROVINCE) {
                return false;
            } else if (province.name === this.wholeCountryOptions.name) {
                return false;
            } else if (this.type === CITY && municipalities.indexOf(province.name) > -1) {
                return 'oneCity'; //直辖市
            }
            return true;
        },
        removeChildDataWhenProvinceSelected(province) {
            this.groups = this.groups.slice(0, 1);//删除省份后面的数据
            if (!this.multipleConfig[PROVINCE]
                && this.selectedData.length > 0
                && province.code !== this.selectedData[0].code) {
                this.selectedData = [];
            }
        },
        setProvinceSelectedDataInSingleSelection(province) {
            this.selectedData = [province];
        },
        setProvinceSelectedDataInMultipleSelection(province) {
            if (province.code === this.wholeCountryOptions.code) {
                this.setProvinceSelectWholeCountry();
                return;
            }
            //如果曾经选择过全国，则取消选中全国
            if (this.hasWholeCountryOptionsSelected()) {
                this.selectedData = toggleSelected(this.selectedData, this.wholeCountryOptions);
            }
            if (this.type === PROVINCE) {
                this.selectedData = toggleSelected(this.selectedData, province);
            } else {
                //如果该省份没被选过，则将省份push到选中数据中
                !this.isProvinceSelected(province) && this.selectedData.push(province);
            }
            if (this.type === PROVINCE && this.selectedData.length === this.provinceDataAll.length - 1) {
                this.setProvinceSelectWholeCountry();
            }
        },
        setProvinceSelectWholeCountry() {
            //如果省份为最后一级，则全国与其他城市联动，其他城市展示为全部选中，或者全部取消；
            //否则，只有“全国”选项展示为选中；
            if (this.type === PROVINCE) {
                //全部赋值，是为了取消选中单个省份的时候，selectedData可以删除省份数据，可以正确渲染；
                this.selectedData = !this.hasWholeCountryOptionsSelected() ? this.provinceDataAll : [];
            } else {
                this.selectedData = [this.wholeCountryOptions];
            }
        },
        hasWholeCountryOptionsSelected() {
            return this.selectedData.filter(province => province.code === this.wholeCountryOptions.code).length > 0;
        },
        isProvinceSelected(province) {
            let seclectedDataOfType = this.selectedData;
            return seclectedDataOfType
                    && Array.isArray(seclectedDataOfType)
                    && seclectedDataOfType.filter(item => item.code === province.code).length > 0;
        },
        isCitySelected(itemCity) {
            let selectedCityList = this.lastSelectedData[PROVINCE][CITY];
            return Array.isArray(selectedCityList) && selectedCityList.filter(item => item.code === itemCity.code).length > 0;
        },
        isItemSelected(itemType, itemData, parentCode) {
            if (itemType === PROVINCE) {
                return this.isProvinceSelected(itemData);
            } else if (itemType === CITY) {
                return this.isCitySelected(itemData, parentCode);
            } else if (itemType === DISTRICT) {
                return this.isDistrictSelected(itemData, parentCode);
            }
        },
        shouldItemShowCheckbox(type) {
            //当前选择栏为多选的情况下，同时为该选择栏，为最后一栏
            return this.multipleConfig[type] && type === this.type;
        },
        shouldGroupShowFooterButton(groupType) {
            return groupType === this.type && this.multipleConfig[groupType] && this.sceneNumber !== MULTIPLE_PROVINCE_MULTIPLE_CITY;
        },
        hasDistrictGroup(city) {
            if (this.scene === SINGLE_PROVINCE_SINGLE_CITY_SINGLE_DISTRICT) {
                return city.code !== this.wholeCountryOptions.code;
            }
            return false;
        },
        setCitySelected(city) {
            let cityCopy = JSON.parse(JSON.stringify(city));
            this.lastSelectedData[CITY] = cityCopy;
            let parentProvinceObj = this.lastSelectedData[PROVINCE];
            if (!this.multipleConfig[CITY]) {
                this.setCitySelectedInSingleSelection(parentProvinceObj, cityCopy);
            } else {
                this.setCitySelectedInMultipleSelection(parentProvinceObj, cityCopy);
            }
            this.$forceUpdate();
            if (!this.hasDistrictGroup(city)) return;
            this.getDistrict(city, (city, data) => {
                if (data.length > 0) {
                    this.setDistrict(city, data);
                } else if (!this.multipleConfig[DISTRICT]) {
                    //如果区县都不存在,且是单选的情况下，结束选择
                    this.setSelectedEnd();
                }
            });
        },
        setCitySelectedInSingleSelection(parentProvinceObj, city) {
            parentProvinceObj[CITY] = [city];
        },
        setCitySelectedInMultipleSelection(parentProvinceObj, city) {
            if (city.code === this.wholeProvinceOptions.code) {
                parentProvinceObj[CITY] = !this.hasWholeProvinceOptionsSelected(parentProvinceObj) ? this.currentProvinceCityDataAll : [];
            } else {
                parentProvinceObj[CITY] = toggleSelected(parentProvinceObj[CITY], city);
                //如果曾经选择过全省，则取消选中
                if (this.hasWholeProvinceOptionsSelected(parentProvinceObj)) {
                    parentProvinceObj[CITY] = toggleSelected(parentProvinceObj[CITY], this.wholeProvinceOptions);
                }
                if (parentProvinceObj[CITY].length === this.currentProvinceCityDataAll.length - 1) {
                    parentProvinceObj[CITY] = this.currentProvinceCityDataAll;
                }
            }
        },
        setDistrict(city, data) {
            let dataBuild = this.buildDistrict(city, data);
            this.setGroupData({
                type: DISTRICT,
                label: city.name,
                children: dataBuild,
                parentCode: city.code
            });
        },
        buildDistrict(city, data) {
            if (!data) return;
            let districtData = [];
            let resultObj = [];
            if (this.showNoLimitDistrictOptions) {
                data.unshift(this.noLimitDistrictOptions);
            }
            districtData = data.map((districtObj) => {
                return {
                    label: districtObj.name,
                    value: districtObj
                };
            });

            if (this.showNoLimitDistrictOptions) {
                let wholeDistrictOptions = districtData[0];
                resultObj.push({
                    label: '',
                    children: [wholeDistrictOptions]
                });
                districtData = districtData.slice(1);
            }
            resultObj.push({
                label: this.showNoLimitDistrictOptions ? city.name : '',
                children: districtData
            });
            return resultObj;
        },
        getDistrict(city, callback) {
            if (!this.districtDataUrl) return;
            let requestPromise;
            if(typeof this.districtDataUrl ==='function'){
                 requestPromise=this.districtDataUrl(city);
            } else {
                 let parentParamsName = this.urlInfo[CITY].parentParamName || 'parent';
                this.urlInfo[DISTRICT].params[parentParamsName] = city.code;
                if (this.urlInfo[DISTRICT].type === 'jsonp') {
                    requestPromise = HttpRequest.jsonp(this.urlInfo[DISTRICT].path, this.urlInfo[DISTRICT].params);
                } else {
                    requestPromise = HttpRequest.ajax({
                        url: this.urlInfo[DISTRICT].path,
                        type: 'get',
                        data: this.urlInfo[DISTRICT].params
                    });
                }
            }
            requestPromise
                .then((data) => {
                    this.currentDistrictDataAll = data;
                    //处理默认选中，选中城市
                    if (Array.isArray(city[DISTRICT]) && city[DISTRICT].length > 0) {
                        this.itemSelected(DISTRICT, city[DISTRICT][0], city.code, true);
                    }
                    callback(city, data);
                })
                .catch((error) => {
                    console.error(`getDistrict,${error}`);
                });
        },
        isDistrictSelected(item) {
            let currentVisibileDistrictList = this.lastSelectedData[CITY][DISTRICT];
            return Array.isArray(currentVisibileDistrictList) && currentVisibileDistrictList.filter(district => district.code === item.code).length > 0;
        },
        setDistrictSelected(district) {
            if (!this.multipleConfig[DISTRICT]) {
                this.lastSelectedData[CITY][DISTRICT] = [district];
                this.$forceUpdate();
            }
            // 多选暂未支持，待处理
        },
        getProvinceIndexFromSelectedData(provinceCode) {
            let provinceIndex;
            for (let i = 0, len = this.selectedData.length; i < len; i += 1) {
                if (this.selectedData[i].code === provinceCode) {
                    provinceIndex = i;
                    break;
                }
            }
            return provinceIndex;
        },
        onMultipleDeselected(deselectedType) {
            if (deselectedType === PROVINCE) {
                this.selectedData.splice(0, this.selectedData.length);
            } else if (deselectedType === CITY) {
                let lastGroupLabel = this.groups[this.groups.length - 1].label;
                let selectedProvinces = this.selectedData;
                selectedProvinces.forEach((province) => {
                    if (province.name === lastGroupLabel) {
                        province[CITY] = [];
                        this.$forceUpdate();
                    }
                });
            }
        },
        onGlobalResetSelected() {
            this.groups.splice(1, this.groups.length - 1);
            this.selectedData.splice(0, this.selectedData.length);
            this.$emit('onSelectProvince', []);
        },
        onGlobalConfirmSelected() {
            this.setSelectedEnd();
        },
        hasWholeProvinceOptionsSelected(parentProvinceObj) {
            return parentProvinceObj[CITY]
                && parentProvinceObj[CITY].filter(city => city.code === this.wholeProvinceOptions.code).length > 0;
        },
        retrieveUrl(url) {
            let urlQueryIndex = url.indexOf('?');
            let urlPath = urlQueryIndex > -1 ? url.substring(0, urlQueryIndex) : url;
            let urlType = (urlPath && urlPath.lastIndexOf('.jsonp')) > -1 ? 'jsonp' : 'json';
            let paramStringPairs = urlQueryIndex > -1 ? url.substring(urlQueryIndex + 1, url.length).split('&') : '';
            let params = {};
            let lastParamWithoutValue = '';
            if (paramStringPairs) {
                paramStringPairs.forEach((paramStringPair) => {
                    paramStringPair = paramStringPair.split('=');
                    params[paramStringPair[0]] = paramStringPair[1];
                });
            }

            //获取最后一个参数
            let lastParam = paramStringPairs[paramStringPairs.length - 1];
            let lastParamPairs = lastParam && lastParam.split('=');
            if (lastParamPairs && !lastParamPairs[1]) {
                lastParamWithoutValue = lastParamPairs[0];
            }

            //需要根据url类型，发送不同的请求；
            return {
                type: urlType, //url类型：json或者jsonp
                params: params, //默认参数
                path: urlPath, //url的路径部分
                parentParamName: lastParamWithoutValue //路径的最后一个参数，且该参数没有赋值
            };
        },
        retrieveSourceUrlInfo() {
            if (this.provinceDataUrl && typeof this.provinceDataUrl ==='string') {
                this.urlInfo[PROVINCE] = this.retrieveUrl(this.provinceDataUrl);
            }

            if (this.cityDataUrl && typeof this.cityDataUrl ==='string') {
                this.urlInfo[CITY] = this.retrieveUrl(this.cityDataUrl);
            }

            if (this.districtDataUrl && typeof this.districtDataUrl ==='string') {
                this.urlInfo[DISTRICT] = this.retrieveUrl(this.districtDataUrl);
            }
        },
        closeCascaderGroup(index) {
            //关闭上第二级时，将该级的数据删除掉；
            this.groups = this.groups.splice(0, index);
        },
        onGroupScrolling(index) {
            this.$refs.somCitySelectorCascader.closeGroupWithAnimation(index);
        },
        openCitySection(province) {
            this.itemSelected(PROVINCE, province);
        }
    }
};
</script>
