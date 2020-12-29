import Picker from './src/main';

/* istanbul ignore next */
Picker.install = function(Vue) {
    Vue.component(Picker.name, Picker);
};

export default Picker;
