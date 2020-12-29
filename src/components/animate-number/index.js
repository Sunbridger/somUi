import AnimateNumber from './src/animate-number';

/* istanbul ignore next */
AnimateNumber.install = function(Vue) {
    Vue.component(AnimateNumber.name, AnimateNumber);
};

export default AnimateNumber;
