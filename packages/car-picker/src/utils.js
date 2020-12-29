import HttpRequest from '@souche-f2e/http-request';
import {
    BRAND,
    SERIES,
    MODEL,
    SINGLE_BRAND,
    SINGLE_BRAND_SINGLE_SERIES,
    SINGLE_BRAND_SINGLE_SERIES_SINGLE_MODEL,
    NO_LIMIT_DATA
} from './constant';

const retrieveUrl = function(url) {
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

        //获取最后一个参数
        let lastParam = paramStringPairs[paramStringPairs.length - 1];
        let lastParamPairs = lastParam && lastParam.split('=');
        if (lastParamPairs && !lastParamPairs[1]) {
            lastParamWithoutValue = lastParamPairs[0];
        }

    }
    //需要根据url类型，发送不同的请求；
    return {
        type: urlType, //url类型：json或者jsonp
        params: params, //默认参数
        path: urlPath, //url的路径部分
        parentParamName: lastParamWithoutValue //路径的最后一个参数，且该参数没有赋值
    };
};


const copyObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

const isSingleSelectedScene = function(scene) {
    return scene === SINGLE_BRAND
    || scene === SINGLE_BRAND_SINGLE_SERIES
    || scene === SINGLE_BRAND_SINGLE_SERIES_SINGLE_MODEL;
};

const buildSelectedBrandData = function(allData) {
    let allDataCopy = copyObj(allData);
    let selectedData = [];
    for (let i = 0, len = allDataCopy.length; i < len; i += 1) {
        let brandItem = allDataCopy[i];
        if (brandItem.isSelected) {
            selectedData.push(brandItem);
        }
    }
    return selectedData;
};

const buildSelectedModelData = function(parentSeriesObj) {
    let seriesItem = copyObj(parentSeriesObj);
    let selectedModel = null;
    if (seriesItem[MODEL]) {
        selectedModel = [];
        for (let k = 0, len = seriesItem[MODEL].length; k < len; k += 1) {
            let modelItem = seriesItem[MODEL][k];
            if (modelItem.isSelected) {
                if (modelItem.code === NO_LIMIT_DATA[MODEL].code) {
                    selectedModel = [modelItem];
                    break;
                } else {
                    selectedModel.push(modelItem);
                }
            }
        }
    }
    return selectedModel;
};

const buildSelectedSeriesData = function(parentBrandObj, isClickEnd) {
    let brandItem = copyObj(parentBrandObj);
    let selectedSeries = null;
    if (brandItem[SERIES]) {
        selectedSeries = [];
        for (let j = 0, len = brandItem[SERIES].length; j < len; j += 1) {
            let seriesItem = brandItem[SERIES][j];
            if (seriesItem.isSelected) {
                if (seriesItem.code === NO_LIMIT_DATA[SERIES].code) {
                    selectedSeries = [NO_LIMIT_DATA[SERIES]];
                    break;
                } else {
                    selectedSeries.push(seriesItem);
                    if (!isClickEnd) {
                        seriesItem[MODEL] = buildSelectedModelData(seriesItem);
                    } else {
                        delete seriesItem[MODEL];
                    }
                }
            }
        }
    }
    return selectedSeries;
};

const getGroupDataFromServerByType = function (type, urlInfo) {
    let requestPromise;
    if (urlInfo[type].type === 'jsonp') {
        requestPromise = HttpRequest.jsonp(urlInfo[type].path, urlInfo[type].params);
    } else {
        requestPromise = HttpRequest.request({
            url: urlInfo[type].path,
            type: 'get',
            data: urlInfo[type].params
        });
    }
    return requestPromise;
};

/**
 * @param {*} allData: 当前的展示的全部数据
 * @param {*} currentScene : 当前选择器的scene
 * @param {*} isClickEnd : 是否是SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL模式下，点击车系结束，而不是点击到车型结束;
 */
const buildSelectedData = function(allData, currentScene, isClickEnd) {
    let allDataCopy = copyObj(allData);
    let selectedData = [];
    for (let i = 0, len = allDataCopy.length; i < len; i += 1) {
        let brandItem = allDataCopy[i];
        if (brandItem.isSelected) {
            if (brandItem.code === NO_LIMIT_DATA[BRAND].code) {
                return {
                    isAllBrandSelected: true //选择了不限品牌或者全部品牌
                };
            } else {
                let selectedSeries = buildSelectedSeriesData(brandItem, isClickEnd);
                brandItem[SERIES] = selectedSeries;
                selectedData.push(brandItem);
            }
        }
    }
    let resultSelectedData = {};
    if (isSingleSelectedScene(currentScene)) {
        let brandData = selectedData[0];
        let seriesData;
        let modelData;
        if (brandData && brandData[SERIES]) {
            seriesData = brandData[SERIES][0];
            delete brandData[SERIES];
            if (seriesData && seriesData[MODEL]) {
                modelData = seriesData[MODEL][0];
                delete seriesData[MODEL];
            }
        }
        resultSelectedData = {
            [BRAND]: brandData,
            [SERIES]: seriesData,
            [MODEL]: modelData
        };
    } else {
        resultSelectedData = {
            [BRAND]: selectedData
        };
    }
    return resultSelectedData;
};


export default {
    retrieveUrl,
    copyObj,
    isSingleSelectedScene,
    buildSelectedData,
    buildSelectedBrandData,
    getGroupDataFromServerByType
};
