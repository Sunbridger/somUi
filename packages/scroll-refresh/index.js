import ScrollRefresh from './src/scroll-refresh';

/* istanbul ignore next */
ScrollRefresh.install = function (Vue) {
    Vue.component(ScrollRefresh.name, ScrollRefresh);
};

export default ScrollRefresh;
