<template>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- Background of PhotoSwipe.
            It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>
        <div class="som-image-viewer" v-show="showSom">
            <div class="som-image-viewer__title">
                <span @click="handleClose" class="close"><img src="//img.souche.com/f2e/38d5cf04e14a2f3eaed34597c23ca193.png"></span>
                <span v-if="title"> {{title}}</span>
                <span v-if="checkReport || (!checkReport && !showPreview)">{{index + 1 >= 10 ? index + 1 : '0' + (index + 1)}}
                    / {{imgs.length >= 10 ? imgs.length : '0' + imgs.length}}
                </span>
                <span class="delete" @click="handleDelete" v-if="deletable">
                    <img src="//img.souche.com/f2e/a4511b9c12f400e778b43402d9bcb7fa.png">
                </span>
            </div>

            <div class="som-image-viewer__tab" v-if="tabs.length">
                <ul>
                    <li v-for="(item, index) in tabs"
                        :key="index"
                        :class="index === activeTab ? 'active' : ''"
                        @click="changeTabs(index)">{{item + (showTabLenth ? '(' + tabsLength[item] + ')' : '')}}</li>
                </ul>
            </div>
        </div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

            <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="som-image-viewer__footer" v-if="showPreview && !checkReport && showSom">
            <div class="som-image-viewer__preview">
                <div>
                    <ul>
                        <li v-for="(item, pindex) in previewImg" :key="pindex" @click="goTo(pindex)">
                            <img :src="item.src" @error="item.src = item.replace" class="active">
                            <span v-if="pindex !== index"></span>
                        </li>
                    </ul>
                </div>
            </div>
           
            <div class="page-tag">
                <slot :data="index">
                    {{index + 1 >= 10 ? index + 1 : '0' + (index + 1)}}/{{imgs.length >= 10 ? imgs.length : '0' + imgs.length}}
                </slot>
            </div>
        </div>

        <div class="som-image-viewer__footer" v-if="getImgAttr('title') && checkReport && showSom">
            <div class="som-image-viewer__checkmsg">
                <div class="check-title">
                    <slot :data="index">
                        <img :src="getImgAttr('icon')" v-if="getImgAttr('icon')">
                        <span>{{getImgAttr('title')}}</span>
                    </slot>
                </div>
                <div class="check-explain" v-if="getImgAttr('explain')">
                    {{getImgAttr('explain')}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UI from 'x-photoswipe/dist/photoswipe-ui-default';
import objectAssign from 'object-assign';
import { imagesufix, oneOf, scroll } from 'main/utils/util';
import PhotoSwipe from './photoswipe';
import './main.css';

export default {
    name: 'SomImageViewer',
    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        },
        title: String,
        checkReport: {
            type: Boolean,
            default: false
        },
        deletable: {
            type: Boolean,
            default: false
        },
        showPreview: {
            type: Boolean,
            default: false
        },
        showTabLenth: {
            type: Boolean,
            default: false
        },
        options: {
            default () {
                return {
                    loop: false
                };
            }
        },
        action: {
            type: [Array],
            default () {
                return []
            }
        }
    },
    data () {
        return {
            index: 0,
            initalImg: [],
            tabs: [],
            tabsLength: [],
            activeTab: '',
            showSom: true,
            initTime: 0
        };
    },
    watch: {
        index (val) {
            let previewImg = this.$el.querySelector('.som-image-viewer__preview ul');
            if (val > 1 && previewImg) {
                scroll(previewImg, previewImg.scrollLeft, 79 * val - 75, 1000, 'left'); // eslint-disable-line
                // previewImg.scrollLeft = 79 * val - 75;
            } else if (previewImg) {
                scroll(previewImg, previewImg.scrollLeft, 0, 1000, 'left'); // eslint-disable-line
                // previewImg.scrollLeft = 0; // eslint-disable-line
            }
        },
        activeTab (val) {
            let tab = this.$el.querySelector('.som-image-viewer__tab ul');
            if (val > 4 && tab) {
                tab.scrollLeft = 54 * (val - 4); // eslint-disable-line
            } else if (tab) {
                tab.scrollLeft = 0;
            }
        },
        imgs (newVal, oldVal) {
            if (!this.photoswipe || !this.initTime) {
                return;
            }
            if (newVal.length && newVal.length - oldVal.length === -1) {
                const index = this.photoswipe.getCurrentIndex();
                this.photoswipe.invalidateCurrItems();
                this.photoswipe.items.splice(index, 1);
                let goToIndex = index;
                if (goToIndex > this.photoswipe.items.length - 1) {
                    goToIndex = 0;
                }
                this.photoswipe.goTo(goToIndex);
                this.photoswipe.updateSize(true);
                this.photoswipe.ui.update();
            } else if (!newVal.length) {
                this.handleClose();
            }
        },
        list () {
            this.tabs = [];
            this.initImg();
        },
    },
    computed: {
        imgs () {
            return this.getImg();
        },
        previewImg () {
            return this.getImg([{
                action: 'resize',
                h: 50,
                w: 75,
                m: 'fixed'
            }]);
        }
    },
    methods: {
        getImgAttr (attr) {
            if (this.imgs.length) {
                return (this.imgs[this.index] && this.imgs[this.index][attr]) || '';
            }
            return '';
        },
        getImg (options = this.action) {
            let imgList = JSON.parse(JSON.stringify(this.initalImg));
            return imgList.map((one, index) => {
                one.replace = one.src;
                one.src = imagesufix(one.src, options);
                if (typeof one.w === 'undefined') {
                    one.w = 0;
                    one.h = 0;
                }
                this.fixImage(one, index);

                return one;
            });
        },
        fixImage (one, index) {
            const img = new Image();
            let self = this;
            img.onload = function () {
                one.w = this.width;
                one.h = this.height;
                self.imgs[index] = one;
            };

            img.onerror = () => {
                one.src = one.src.split('?')[0];
                img.src = one.src;
            }
        },
        init (index) {
            const self = this;
            const showItem = this.imgs[index];
            if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
                const img = new Image();
                img.onload = function () {
                    showItem.w = this.width;
                    showItem.h = this.height;
                    self.$nextTick(() => {
                        self.doInit(index);
                    });
                };

                img.onerror = () => {
                    showItem.src = showItem.src.split('?')[0];
                    img.src = showItem.src;
                }

                img.src = showItem.src;
            } else {
                this.$nextTick(() => {
                    this.doInit(index);
                })
            }
        },
        doInit (index) {
            const self = this;
            let options = objectAssign({
                history: false,
                shareEl: false,
                closeEl: false,
                captionEl: false,
                zoomEl: false,
                counterEl: false,
                arrowEl: false,
                fullscreenEl: false,
                tapToClose: false,
                index: index,
                closeOnScroll: false,
                pinchToClose: false,
                preload: [1, 1],
                clickToCloseNonZoomable: true,
                closeOnVerticalDrag: false,
                showAnimationDuration: 0,
                enableUIWebViewRepositionTimeout: true,
                isClickableElement: e => e.tagName === 'A' || e.tagName === 'IMG'
            }, this.options);
            if (this.initTime) return;
            this.initTime = 1;
            this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options);
            this.photoswipe.listen('gettingData',  function (index, item) {
                if (!item.w || !item.h || item.w < 1 || item.h < 1) {
                    const img = new Image();
                    img.onload = function () {
                        item.w = this.width;
                        item.h = this.height;
                        self.photoswipe.updateSize(true);
                    };
                    img.onerror = () => {
                        item.src = item.src.split('?')[0];
                        img.src = item.src;
                    }
                    img.src = item.src;
                }
            });
            this.photoswipe.init();
            this.photoswipe.listen('beforeChange', this.getCurrentIndex);
            this.photoswipe.framework.bind(this.photoswipe.scrollWrap, 'pswpTap', this.toggleSom);
            this.photoswipe.listen('close', () => {
                this.initTime = 0;
                this.$emit('on-close');
            });
        },
        show (index, tabIndex = '') {
            if (!this.initalImg.length) {
                this.initImg();
            }
            if (tabIndex || tabIndex === 0) {
                this.activeTab = tabIndex;
                this.index = this.getTabFristIndex() + index;
                this.init(this.getTabFristIndex() + index);
            } else {
                this.index = index;
                this.init(index);
                if (this.imgs[index].tab) {
                    let tabIndex = this.tabs.indexOf(this.imgs[index].tab);
                    this.activeTab = tabIndex;
                }
            }
        },
        changeTabs (index) {
            this.activeTab = index;
            this.goTo(this.getTabFristIndex());
        },
        getTabFristIndex () {
            let self = this;
            let imgIndex;
            this.imgs.forEach((item, i) => {
                if (item.tab === self.tabs[self.activeTab] && imgIndex === undefined) {
                    imgIndex = i;
                }
            });
            return imgIndex || 0;
        },
        toggleSom () {
            this.showSom = !this.showSom;
        },
        getCurrentIndex () {
            this.index = this.photoswipe.getCurrentIndex();
            if (this.tabs && this.imgs[this.index].tab) {
                this.activeTab = this.tabs.indexOf(this.imgs[this.index].tab);
            }
        },
        handleClose () {
            this.photoswipe.close();
        },
        handleDelete () {
            this.$emit('on-delete', this.index);
        },
        goTo (index) {
            this.photoswipe.goTo(index);
            if (this.tabs && this.imgs[this.index].tab) {
                this.activeTab = this.tabs.indexOf(this.imgs[this.index].tab);
            }
        },
        initImg () {
            let imgs = [];
            if (this.imgElement) {
                for (let img of this.imgElement) {
                    let image = {};
                    image.src = img.src;
                    if (img.dataset['title']) image.title = img.dataset['title'];
                    if (img.dataset['explain']) image.explain = img.dataset['explain'];
                    if (img.dataset['icon']) image.icon = img.dataset['icon'];
                    if (img.dataset['tab']) image.tab = img.dataset['tab'];
                    imgs.push(image);
                }
            }
            if (imgs.length) {
                this.initalImg = imgs;
            } else {
                this.initalImg = this.list;
            }

            this.tabsLength = [];
            this.tabs = [];

            for (let item of this.initalImg) {
                if (item.tab && this.tabs.indexOf(item.tab) === -1) this.tabs.push(item.tab);
                if (item.tab) {
                    if (this.tabsLength[item.tab]) {
                        this.tabsLength[item.tab] = this.tabsLength[item.tab] + 1;
                    } else {
                        this.tabsLength[item.tab] = 1;
                    }
                }
            }
        }
    },
    mounted () {
        this.initImg();
    }
};
</script>

<style src="x-photoswipe/dist/photoswipe.css"></style>
<style src="x-photoswipe/dist/default-skin/default-skin.css"></style>
