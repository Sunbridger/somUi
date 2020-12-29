<template>
    <div>
        <h1>当前页面播放：</h1>
        <som-video-player ref="videoPlayer" @fullscreenchange="fullscreenchange" :data="data" :play="true" :net="true"></som-video-player>
        <h1>只是展示，播放到下一个界面</h1>
        <som-video-player ref="videoPlayer" @playVideo="playVideo" :play="false" :net="true" :video-data="showData"></som-video-player>
        <h1 @click="cl">自动播放</h1>
        <som-video-player ref="videoPlayer2" :data="data2" :options="options" :hide-video-element="true" @ended="ended"></som-video-player>
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        methods: {
            cl() {
                // 全屏播放
                this.$refs.videoPlayer.$emit('video:fullscreen');
            },
            ended() {
                console.log('ended ==== ');
            },
            fullscreenchange(isfullscreen) {
                console.log(isfullscreen);
            },
            playVideo() {
                console.log('开始播放');
            }
        },
        data() {
            return {
                data: {
                    carDecorateVO: {
                        vediosInDetail: [{
                            'duration': '02’06”',
                            'name': '2015款1.6L 标致2008 自动玩酷智行版',
                            'sources': [{
                                'definition': '原画质',
                                'url': 'http://mp4-input.oss-cn-hangzhou.aliyuncs.com'
                                        + '/material/20171207/mp4/d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }, {
                                'definition': '高画质',
                                'url': 'http://res.souche.com/material/videos/Act-ss-mp4-hd'
                                    + '/d4a340c2f4aa724f4f236d10bf97f3d5/f5dd492501a64adfbdfccdda5ca370e4_d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }, {
                                'definition': '标清',
                                'url': 'http://res.souche.com/material/videos/Act-ss-mp4-sd'
                                    + '/d4a340c2f4aa724f4f236d10bf97f3d5/f5dd492501a64adfbdfccdda5ca370e4_d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }, {
                                'definition': '流畅',
                                'url': 'http://res.souche.com/material/videos/Act-ss-mp4-ld'
                                    + '/d4a340c2f4aa724f4f236d10bf97f3d5/f5dd492501a64adfbdfccdda5ca370e4_d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }],
                            'thumb': 'http://img.souche.com/20171207/jpg/f040e80fe300784648924a18e2b6d0c6.jpg'
                        }],
                        vediosInEntry: [{
                            'duration': '02’06”',
                            'name': '2015款1.6L 标致2008 自动玩酷智行版',
                            'sources': [{
                                'definition': '原画质',
                                'url': 'http://mp4-input.oss-cn-hangzhou.aliyuncs.com/material/20171207/mp4/d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }, {
                                'definition': '高画质',
                                'url': 'http://res.souche.com/material/videos/Act-ss-mp4-hd'
                                    + '/d4a340c2f4aa724f4f236d10bf97f3d5/f5dd492501a64adfbdfccdda5ca370e4_d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }, {
                                'definition': '标清',
                                'url': 'http://res.souche.com/material/videos/Act-ss-mp4-sd'
                                    + '/d4a340c2f4aa724f4f236d10bf97f3d5/f5dd492501a64adfbdfccdda5ca370e4_d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }, {
                                'definition': '流畅',
                                'url': 'http://res.souche.com/material/videos/Act-ss-mp4-ld'
                                    + '/d4a340c2f4aa724f4f236d10bf97f3d5/f5dd492501a64adfbdfccdda5ca370e4_d4a340c2f4aa724f4f236d10bf97f3d5.mp4'
                            }],
                            thumb: 'http://img.souche.com/20171207/jpg/f040e80fe300784648924a18e2b6d0c6.jpg'
                        }]
                    }
                },
                data2: {
                    carDecorateVO: {
                        vediosInDetail: [{
                            'sources': [{
                                'definition': '原画质',
                                'url': 'http://img.souche.com/f2e/389422949a8b32c2e41e986b265f106a.mp4'
                            }]
                        }]
                    }
                },
                options: {
                    preload: 'auto',
                },
                detail: {},
                showData: {
                    img: 'http://img.souche.com/20171207/jpg/f040e80fe300784648924a18e2b6d0c6.jpg',
                    leftText: '20394次播放',
                    rightTopText: '20394次播放',
                    rightText: '03`21"'
                }
            };
        },
        created() {
        //  setTimeout(() => {
        //      this.detail = this.data;
        //      setTimeout(() => {
        //          this.detail.carDecorateVO.vediosInDetail[0].thumb =
        //                     'https://souche.oss-cn-hangzhou.aliyuncs.com/20180201/jpg/edf1f3292e485d6963f902f1ff6ad436.jpg'; // eslint-disable-line
        //      }, 1000);
        //  }, 1000);
        },
        mounted() {
            setTimeout(() => {
                this.$refs.videoPlayer2.$emit('video:play');
            }, 3000);
        }
    };
/* eslint-enable */
</script>
