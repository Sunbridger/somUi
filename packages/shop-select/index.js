import ShopSelect from './src/main';

/* istanbul ignore next */
ShopSelect.install = function(Vue) {
    Vue.component(ShopSelect.name, ShopSelect);
};

export default ShopSelect;
