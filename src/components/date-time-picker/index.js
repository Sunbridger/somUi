import DataTimePicker from './src/main';

/* istanbul ignore next */
DataTimePicker.install = function(Vue) {
    Vue.component(DataTimePicker.name, DataTimePicker);
};

export default DataTimePicker;
