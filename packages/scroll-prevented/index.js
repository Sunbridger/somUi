import Vue from 'vue';
import SomScrollPrevented from './src/main';

Vue.directive(SomScrollPrevented.name, SomScrollPrevented.directive);

/* istanbul ignore next */
SomScrollPrevented.install = function(Vue) {
    Vue.directive(SomScrollPrevented.name, SomScrollPrevented.directive);
};

export default SomScrollPrevented;
