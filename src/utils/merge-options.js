import objectAssign from 'object-assign';

function mergeOptions ($vm, options) {
    const defaults = {};
    for (let i in $vm.$options.props) {
        if (i !== 'value') {
            defaults[i] = $vm.$options.props[i].default;
        }
    }
    const _options = objectAssign({}, defaults, options);

    for (let i in _options) { //eslint-disable-line
        $vm[i] = _options[i];
    }

}
export default mergeOptions;
