import VideoUpload from './src/main';

/* istanbul ignore next */
VideoUpload.install = function(Vue) {
    Vue.component(VideoUpload.name, VideoUpload);
};

export default VideoUpload;
