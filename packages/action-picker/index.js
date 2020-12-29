import ActionPicker from './src/main';

/* istanbul ignore next */
ActionPicker.install = function (Vue) {
    Vue.component(ActionPicker.name, ActionPicker);
};

export default ActionPicker;
