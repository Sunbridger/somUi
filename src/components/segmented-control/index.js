import SegmentedControl from './src/segmented-control';

/* istanbul ignore next */
SegmentedControl.install = function(Vue) {
    Vue.component(SegmentedControl.name, SegmentedControl);
};

export default SegmentedControl;
