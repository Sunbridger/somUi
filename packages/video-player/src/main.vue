<template>
    <div class="som-video-player" v-if="flag" :class="{'hide-video-element': hideVideoElement}">
        <template v-if="play">
            <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="playsinline" @ready="playerReadied">
            </video-player>
            <div class="play" @click="beforePlayVideo(false)" v-if="netFlag && maskFlag"></div>
        </template>
        <div class="only-show" v-if="!play">
            <img class="play-poster" ref="videoShowImg" :src="videoData.img | toHttps" />
            <img class="play-button" @click="$emit('playVideo')" src="//img.souche.com/f2e/824fb35dbe7dacfc9bc99aa5231e47b9.png">
            <span class="left-bottom-text" v-if="videoData.leftText">{{videoData.leftText}}</span>
            <span class="right-top-text" v-if="videoData.rightTopText">{{videoData.rightTopText}}</span>
            <span class="right-bottom-text" v-if="videoData.rightText">{{videoData.rightText}}</span>
        </div>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css';
    import 'vue-video-player/src/custom-theme.css';
    import {
        videoPlayer
    } from 'vue-video-player';
    import './main.css';
    import Helper from './helper';

    const u = navigator.userAgent;
    const inQQ = u.indexOf('QQ') > -1;
    const clientWidth = document.documentElement.clientWidth;
    let playerOptions = {
        muted: false, // 是否静音
        volume: 0.5, // 音量
        width: clientWidth,
        language: 'zh-CN',
        autoplay: false,
        preload: 'none',
        sources: [],
        poster: ''
    };
    export default {
        name: 'SomVideoPlayer',
        data() {
            return {
                netFlag: true, // 网络层是否展示
                playsinline: !inQQ // qq浏览器内不允许全屏
            };
        },
        props: {
            data: { // 接受的数据
                type: Object,
                default() {
                    return {};
                }
            },
            play: { // 是否用自己的播放，不用回触发一个自己的事件
                type: Boolean,
                default: true
            },
            net: { // 判断网络
                type: Boolean,
                default: false
            },
            hideVideoElement: { // 是否隐藏视频播放元素
                type: Boolean,
                default: false
            },
            videoData: { // play未false的时候，优先使用的数据
                type: Object,
                default() {
                    return {};
                }
            },
            options: { // 自定义选项
                type: Object,
                default() {
                    return {};
                }
            }
        },
        computed: {
            flag() {
                if (this.play) {
                    let detail = this.data;
                    return detail.carDecorateVO && detail.carDecorateVO.vediosInDetail && detail.carDecorateVO.vediosInDetail.length > 0;
                }
                return this.videoData.img;
            },
            urls() {
                // 视频
                let detail = this.data;
                let arr = [];
                if (detail.carDecorateVO && detail.carDecorateVO.vediosInDetail && detail.carDecorateVO.vediosInDetail.length > 0) {
                    let vedioSources = detail.carDecorateVO.vediosInDetail[0].sources;
                    for (let i = 0; i < vedioSources.length; i += 1) {
                        arr.push({
                            type: 'video/mp4',
                            src: Helper.toHttps(vedioSources[i].url)
                        });
                    }
                }
                return arr;
            },
            player() {
                return this.$refs.videoPlayer.player;
            },
            maskFlag() { // 是否显示遮罩层
                return Helper.inApp && this.net;
            },
            playerOptions() {
                return Object.assign({}, playerOptions, this.options);
            }
        },
        components: {
            videoPlayer
        },
        watch: {
            data: {
                handler(val) {
                    this.$refs.videoPlayer && this.setPlayerData(val);
                },
                deep: true
            },
            videoData: {
                handler(val) {
                    !this.play && this.setVideoShowData(val);
                },
                deep: true
            }
        },
        methods: {
            setVideoShowData(data) {
                if (!data.img) {
                    return;
                }
                this.$refs.videoShowImg.style.width = `${(clientWidth - 48)}px`;
            },
            playerReadied() {
                this.setPlayerData();
                this.player.on('ended', () => {
                    this.$emit('ended');
                });
                this.player.on('fullscreenchange', () => { //监听视频全屏播放事件
                    this.$emit('fullscreenchange', this.player.isFullscreen());
                });
            },
            setPlayerData(val = this.data) {
                let thumb = val.carDecorateVO.vediosInDetail[0].thumb;
                if (thumb) {
                    let poster = Helper.toHttps(thumb);
                    Helper.getImgSize(poster).then((res) => { // 封面图尺寸
                        this.player.height(parseInt((res.height * clientWidth) / res.width));
                    });
                    this.player.poster(poster);
                }
                this.player.src(this.urls);
            },
            playVideo(fullScreen) {
                if (fullScreen && this.player.supportsFullScreen() && !inQQ) {
                    // 设置全屏
                    this.player.requestFullscreen();
                }
                this.player.play();
            },
            beforePlayVideo(fullScreen = false) {
                window.Tower.playVideo().then(() => {
                    this.netFlag = false;
                    this.playVideo(fullScreen);
                });
            }
        },
        filters: {
            toHttps: Helper.toHttps
        },
        mounted() {
            this.$on('video:fullscreen', () => {
                if (this.maskFlag && this.netFlag) {
                    this.beforePlayVideo(true);
                } else {
                    this.playVideo(true);
                }
            });
            this.$on('video:play', () => {
                this.playVideo(false);
            });
            !this.play && this.setVideoShowData(this.videoData);
        }
    };
</script>
