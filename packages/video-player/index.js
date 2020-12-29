import VideoPlayer from './src/main';

/* istanbul ignore next */
VideoPlayer.install = function(Vue) {
    Vue.component(VideoPlayer.name, VideoPlayer);
};

export default VideoPlayer;
