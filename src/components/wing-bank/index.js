import WingBank from './src/main';

/* istanbul ignore next */
WingBank.install = function(Vue) {
    Vue.component(WingBank.name, WingBank);
};

export default WingBank;
