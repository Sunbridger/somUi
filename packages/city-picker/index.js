import CityPicker from './src/city-picker';

/* istanbul ignore next */
CityPicker.install = function(Vue) {
    Vue.component(CityPicker.name, CityPicker);
};

export default CityPicker;
