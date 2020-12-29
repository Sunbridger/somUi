import Textarea from './src/main';

/* istanbul ignore next */
Textarea.install = function(Vue) {
    Vue.component(Textarea.name, Textarea);
};

export default Textarea;
