import TabItem from '../tabs/src/tab-item';

/* istanbul ignore next */
TabItem.install = function(Vue) {
    Vue.component(TabItem.name, TabItem);
};

export default TabItem;
