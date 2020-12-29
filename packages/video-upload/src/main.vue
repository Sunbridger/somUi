<template>
    <div class="som-video-upload">
        <div 
            v-for="(file, index) in playerList"
            :key="index"
            class="som-video-upload__added-file" 
            :style="{'width': width + 'px', 'height': height + 'px'}">
            <video-player
                v-if="file.type.includes('video')"
                :playsinline="true"
                ref="videoPlayer"
                :options="file" />
            <div class="added-image" v-else-if="file.type.includes('image')">
                <img :src="file.url" v-image-viewer="file.url" />
            </div>
            <!-- 删除按钮 -->
            <div class="delete" @click="deleteFile(index)">
                <img src="//assets.souche.com/assets/sccimg/upload/delete.png">
            </div>
            <div class="mask" v-if="originList[index].status != 5" :style="{'height': 100-originList[index].percent + '%'}">
                <span v-if="isAndroid && isAlipay" class="tips">视频上传中，请稍后</span>
            </div>
            <!-- 上传错误 -->
            <div class="mask" v-if="originList[index].status === 4">
                <div class="error-info">
                    <img src="//assets.souche.com/assets/sccimg/upload/error.png">
                    <span>上传失败</span>
                </div>
            </div>
        </div>
        <div 
            v-if="list.length < limited"
            class="som-video-upload__add-file" 
            :style="{'width': width + 'px', 'height': height + 'px'}">
            <input
                class="add-input"
                ref="videoUploader" 
                type="file" 
                :accept="accept"
                :multiple="multiple"
                @change="changefile"
                :capture="capture"/>
            <input id="selectfiles" />
            <img src="//assets.souche.com/assets/sccimg/upload/add.png">
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import 'video.js/dist/video-js.css';
import {
    videoPlayer
} from 'vue-video-player';
import SomImageViewer from 'packages/image-viewer';
import OSSImage from '@souche-ui/oss-image';
import OssUpload from '@souche-f2e/oss-upload';

import './main.css';

export default {
    name: 'SomVideoUpload',
    components: {
        videoPlayer
    },
    data() {
        let UA = navigator.userAgent.toLowerCase();
        return {
            uploader: null,
            originList: [],
            list: [],
            isAndroid: UA.indexOf('android') > -1 || UA.indexOf('adr') > -1,
            isAlipay: UA.indexOf('alipay') > -1,
            mimeTypes: [],
            options: {
                // controls: true,
                preload: 'auto',
                width: this.width,
                // height: this.height,
                muted: false, // 是否静音
                volume: 0.5, // 音量
                language: 'zh-CN',
                autoplay: false,
                fluid: false,
                techOrder: ['html5'],
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                sources: [
                    {
                        type: 'video/mp4',
                        src: ''
                    }
                ],
                poster: 'https://img.souche.com/e38PnpHF3P56KZiD1561434965654', // 使用默认封面图
                // controlBar: {
                //     timeDivider: true,
                //     durationDisplay: true,
                //     remainingTimeDisplay: false,
                //     fullscreenToggle: true
                // }
            }
        }
    },
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        limited: {
            type: Number,
            default: 1
        },
        limitSize: {
            type: Number,
            default: 200
        },
        accept: String,
        capture: String,
        width: {
            type: Number,
            default: 105
        },
        height: {
            type: Number,
            default: 79
        }
    },
    computed: {
        playerList () {
            let arr = [];
            this.list.forEach((item) => {
                if (item.type.indexOf('image') !== -1) { // 图片
                    arr.push(item);
                } else if (item.type.indexOf('video') !== -1) { // 视频
                    let options = Object.assign({}, this.options);
                    options.sources[0] = {
                        src: item.url,
                        type: item.type
                    }
                    options.type = item.type;
                    arr.push(options);
                }
            })
            return arr;
        }
    },
    watch: {
        list(val) {
            this.$emit("on-change", val);
        }
    },
    created() {},
    mounted() {
        this.setupMimeTypes();
        this.registerUploader();
    },
    methods: {
        changefile(e) {
            // 兼容安卓支付宝
            for (let index = 0; index < e.target.files.length; index++) {
                let file = e.target.files[index];
                if (file.size / 1024 / 1024 > this.limitSize) {
                    // 提示大小
                    this.$emit("on-error", {code: -600});
                    continue;
                }
                this.uploader.addFile(file);
            }
            this.uploadFile();
        },
        registerUploader() {
            this.uploader = null;
            const vm = this;
            this.uploader = new OssUpload({
                browse_button: 'selectfiles', // 必传
                env: 'prod',
                dirname: '',
                max_retries: 2,
                multi_selection: vm.multiple,
                // auto_start: true,
                // chunk_size: '10mb',
                filters: {
                    mime_types : vm.mimeTypes,
                    max_file_size : `${vm.limitSize}mb`,
                    prevent_duplicates : true
                },
                init: {
                    PostInit: function(up) {
                    },
                    FilesAdded: function(up, files) {
                        for (let i = 0; i < files.length; i ++) {
                            let file = files[i];
                            // 需要转换，不能直接用originList， 视频预览上传过程中会闪烁
                            let url = window.URL || window.webkitURL || window.mozURL;
                            let src = url.createObjectURL(file.getNative());
                            vm.originList.push(file);
                            let obj = {
                                url: src,
                                type: file.type,
                                name: file.name,
                                status: 'uploading'
                            }
                            if (file.type.indexOf('video') !== -1 && vm.isAndroid) { // 视频,安卓即无法播放本地blob
                                obj.url = 'https://img.souche.com/XH7DQGCt3FWYyRmZ1562559726994';
                            }
                            vm.list.push(obj);
                        }
                    },
                    BeforeUpload: function(up, file) {
                        // setUploadParams是必须调用的
                        vm.uploader.setUploadParams();
                    },
                    UploadProgress: function(up, file) {
                    },
                    FileUploaded: function(up, file, info) {
                        if (info.status === 200) {
                            // 获取上传成功后的资源url
                            vm.list.forEach((item, index) => {
                                if (item.name === file.name) {
                                    let reg = /^(http|https):\/\/souche.oss-cn-hangzhou.aliyuncs.com/;
                                    vm.list[index].status = 'success';
                                    vm.list[index].url = vm.uploader.getFilename().replace(reg, 'https://img.souche.com');
                                }
                            });
                            // // 兼容安卓支付宝
                            if (vm.isAndroid && vm.isAlipay) {
                                vm.originList.forEach((item, index) => {
                                    if (item.name === file.name) {
                                        item.status = 5;
                                        item.percent = 100;
                                    }
                                });
                            }
                        }
                    },
                    UploadComplete: function(up, files) {
                        vm.$emit("on-success", vm.list);
                    },
                    Error: function(up, err) {
                        vm.$emit("on-error", err);
                    },
                },
            });
        },
        deleteFile(index) {
            this.list.splice(index, 1);
            let file = this.originList[index];
            this.originList.splice(index, 1);
            // 删除队列中的
            if (file.id) {
                this.uploader.uploader.removeFile(file.id);
            }
        },
        uploadFile() {
            this.uploader.start();
        },
        setupMimeTypes() {
            if (this.accept === 'video/*') {
            this.mimeTypes = [
                {title: "Video files", extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv,webm"}
            ]
            } else if (this.accept === 'image/*') {
                this.mimeTypes = [
                    {title: "Image files", extensions : "jpg,gif,png,jpeg,bmp"}
                ]
            } else {
                this.mimeTypes = [
                    {title: "Image files", extensions : "jpg,gif,png,jpeg,bmp"},
                    {title: "Video files", extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv,webm"}
                ]
            }
        },
        getVideoBase64(url) { // 获取视频第一帧截图，兼容性问题
            let vm = this;
            return new Promise(function (resolve, reject) {
                let dataURL = '';
                let video = document.createElement("video");
                video.setAttribute('crossOrigin', 'anonymous');//处理跨域
                video.setAttribute('src', url);
                video.setAttribute('width', vm.width);
                video.setAttribute('height', vm.height);
                video.addEventListener('loadeddata', function () {
                let canvas = document.createElement("canvas"),
                    width = video.width, //canvas的尺寸和图片一样
                    height = video.height;
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
                dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
                resolve(dataURL);
                });
            })
        }
    },
};
</script>
