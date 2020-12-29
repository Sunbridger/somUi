import Flow from './src/flow';

/* istanbul ignore next */
Flow.install = function(Vue) {
    Vue.component(Flow.name, Flow);
};

export default Flow;
