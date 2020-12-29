import preventBack from './helper';

let directiveArr = [];

export default {
    name: 'som-scroll-prevented',
    directive: {
        bind: function (el, binding) {
            if (!directiveArr.find(item => item.value === true) && binding.value === true) {
                preventBack(binding.value);
            }
            if (!directiveArr.find(item => item.expression === binding.expression)) {
                directiveArr.push({
                    expression: binding.expression,
                    value: binding.value
                });
            }
        },
        update: function (el, binding) {
            if (binding.value !== binding.oldValue) {
                if (binding.value === true) {
                    if (!directiveArr.find(item => item.value === true)) {
                        preventBack(true);
                    }
                    directiveArr.find(item => item.expression === binding.expression).value = binding.value;
                } else {
                    directiveArr.find(item => item.expression === binding.expression).value = binding.value;
                    if (!directiveArr.find(item => item.value === true)) {
                        preventBack(false);
                    }
                }
            }
        },
        unbind: function (el, binding) {
            directiveArr.splice(directiveArr.findIndex(item => item.expression === binding.expression), 1);
            if (!directiveArr.find(item => item.value === true)) {
                preventBack(false);
            }
        }
    }
};
