<template>
    <div class="som-image-upload">
        <div class="som-image-upload__added-img" 
            :key="$index"
            v-for="(img, $index) in imgList"
            :style="{'marginRight': max === 1 ? '0px' : '14px'}">
            <oss-image :src="img"
                :lazy="lazy"
                :action="action" 
                :agreement="agreement"
                :style="imgListStyle"
                :key="img + $index"
            @click.native="showViewer('viewer', $index)"></oss-image>
            <div class="som-image-upload__name" v-if="name">{{name}}</div>
            <span class="som-image-upload__delete" v-if="deletable"
            @click="deleteImg($index)"></span>
        </div>
        <div class="som-image-upload__add-img" v-if="imgList.length < max">
            <div class="som-image-upload__input" 
            :style="styleObj">
                <input type="file" ref="file" @change="changeHandler" accept="image/*" 
                   v-if="onlyCamera"  capture="camera">
                <input v-else type="file" ref="file" @change="changeHandler" 
                accept="image/*" multiple="multiple" 
                :style="{'width': width + 'px', 'height': height + 'px'}">
                   <span class="som-image-upload__add-icon"></span>
            </div>                
            <div class="som-image-upload__name" v-if="name">{{name}}</div>
        </div>
        <div v-transfer-dom>
            <som-loading :show="loadingShow" text="图片上传中"></som-loading>
        </div>
        <Toast v-model="toastShow">{{toastMsg}}</Toast>
        <som-image-viewer ref="viewer"
            :list="imgViewerList"
            @on-delete="deleteImg"
            :deletable="deletable"
            :action="action">
        </som-image-viewer>
    </div>
</template>

<script>
import Vue from 'vue';
import SomImageViewer from '@souche-ui/som-image-viewer';
import OSSImage from '@souche-ui/oss-image';
import Toast from 'components/toast/src/main.vue';
import Loading from 'components/loading/src/main.vue';
import TransferDom from 'main/directives/transfer-dom';
import axios from 'axios';
import Util from './util';
import './main.css';

Vue.use(OSSImage.component.vue);

export default {
    name: 'SomImageUpload',
    data () {
        return {
            toastShow: false,
            toastMsg: '',
            loadingShow: false,
            uploadedImgs: [], // 暂存触发一次上传事件时上传的图片
            count: -1 // 为单次changeHandler计数
        };
    },
    props: {
        name: String,
        cover: String,
        imgList: {
            type: Array,
            default: () => ([])
        },
        max: {
            type: Number,
            default: 12
        },
        width: {
            type: Number,
            default: 105
        },
        height: {
            type: Number,
            default: 79
        },
        deletable: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: true
        },
        onlyCamera: {
            type: Boolean,
            default: false
        },
        action: {
            type: [Object, Array],
            default () {
                return [{
                    action: 'quality',
                    q:  75
                }];
            }
        },
        needCompress: {
            type: Boolean,
            default: true
        },
        quality: {
            type: Number,
            default: 0.5
        },
        agreement: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Toast,
        Loading,
        SomImageViewer
    },
    directives: {
        TransferDom
    },
    computed: {
        imgViewerList () {
            let arr = [];
            this.imgList.forEach((item) => {
                arr.push({
                    src: item
                });
            })
            return arr;
        },
        imgListStyle () {
            return {
                'width': `${this.width}px`,
                'height': `${this.height}px`
            }
        },
        styleObj () {
            return {
                'width': `${this.width}px`,
                'height': `${this.height}px`,
                 'background': this.cover ? `#F7F8FA url(${this.cover}) no-repeat center / contain` : '#F7F8FA',
            }
        }
    },
    watch: {
        count: function(val) {
            if (val > 0) {
                this.loadingShow = true;
            } else if (val === 0) {
                this.$emit('success', this.uploadedImgs);
                if (this.$refs.file) {
                    this.$refs.file.value = ''; // 解决某些sb安卓机型选择相同图片不触发change事件的问题
                }
                this.hideLoading();
            }
        }
    },
    methods: {
        toast (msg) {
            this.toastMsg = msg;
            this.toastShow = true;
        },
        hideLoading () {
            let timer = setTimeout(() => {
                this.loadingShow = false;
                clearTimeout(timer);
            }, 500);
        },
        showViewer (viewer, index) {
            this.$refs[viewer].show(index);
        },
        deleteImg (index) {
            this.imgList.splice(index, 1);
        },
        changeHandler (e) {
            this.count = -1;
            this.uploadedImgs = [];
            let imgs = e.target.files;
            if ((this.imgList.length + imgs.length) > this.max) {
                return this.toast(`最多只能上传${this.max}张`);
            }
            if (imgs && imgs.length > 0) {
                this.count = imgs.length;
                for (let i = 0, len = imgs.length; i < len; i++) {
                    let img = imgs[i];
                    if (/^image\//.test(img.type)) { // 某些安卓手机不支持input type=file accept
                        let timestamp = `?_t=${Date.parse(new Date()) + i}`; // 时间戳，防止在支付宝里请求被缓存
                        Util.compress(img, this.quality, (_img) => {
                            _img.name = img.name;
                            this.upload(_img, timestamp);
                        });
                    } else {
                        this.toast('仅支持上传图片');
                    }
                }
            }
        },
        httpRequest (formData, timestamp) {
            return axios({
                method: 'post',
                url: `https://himekaidou.souche.com/upload${timestamp}`,
                data: formData,
                timeout: 60000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache'
                }
            });
        },
        upload (img, timestamp) {
            let formData = new FormData();
            formData.append('dir', 'f2e/');
            formData.append('file', img, img.name);
            this.httpRequest(formData, timestamp).then((res) => {
                if (res.status === 200 && res.data.success === 1) {
                    this.imgList.push(res.data.path);
                    this.uploadedImgs.push(res.data.path);
                } else {
                    throw res.data;
                }
            }).catch((err) => {
                if (err.message === 'Network Error') {
                    err.message = '网络异常';
                }
                this.$emit('error', err);
                this.toast(err.msg || err.message || err);
            }).finally(() => {
                this.count--;
            });
        }
    }
}
</script>
