import FlowItem from '../flow/src/flow-item';

/* istanbul ignore next */
FlowItem.install = function(Vue) {
    Vue.component(FlowItem.name, FlowItem);
};

export default FlowItem;
