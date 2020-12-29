import Toast from './src/main.vue';

/* istanbul ignore next */
Toast.install = function(Vue) {
    Vue.component(Toast.name, Toast);
};

export default Toast;
