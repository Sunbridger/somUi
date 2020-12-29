import IndexList from './src/main';

/* istanbul ignore next */
IndexList.install = function(Vue) {
    Vue.component(IndexList.name, IndexList);
};

export default IndexList;
