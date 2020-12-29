import Vue from 'vue';
import ImageViewer from './src/main';
import directive from './src/directive';

Vue.directive('image-viewer', directive);

/* istanbul ignore next */
ImageViewer.install = function(Vue) {
    Vue.directive('image-viewer', directive);
    Vue.component(ImageViewer.name, ImageViewer);
};

export default ImageViewer;
