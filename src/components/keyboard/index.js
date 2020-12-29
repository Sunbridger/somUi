import Keyboard from './src/main';

/* istanbul ignore next */
Keyboard.install = function(Vue) {
    Vue.component(Keyboard.name, Keyboard);
};

export default Keyboard;
