import SlidePage from './src/main';

/* istanbul ignore next */
SlidePage.install = function(Vue) {
    Vue.component(SlidePage.name, SlidePage);
};

export default SlidePage;
