<template>
    <div class="som-car-picker">
        <som-selector-cascader
            ref="somCarSelectorCascader"
            :confirmButtonColor="confirmButtonColor"
            :resetButtonColor="resetButtonColor"
            @close-cascader-group="closeCascaderGroup"
            @on-global-reset-selected="onGlobalResetSelected"
            @on-global-confirm-selected="confirmSelected"
            :hasGlobalFooter="hasGlobalFooter">
            <slot name="loading" slot="loading"></slot>
            <som-selector-group 
                ref="group"
                v-for="(group, groupIndex) in groups"
                :multiple="shouldShowFooterButton(group.type)"
                :multipleSelected="confirmSelected"
                :isFirstGroup="groupIndex===0"
                :showAlphaToast="showAlphaToast"
                :alphabetColor="alphabetColor"
                :confirmButtonColor="confirmButtonColor"
                :resetButtonColor="resetButtonColor"
                :key="groupIndex"
                :label="group.label"
                @on-group-scrolling="onGroupScrolling(groupIndex)"
                @on-multiple-deselected="onGroupMultipleDeseclected(groupIndex)">
                <div v-if="groupIndex===0">
                    <slot></slot>
                </div>

                <som-selector-item v-if="All[group.type]"
                    :key="All[group.type].name"
                    :title="All[group.type].label || ''" 
                    :index="All[group.type].label">
                    <som-selector-list-item 
                        v-for="(item) in All[group.type].childrens"
                        :key="item.code"
                        :label="item.name"
                        :value="item"
                        :image="item.image"
                        :labelActivedColor="labelActivedColor"
                        :itemMode="!(item.code.indexOf('all') > -1) ? group.itemMode : 1"
                        :showCheckboxButton="shouldItemShowCheckboxButton(group.type)"
                        :selected="item.isSelected"
                        :goNextGroupText="group.goNextGroupText"
                        @click="itemSelected(group.type, $event)"
                        @clickItemEnd="itemSelected(group.type, $event, true)">
                    </som-selector-list-item>
                </som-selector-item>

                <div v-if="groupIndex===2" class="model-filter-wrap">
                    <slot name="modelFilter"></slot>
                </div>

                <som-selector-item 
                    v-for="groupSection in group.childrens"
                    :key="groupSection.name"
                    :title="groupSection.label || ''" 
                    :index="groupSection.label">
                    <som-selector-list-item 
                        v-for="(item) in groupSection.childrens"
                        :key="item.code"
                        :label="item.name"
                        :value="item"
                        :image="item.image"
                        :labelActivedColor="labelActivedColor"
                        :itemMode="!(item.code.indexOf('all') > -1) ? group.itemMode : 1"
                        :showCheckboxButton="shouldItemShowCheckboxButton(group.type)"
                        :selected="item.isSelected"
                        :goNextGroupText="group.goNextGroupText"
                        @click="itemSelected(group.type, $event)"
                        @clickItemEnd="itemSelected(group.type, $event, true)">
                    </som-selector-list-item>
                </som-selector-item>
            </som-selector-group>
        </som-selector-cascader>
    </div>
</template>

<script>

import SomSelectorCascader from './../../components/selector-b/selector-cascader';
import SomSelectorGroup from './../../components/selector-b/selector-group';
import SomSelectorListItem from './../../components/selector-b/selector-list-item';
import SomSelectorItem from './../../selector-item';
import utils from './utils';

import {
    BRAND,
    SERIES,
    MODEL,
    SERIES_OR_MODEL,
    SINGLE_BRAND,
    SINGLE_BRAND_SINGLE_SERIES,
    SINGLE_BRAND_SINGLE_SERIES_SINGLE_MODEL,
    SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL,
    SINGLE_BRAND_MULTIPLE_SERIES,
    MULTIPLE_BRAND,
    MULTIPLE_BRAND_MULTIPLE_SERIES,
    MULTIPLE_BRAND_MULTIPLE_SERIES_MULTIPLE_MODEL,
    NO_LIMIT_DATA
} from './constant';
import { type } from 'os';

const ITEM_NORMAL_MODE = 1; //选中当前item触发click事件
const ITEM_HAVE_TWO_STATE_MODE = 2; //选中item触发selectEnd()或者选择右侧触发click事件
/**
 * 选中逻辑，设置选中的项，isSelected属性为true;
 * 选中结束之后，遍历所有对象,找出所有isSelected属性为true的对象;
 */
export default {
    name: 'SomCarPicker',
    props: {
        scene: {
            type: [String, Number],
            default: 1
        },
        activedValue: Object,
        brandDataUrl: {
            type: [String,Function],
            default: 'https://car-model.souche.com/brand/brands.jsonp'
        },
        seriesDataUrl: {
            type: [String,Function],
            default: 'https://car-model.souche.com/series/getSeriesByBrand.jsonp'
        },
        modelDataUrl: {
            type: [String,Function],
            default: 'https://car-model.souche.com/model/getModelBySeries.jsonp'
        },
        //modelSelectText属性的用处：SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL: 单品牌单车系多车型的情况下，车系选择栏，展示车系信息和“modelSelectText”信息；点击modelSelectText，打开车型选择栏；
        modelSelectText: {
            type: String,
            default: '选车型'
        },
        showAlphaToast: {
            type: Boolean,
            default: true
        },
        //显示不限品牌选项，目前只在单选情况下允许配置
        showUnlimitBrand: {
            type: Boolean,
            default: true
        },
        //显示不限车系选项，目前只在单选情况下允许配置
        showUnlimitSeries: {
            type: Boolean,
            default: true
        },
        //显示不限车型选项，目前只在单选情况下允许配置
        showUnlimitModel: {
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
        },
        filterModelMethod: Function
    },
    components: {
        SomSelectorItem,
        SomSelectorGroup,
        SomSelectorListItem,
        SomSelectorCascader
    },
    data() {
        return {
            sceneNumber: Number.parseInt(this.scene),
            groups: [],
            selectedData: [],
            type: MODEL,
            multipleConfig: {
                [BRAND]: false,
                [SERIES]: false,
                [MODEL]: false
            },
            noLimitDataShowCtrl: {
                [BRAND]: false,
                [SERIES]: false,
                [MODEL]: false
            },
            //不限品牌，不限车型，不限车系对象 //拷贝对象：是因为需要对noLimitData进行修改，以防影响其他地方的使用；
            noLimitData: utils.copyObj(NO_LIMIT_DATA),
            //存储当前全部品牌数据，如果是多选的情况下，品牌下还有车系数据，车系下面还有车型数据；存储的数据，用于记录当前选中状态;
            allData: [],
            currentBrandGroupAll: null,
            currentSeriesGroupAll: null,
            currentModelGroupAll: null,
            lastClickBrandData: {},
            lastClickSeriesData: {},
            lastClickModelData: {},
            hasGlobalFooter: false,
            urlInfo: {
                //用于存储，请求路径，请求参数；对于车系和车型，在打开下一级的时候，参数会变化
                [BRAND]: {
                    type: 'json',
                    path: '',
                    params: {}
                }
            },
            All: {
                [BRAND]: '',
                [SERIES]: '',
                [MODEL]: ''
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            switch (this.sceneNumber) {
                case SINGLE_BRAND:
                    this.multipleConfig[BRAND] = false;
                    this.noLimitDataShowCtrl[BRAND] = this.showUnlimitBrand;
                    this.type = BRAND;
                    break;
                case SINGLE_BRAND_SINGLE_SERIES:
                    this.multipleConfig[BRAND] = false;
                    this.multipleConfig[SERIES] = false;
                    this.noLimitDataShowCtrl[BRAND] = this.showUnlimitBrand;
                    this.noLimitDataShowCtrl[SERIES] = this.showUnlimitSeries;
                    this.type = SERIES;
                    break;
                case SINGLE_BRAND_SINGLE_SERIES_SINGLE_MODEL:
                    this.multipleConfig[BRAND] = false;
                    this.multipleConfig[SERIES] = false;
                    this.multipleConfig[MODEL] = false;
                    this.noLimitDataShowCtrl[BRAND] = this.showUnlimitBrand;
                    this.noLimitDataShowCtrl[SERIES] = this.showUnlimitSeries;
                    this.noLimitDataShowCtrl[MODEL] = this.showUnlimitModel;
                    this.type = MODEL;
                    break;
                case SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL:
                    this.multipleConfig[BRAND] = false;
                    this.multipleConfig[SERIES] = false;
                    this.multipleConfig[MODEL] = true;
                    this.noLimitDataShowCtrl[BRAND] = true;
                    this.noLimitDataShowCtrl[SERIES] = true;
                    this.noLimitDataShowCtrl[MODEL] = true;
                    this.type = SERIES_OR_MODEL;
                    break;
                case SINGLE_BRAND_MULTIPLE_SERIES:
                    this.multipleConfig[BRAND] = false;
                    this.multipleConfig[SERIES] = true;
                    this.noLimitDataShowCtrl[BRAND] = true;
                    this.noLimitDataShowCtrl[SERIES] = true;
                    this.type = SERIES;
                    break;
                case MULTIPLE_BRAND:
                    this.multipleConfig[BRAND] = true;
                    this.noLimitDataShowCtrl[BRAND] = true;
                    this.type = BRAND;
                    break;
                case MULTIPLE_BRAND_MULTIPLE_SERIES:
                    this.multipleConfig[BRAND] = true;
                    this.multipleConfig[SERIES] = true;
                    this.noLimitDataShowCtrl[BRAND] = true;
                    this.noLimitDataShowCtrl[SERIES] = true;
                    this.type = SERIES;
                    this.hasGlobalFooter = true;
                    break;
                case MULTIPLE_BRAND_MULTIPLE_SERIES_MULTIPLE_MODEL:
                    this.multipleConfig[BRAND] = true;
                    this.multipleConfig[SERIES] = true;
                    this.multipleConfig[MODEL] = true;
                    this.noLimitDataShowCtrl[BRAND] = true;
                    this.noLimitDataShowCtrl[SERIES] = true;
                    this.noLimitDataShowCtrl[MODEL] = true;
                    this.hasGlobalFooter = true;
                    break;
                default: throw new Error('scene 值只能为1，2，3，4，5, 6, 7, 8');
            }
            this.setNoLimitOptionsParams();
            this.retrieveSourceUrlInfo();
            this.getBrand((brandData) => {
                this.setBrand(brandData);
                this.setActivedValue();
            });
        },
        setNoLimitOptionsParams() {
            //这个和showCheckbox逻辑有重复的部分；
            if (this.type === BRAND && this.multipleConfig[BRAND]) {
                this.noLimitData[BRAND].name = '全部品牌';
            }
            if (this.type === SERIES && this.multipleConfig[SERIES]) {
                this.noLimitData[SERIES].name = '全部车系';
            }
            if (this.type === SERIES_OR_MODEL
                    || (this.type === MODEL && this.multipleConfig[MODEL])) {
                this.noLimitData[MODEL].name = '全部车型';
            }
        },
        setActivedValue() {
            if (!this.activedValue) return;
            let activedValue;
            if (this.activedValue.isAllBrandSelected) {
                activedValue = [this.noLimitData[BRAND]];
            } else if (utils.isSingleSelectedScene(this.sceneNumber)) {
                if (this.activedValue[BRAND]) {
                    let brandItem = this.activedValue[BRAND];
                    activedValue = [brandItem];
                    if (this.activedValue[SERIES]) {
                        let seriesItem = this.activedValue[SERIES];
                        brandItem[SERIES] = [seriesItem];
                        if (this.activedValue[MODEL]) {
                            let modelItem = this.activedValue[MODEL];
                            seriesItem[MODEL] = [modelItem];
                        }
                    }
                }
            } else {
                activedValue = this.activedValue[BRAND];
            }
            if (Array.isArray(activedValue) && activedValue.length > 0) {
                let activedValueExceptLast = activedValue.slice(0, -1);
                //如果是多选的情况下，设置activedValue中其他的品牌也高亮
                if (activedValueExceptLast.length > 0 && this.multipleConfig[BRAND]) {
                    activedValueExceptLast.forEach((activedBrandItem) => {
                        this.allData.forEach((brandItem) => {
                            if (brandItem.code === activedBrandItem.code) {
                                brandItem.isSelected = true;
                                brandItem.activedValue = activedBrandItem[SERIES];
                            }
                        });
                    });
                }
                let lastBrandItem = activedValue[activedValue.length - 1];
                let lastBrandIndexInAllData = this.allData.filter(brand => lastBrandItem.code === brand.code)[0];
                if (!lastBrandIndexInAllData) return;
                lastBrandIndexInAllData.activedValue = lastBrandItem[SERIES];
                lastBrandIndexInAllData.isLastActivedValue = true;
                this.itemSelected(BRAND, lastBrandIndexInAllData);
            }
        },
        itemSelected(type, data, isClickEnd, isActiveValueTrigger) {
            let currentSelectItemType = type;
            if (currentSelectItemType === BRAND) {
                this.setBrandSelected(data);
            } else if (currentSelectItemType === SERIES) {
                this.setSeriesSelected(data, isClickEnd);
            } else if (currentSelectItemType === MODEL) {
                this.setModelSelected(data);
            }
            if (!isActiveValueTrigger) {
                if (isClickEnd) {
                    this.setSelectedEnd(isClickEnd);
                } else if (this.isEndState(currentSelectItemType, data)) {
                    this.setSelectedEnd();
                }
            }
        },
        isEndState(currentSelectItemType, data) {
            if (this.sceneNumber === SINGLE_BRAND) {
                return true;
            } else if (this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES) {
                return currentSelectItemType === SERIES || data.code === this.noLimitData[BRAND].code;
            } else if (this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES_SINGLE_MODEL) {
                return currentSelectItemType === MODEL || data.code === this.noLimitData[BRAND].code || data.code === this.noLimitData[SERIES].code;
            } else if (this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL) {
                return data.code === this.noLimitData[BRAND].code || data.code === this.noLimitData[SERIES].code;
            } else if (this.sceneNumber === SINGLE_BRAND_MULTIPLE_SERIES) {
                return data.code === this.noLimitData[BRAND].code;
            } else if (this.sceneNumber === MULTIPLE_BRAND_MULTIPLE_SERIES) {
                //这种情况下，全局按钮控制；
                return false;
            } else if (this.sceneNumber === MULTIPLE_BRAND_MULTIPLE_SERIES_MULTIPLE_MODEL) {
                //这种情况下，全局按钮控制；
                return false;
            }
            return false;
        },
        setSelectedEnd(isClickEnd) {
            let selectedDataAfterDealing = utils.buildSelectedData(this.allData, this.sceneNumber, isClickEnd);
            this.$emit('onSelected', selectedDataAfterDealing);
        },
        buildSelectedBrandData() {
            return utils.buildSelectedBrandData(this.allData);
        },
        setGroupData({type, parentCode, label, childrens}) {
            // 如果重新设置了品牌的话，后面的车系和车型的栏要删除隐藏；
            let groupIndex;
            if (type === BRAND) {
                groupIndex = 0;
            } else if (type === SERIES) {
                groupIndex = 1;
            } else if (type === MODEL) {
                groupIndex = 2;
            }
            let groupData = {
                type: type,
                label: label,
                goNextGroupText: this.getGoNextGroupText(type),
                itemMode: this.getListItemMode(type),
                parentCode: parentCode,
                childrens: childrens
            };
            //删除该类型后面的子类型，例如，设置车系时，删除后面的车型；
            this.groups = this.groups.slice(0, groupIndex + 1);
            this.groups.splice(groupIndex, 1, groupData);
        },
        getGoNextGroupText(type) {
            if (type === SERIES && this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL) {
                return this.modelSelectText;
            }
        },
        getListItemMode(type) {
            if (type === SERIES && this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL) {
                return ITEM_HAVE_TWO_STATE_MODE;
            } else {
                return ITEM_NORMAL_MODE;
            }
        },
        setBrand(brandData) {
            this.currentBrandGroupAll = brandData;
            let brandDataAfterBuild = this.buildBrand(brandData);

            if (this.noLimitDataShowCtrl[BRAND]) {
                this.All[BRAND] = brandDataAfterBuild.shift();
            }

            this.setGroupData({
                type: BRAND,
                label: '',
                parentCode: null,
                childrens: brandDataAfterBuild
            });
        },
        buildBrand(brandData) {
            const obj = {};
            brandData.forEach((v) => {
                if (obj[v.initialsLetter] === undefined) {
                    obj[v.initialsLetter] = [];
                }
                obj[v.initialsLetter].push(v);
            });
            return Object.keys(obj).map((v) => {
                return {
                    label: v,
                    childrens: obj[v]
                };
            });
        },
        getBrand(callback) {
            let brandPromise;
            if (this.allData && this.allData.length > 0) {
                callback(this.allData);
            } else {
                if (typeof this.brandDataUrl === 'function') {
                    brandPromise = this.brandDataUrl();
                } else {
                    brandPromise =utils.getGroupDataFromServerByType(BRAND, this.urlInfo);
                }

                brandPromise.then((result) => {
                    this.noLimitDataShowCtrl[BRAND] && result.unshift(utils.copyObj(this.noLimitData[BRAND]));
                    this.allData = result;
                    callback(result);
                }).catch((err) => {
                    console.error(`getBrand: ${err}`);
                });
            }
        },
        setSeries(parentBrandObj, seriesData) {
            this.currentSeriesGroupAll = seriesData;
            let seriesDataAfterBuild = this.buildSeries(seriesData);

            if (this.noLimitDataShowCtrl[SERIES]) {
                this.All[SERIES] = seriesDataAfterBuild.shift();
            }
            this.setGroupData({
                type: SERIES,
                label: parentBrandObj.name,
                parentCode: parentBrandObj.code,
                childrens: seriesDataAfterBuild
            });
        },
        buildSeries(seriesData) {
            const obj = {};
            seriesData.forEach((v) => {
                let key = v.subBrandName !== undefined ? v.subBrandName : '车系';

                if (!obj[key]) {
                    obj[key] = [];
                }
                v.image = false;
                obj[key].push(v);
            });
            return Object.keys(obj).map((v) => {
                return {
                    label: v,
                    childrens: obj[v]
                };
            });
        },
        getSeries(parentBrandObj, callback) {
            let seriesDataInfo = this.getBrandSeriesDataFromAllData(parentBrandObj.code);
            let seriesParentBrandObj = seriesDataInfo.seriesParentBrandObj;
            let localSeriesData = seriesDataInfo.seriesData;
            if (this.multipleConfig[BRAND] && localSeriesData) {
                callback(parentBrandObj, localSeriesData);
            } else {
                let seriesPromise;

                if (typeof this.seriesDataUrl === 'function') {
                    seriesPromise = this.seriesDataUrl(parentBrandObj.code);
                } else {
                    let parentParamName = this.urlInfo[SERIES].parentParamName || 'brand_code';
                    this.urlInfo[SERIES].params[parentParamName] = parentBrandObj.code;
                    seriesPromise = utils.getGroupDataFromServerByType(SERIES, this.urlInfo)
                }

                seriesPromise.then((result) => {
                    this.noLimitDataShowCtrl[SERIES] && result.unshift(utils.copyObj(this.noLimitData[SERIES]));
                    result = this.dealingSeriesDataHasActivedSeries(seriesParentBrandObj, result);
                    seriesParentBrandObj[SERIES] = result;
                    callback(parentBrandObj, result);
                })
                .catch((err) => {
                    console.error(err);
                });
            }
        },
        dealingSeriesDataHasActivedSeries(seriesParentBrandObj, seriesData) {
            if (seriesParentBrandObj.activedValue) {
                let lastSeriesItem = seriesParentBrandObj.activedValue[seriesParentBrandObj.activedValue.length - 1];
                if (!lastSeriesItem) return;
                let lastSeriesItemInAllData = seriesData.filter(seriesItem => seriesItem.code === lastSeriesItem.code)[0];
                if (!lastSeriesItemInAllData) return;
                if (this.multipleConfig[SERIES]) {
                    let seriesItemExceptLast = seriesParentBrandObj.activedValue.slice(0, -1);
                    seriesItemExceptLast.forEach((activeSeriesItem) => {
                        seriesData.forEach((seriesItem) => {
                            if (activeSeriesItem.code === seriesItem.code) {
                                seriesItem.isSelected = true;
                                seriesItem.activedValue = activeSeriesItem[MODEL];
                            }
                        });
                    });
                }

                lastSeriesItemInAllData.activedValue = lastSeriesItem[MODEL];

                //保存当前展示的序列的索引值，之后通过这个对象控制展示
                this.currentSeriesGroupAll = seriesData;
                seriesParentBrandObj[SERIES] = seriesData;

                let isEnd = this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL && !lastSeriesItem.model; //在场景二的情况下，判断是选择了车系，还是选择了选车型
                if (seriesParentBrandObj.isLastActivedValue) {
                    this.itemSelected(SERIES, lastSeriesItemInAllData, isEnd, true);
                } else {
                    lastSeriesItemInAllData.isSelected = true;
                }
                seriesParentBrandObj.activedValue = null;
            }
            return seriesData;
        },
        removeChildDataWhenBrandSelected() {
            this.groups = this.groups.slice(0, 1);
        },
        setBrandSelectedInSingleSelection(brand) {
            if (this.lastClickBrandData) {
                this.$set(this.lastClickBrandData, 'isSelected', false);
            }
            this.$set(brand, 'isSelected', true);
        },
        setBrandSelectNoLimitOptions() {
            if (this.type === BRAND) {
                let willSelected = !this.currentBrandGroupAll[0].isSelected;
                this.currentBrandGroupAll.forEach((brandItem) => {
                    this.$set(brandItem, 'isSelected', willSelected);
                });
            } else {
                this.currentBrandGroupAll.forEach((brandItem) => {
                    if (brandItem.isSelected) {
                        this.$set(brandItem, 'isSelected', false);
                        brandItem[SERIES] = null;
                    }
                });
                this.$set(this.currentBrandGroupAll[0], 'isSelected', true);
            }
        },
        setBrandSelectedInMultipleSelection(brand) {
            if (brand.code === this.noLimitData[BRAND].code) {
                this.setBrandSelectNoLimitOptions();
            } else {
                let noLimitBrandOptions = this.currentBrandGroupAll[0];
                if (noLimitBrandOptions.isSelected) {
                    this.$set(noLimitBrandOptions, 'isSelected', false);
                }
                if (brand.isSelected) {
                    if (this.type !== BRAND) return;
                    this.$set(brand, 'isSelected', false);
                } else {
                    this.$set(brand, 'isSelected', true);
                    //不限选项联动
                    if (this.type === BRAND) {
                        let isAllSelected = true;
                        let brandData = this.allData;
                        for (let i = 0, len = brandData.length; i < len; i += 1) {
                            if (!brandData[i].isSelected
                                && brandData[i].code !== this.noLimitData[BRAND].code) {
                                isAllSelected = false;
                                break;
                            }
                        }
                        isAllSelected && this.$set(noLimitBrandOptions, 'isSelected', isAllSelected);
                    }
                }
            }
        },
        setBrandSelected(brandObj) {
            this.removeChildDataWhenBrandSelected();
            if (!this.multipleConfig[BRAND]) {
                this.setBrandSelectedInSingleSelection(brandObj);
            } else {
                this.setBrandSelectedInMultipleSelection(brandObj);
            }
            this.lastClickBrandData = brandObj;
            this.$emit('onSelectedBrand', this.buildSelectedBrandData());
            if (!this.brandObjHasNextGroup(brandObj)) return;
            this.getSeries(brandObj, this.setSeries.bind(this));
        },
        brandObjHasNextGroup(brandObj) {
            return this.type !== BRAND && brandObj.code !== this.noLimitData[BRAND].code;
        },
        removeChildDataWhenSeriesSelected() {
            this.groups = this.groups.slice(0, 2);
            if (!this.multipleConfig[SERIES]) {
                this.lastClickSeriesData.isSelected = false;
            }
        },
        setSeriesSelectedInSingleSelection(seriesObj, isEnd) {
            if (this.lastClickSeriesData) {
                this.$set(this.lastClickSeriesData, 'isSelected', false);
            }
            if (this.sceneNumber === SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL && !isEnd) {
                this.$set(seriesObj, 'isSelected', {
                    isSelected: true,
                    rightSpanSelect: true
                });
            } else {
                this.$set(seriesObj, 'isSelected', true);
            }
        },
        setSeriesSelectNoLimitOptions() {
            let willSelected = !this.currentSeriesGroupAll[0].isSelected;
            if (this.type === SERIES) {
                this.currentSeriesGroupAll.forEach((serie) => {
                    this.$set(serie, 'isSelected', willSelected);
                });
            } else {
                this.currentSeriesGroupAll.forEach((serie) => {
                    this.$set(serie, 'isSelected', false);
                    delete serie[MODEL];
                });
                this.$set(this.currentSeriesGroupAll[0], 'isSelected', true);
            }
        },
        setSeriesSelectedInMultipleSelection(seriesObj) {
            let parentBrandObj = this.lastClickBrandData;
            if (seriesObj.code === this.noLimitData[SERIES].code) {
                this.setSeriesSelectNoLimitOptions(parentBrandObj);
            } else {
                let noLimitSeriesOptions = this.currentSeriesGroupAll[0];
                if (noLimitSeriesOptions.isSelected) {
                    this.$set(noLimitSeriesOptions, 'isSelected', false);
                }
                if (seriesObj.isSelected) {
                    if (this.type !== SERIES) return;
                    this.$set(seriesObj, 'isSelected', false);
                } else {
                    this.$set(seriesObj, 'isSelected', true);
                    //不限选项联动;
                    if (this.type === SERIES) {
                        let isAllSelected = true;
                        let seriesData = parentBrandObj[SERIES];
                        for (let i = 0, len = seriesData.length; i < len; i += 1) {
                            if (!seriesData[i].isSelected
                                && seriesData[i].code !== this.noLimitData[SERIES].code) {
                                isAllSelected = false;
                                break;
                            }
                        }
                        isAllSelected && this.$set(noLimitSeriesOptions, 'isSelected', isAllSelected);
                    }
                }
            }
        },
        setSeriesSelected(seriesObj, isEnd) {
            this.removeChildDataWhenSeriesSelected();
            if (!this.multipleConfig[SERIES]) {
                this.setSeriesSelectedInSingleSelection(seriesObj, isEnd);
            } else {
                this.setSeriesSelectedInMultipleSelection(seriesObj);
            }
            this.lastClickSeriesData = seriesObj;
            if (!this.seriesObjHasNextGroup(seriesObj, isEnd)) return;
            this.$emit('on-series-click', seriesObj);
            this.getModel(seriesObj, this.setModel.bind(this));
        },
        seriesObjHasNextGroup(seriesObj, isEnd) {
            return this.type !== SERIES && seriesObj.code !== this.noLimitData[SERIES].code && !isEnd;
        },
        setModel(seriesObj, modelData) {
            this.currentModelGroupAll = modelData;
            let modelDataAfterBuild = this.buildModel(modelData);

            if (this.noLimitDataShowCtrl[MODEL]) {
                this.All[MODEL] = modelDataAfterBuild.shift();
            }

            this.setGroupData({
                type: MODEL,
                label: seriesObj.name,
                parentCode: seriesObj.code,
                childrens: modelDataAfterBuild
            });
            if (this.filterModelMethod) this.filterModelData();
        },
        filterModelData () {
            let filterModelRes;

            if (this.filterModelMethod) {
                filterModelRes = this.currentModelGroupAll.filter((item) => {
                    return this.filterModelMethod(item) && item.code !== 'model-all';
                });

                filterModelRes = this.buildModel(filterModelRes);
                this.groups[2].childrens = filterModelRes;
            } else {
                console.warn('请传入你的针对每个车型的 filterModelMethod 方法');
            }
        },
        buildModel(modelData) {
            const obj = {};
            modelData.forEach((v) => {
                if (obj[v.modelYear] === undefined) {
                    obj[v.modelYear] = [];
                }
                v.image = false;
                obj[v.modelYear].push(v);
            });
            let unOrderResult = Object.keys(obj).map((v) => {
                return {
                    label: v === this.noLimitData[MODEL].modelYear ? '' : v,
                    modelYear: v,
                    childrens: obj[v]
                };
            });
            return unOrderResult.sort((a, b) => {
                if (a.modelYear === this.noLimitData[MODEL].modelYear) return -1;
                if (b.modelYear === this.noLimitData[MODEL].modelYear) return 1;
                return Number.parseInt(b.modelYear) - Number.parseInt(a.modelYear);
            });
        },
        getModel(seriesObj, callback) {
            this.AllModelData = '';
            let seriesModelInfo = this.getModelDataFromParentSeries(this.currentSeriesGroupAll, seriesObj.code);
            let localModelData = seriesModelInfo.modelData;
            let modelParentSeriesObj = seriesModelInfo.modelParentSeriesObj;
            if (this.multipleConfig[SERIES] && localModelData) {
                callback(seriesObj, localModelData);
            } else {
                let modelPromise;
                if (typeof this.modelDataUrl === 'function') {
                    modelPromise = this.modelDataUrl(seriesObj.code);
                } else {
                    let parentParamName = this.urlInfo[MODEL].parentParamName || 'series_code';
                    this.urlInfo[MODEL].params[parentParamName] = seriesObj.code;
                    modelPromise = utils.getGroupDataFromServerByType(MODEL, this.urlInfo);
                }

                modelPromise.then((data) => {
                    this.noLimitDataShowCtrl[MODEL] && data.unshift(utils.copyObj(this.noLimitData[MODEL]));
                    data = this.dealingModelDataHasActivedModel(modelParentSeriesObj, data);
                    modelParentSeriesObj[MODEL] = data;
                    callback(seriesObj, data);
                })
                .catch((err) => {
                    console.error(`getModelData, ${err}`);
                });
            }
        },
        dealingModelDataHasActivedModel(modelParentSeriesObj, modelData) {
            if (modelParentSeriesObj.activedValue) {
                let lastModelItem = modelParentSeriesObj.activedValue[modelParentSeriesObj.activedValue.length - 1];

                if (!lastModelItem) return;
                let lastModelItemInAllData = modelData.filter(modelItem => modelItem.code === lastModelItem.code)[0];
                if (!lastModelItemInAllData) return;
                if (this.multipleConfig[MODEL]) {
                    let modelItemExceptLast = modelParentSeriesObj.activedValue.slice(0, -1);
                    modelItemExceptLast.forEach((activeModelItem) => {
                        modelData.forEach((modelItem) => {
                            if (activeModelItem.code === modelItem.code) {
                                modelItem.isSelected = true;
                                modelItem.activedValue = activeModelItem[MODEL];
                            }
                        });
                    });
                }
                //保存当前展示的序列的索引值，之后通过这个对象控制展示
                this.currentModelGroupAll = modelData;
                modelParentSeriesObj[MODEL] = modelData;

                this.itemSelected(MODEL, lastModelItemInAllData, false, true);
                modelParentSeriesObj.activedValue = null;
            }
            return modelData;
        },
        setModelSelectedInSingleSelection(modelObj) {
            if (this.lastClickModelData) {
                this.$set(this.lastClickModelData, 'isSelected', false);
            }
            this.$set(modelObj, 'isSelected', true);
        },
        setModelSelectedNoLimitOptions() {
            let willSelected = !this.currentModelGroupAll[0].isSelected;
            this.currentModelGroupAll.forEach((model) => {
                this.$set(model, 'isSelected', willSelected);
            });
        },
        setModelSelectedInMultipleSelection(modelObj) {
            let modelParentSeriesObj = this.lastClickSeriesData;
            if (modelObj.code === this.noLimitData[MODEL].code) {
                this.setModelSelectedNoLimitOptions();
            } else {
                let noLimitModelOptions = this.currentModelGroupAll[0];
                if (noLimitModelOptions.isSelected) {
                    this.$set(noLimitModelOptions, 'isSelected', false);
                }
                if (modelObj.isSelected) {
                    this.$set(modelObj, 'isSelected', false);
                } else {
                    this.$set(modelObj, 'isSelected', true);
                    //不限选项联动
                    let isAllSelected = true;
                    let modelData = modelParentSeriesObj[MODEL];
                    for (let i = 0, len = modelData.length; i < len; i += 1) {
                        if (!modelData[i].isSelected
                            && modelData[i].code !== this.noLimitData[MODEL].code) {
                            isAllSelected = false;
                            break;
                        }
                    }
                    isAllSelected && this.$set(noLimitModelOptions, 'isSelected', isAllSelected);
                }
            }
        },
        setModelSelected(data) {
            if (!this.multipleConfig[MODEL]) {
                this.setModelSelectedInSingleSelection(data);
            } else {
                this.setModelSelectedInMultipleSelection(data);
            }
            this.lastClickModelData = data;
        },
        shouldItemShowCheckboxButton(groupType) {
            if (this.type === SERIES_OR_MODEL) {
                return groupType === MODEL;
            } else {
                return this.multipleConfig[groupType] && groupType === this.type;
            }
        },
        shouldShowFooterButton(groupType) {
            if (this.type === SERIES_OR_MODEL) {
                return groupType === MODEL;
            } else {
                return groupType === this.type
                    && this.multipleConfig[groupType]
                    && this.sceneNumber !== MULTIPLE_BRAND_MULTIPLE_SERIES
                    && this.sceneNumber !== MULTIPLE_BRAND_MULTIPLE_SERIES_MULTIPLE_MODEL;
            }
        },
        getBrandSeriesDataFromAllData(brandCode) {
            //获取某品牌的车系数据
            let currentActivedBrandData = this.allData.filter(brand => brand.code === brandCode)[0];
            let hasSeriesData = currentActivedBrandData[SERIES] && Array.isArray(currentActivedBrandData[SERIES]);
            return {
                seriesData: hasSeriesData ? currentActivedBrandData[SERIES] : null,
                seriesParentBrandObj: currentActivedBrandData
            };
        },
        getModelDataFromParentSeries(currentSeriesGroupAll, seriesCode) {
            //获取某车系的车型数据
            let currentActivedSeriesData = currentSeriesGroupAll.filter(series => seriesCode === series.code)[0];
            let hasModelData = currentActivedSeriesData[MODEL] && Array.isArray(currentActivedSeriesData[MODEL]);
            return {
                modelData: hasModelData ? currentActivedSeriesData[MODEL] : null,
                modelParentSeriesObj: currentActivedSeriesData
            };
        },
        onGroupMultipleDeseclected(groupIndex) {
            switch (groupIndex) {
                case 0:
                    this.currentBrandGroupAll.forEach((brand) => {
                        brand.isSelected = false;
                        delete brand[SERIES];
                    });
                    this.$emit('onSelectedBrand', this.buildSelectedBrandData());
                    break;
                case 1:
                    this.currentSeriesGroupAll.forEach((series) => {
                        series.isSelected = false;
                        delete series[MODEL];
                    });
                    break;
                case 2:
                    this.currentModelGroupAll.forEach((model) => {
                        model.isSelected = false;
                    });
                    break;
            }
            this.$forceUpdate();
        },
        onGlobalResetSelected() {
            this.groups.splice(1, this.groups.length - 1);
            this.currentBrandGroupAll.forEach((brands) => {
                brands.isSelected = false;
                delete brands[SERIES];
            });
            this.$forceUpdate();
            this.$emit('onSelectedBrand', this.buildSelectedBrandData());
        },
        confirmSelected() {
            this.setSelectedEnd();
        },
        copyObj(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        closeCascaderGroup(index) {
            //关闭上第二级时，需要将后面的关闭掉；
            this.groups = this.groups.splice(0, index);
        },
        onGroupScrolling(index) {
            this.$refs.somCarSelectorCascader.closeGroupWithAnimation(index);
        },
        retrieveSourceUrlInfo() {
            if (this.brandDataUrl && typeof this.brandDataUrl ==='string') {
                this.urlInfo[BRAND] = utils.retrieveUrl(this.brandDataUrl);
            }
            if (this.seriesDataUrl && typeof this.seriesDataUrl ==='string') {
                this.urlInfo[SERIES] = utils.retrieveUrl(this.seriesDataUrl);
            }
            if (this.modelDataUrl && typeof this.modelDataUrl ==='string') {
                this.urlInfo[MODEL] = utils.retrieveUrl(this.modelDataUrl);
            }
        },
        openSeriesSection(brandItem) {
            let brandIndexInAllData = this.allData.filter(brand => brandItem.code === brand.code)[0];
            if (!brandIndexInAllData) return;
            this.itemSelected(
                BRAND,
                brandIndexInAllData
            );
        },
        /**
         * @param {number} index 1隐藏最外面的1层 2隐藏第一层和第二层
         * */
        hideSideGroup(index) {
            const sideGroup = this.$refs.group.slice(1);
            sideGroup.slice(index || 0).reverse().forEach((vm) => {
                vm.hideGroup();
            });
        }
    }
};
</script>
