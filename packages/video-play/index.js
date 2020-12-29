import VideoPlay from './src/main';

/* istanbul ignore next */
VideoPlay.install = function(Vue) {
    Vue.component(VideoPlay.name, VideoPlay);
};

export default VideoPlay;
