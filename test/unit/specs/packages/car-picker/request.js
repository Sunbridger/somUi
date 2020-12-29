import Brand from './brand.js';
import Series from './series.js';
import Model from './model.js';


exports.getGroupDataFromServerByType = function (type) {
    if (type === 'brand') {
        return Promise.resolve([].concat(Brand.data));
    }

    if (type === 'series') {
        return Promise.resolve([].concat(Series.data));
    }

    if (type === 'model') {
        return Promise.resolve([].concat(Model.data));
    }
};

