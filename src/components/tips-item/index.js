import TipsItem from '../tips/src/tips-item';

/* istanbul ignore next */
TipsItem.install = function(Vue) {
    Vue.component(TipsItem.name, TipsItem);
};

export default TipsItem;
