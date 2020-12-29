import WhiteSpace from './src/main';

/* istanbul ignore next */
WhiteSpace.install = function(Vue) {
    Vue.component(WhiteSpace.name, WhiteSpace);
};

export default WhiteSpace;
