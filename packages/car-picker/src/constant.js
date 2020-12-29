const BRAND = 'brand';
const SERIES = 'series';
const MODEL = 'model';
const SERIES_OR_MODEL = 'seriesOrModel';

const SINGLE_BRAND = 1;
const SINGLE_BRAND_SINGLE_SERIES = 2;
const SINGLE_BRAND_SINGLE_SERIES_SINGLE_MODEL = 3;
const SINGLE_BRAND_SINGLE_SERIES_MULTIPLE_MODEL = 4;
const SINGLE_BRAND_MULTIPLE_SERIES = 5;
const MULTIPLE_BRAND = 6;
const MULTIPLE_BRAND_MULTIPLE_SERIES = 7;
const MULTIPLE_BRAND_MULTIPLE_SERIES_MULTIPLE_MODEL = 8;

const NO_LIMIT_DATA = {
    [BRAND]: {
        code: 'brand-all',
        initialsLetter: '*',
        name: '不限品牌',
        image: false
    },
    [SERIES]: {
        name: '不限车系',
        code: 'series-all',
        subBrandName: ''
    },
    [MODEL]: {
        name: '不限车型',
        code: 'model-all',
        modelYear: 'null'
    }
};
export {
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
};
