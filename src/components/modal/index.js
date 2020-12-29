import Modal from './src/main.vue';

/* istanbul ignore next */
Modal.install = function(Vue) {
    Vue.component(Modal.name, Modal);
};

export default Modal;
