import FilterItem from '../filter/src/filter-item';

/* istanbul ignore next */
FilterItem.install = function(Vue) {
    Vue.component(FilterItem.name, FilterItem);
};

export default FilterItem;
