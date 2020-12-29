import Flexbox from './src/flexbox';

/* istanbul ignore next */
Flexbox.install = function(Vue) {
    Vue.component(Flexbox.name, Flexbox);
};

export default Flexbox;
