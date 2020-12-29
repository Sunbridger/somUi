import ActionTip from './src/action-tip';

/* istanbul ignore next */
ActionTip.install = function(Vue) {
    Vue.component(ActionTip.name, ActionTip);
};

export default ActionTip;
