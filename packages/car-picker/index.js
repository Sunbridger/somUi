import CarPicker from './src/car-picker';

/* istanbul ignore next */
CarPicker.install = function(Vue) {
    Vue.component(CarPicker.name, CarPicker);
};

export default CarPicker;
