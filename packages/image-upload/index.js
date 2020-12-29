import ImageUpload from './src/main';

/* istanbul ignore next */
ImageUpload.install = function(Vue) {
    Vue.component(ImageUpload.name, ImageUpload);
};

export default ImageUpload;
