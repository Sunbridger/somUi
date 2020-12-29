<template>
    <transition :name="`som-popup-animate-${position}`">
        <div v-show="show && !initialShow" 
            :style="styles" 
            class="som-popup-dialog som-popup" 
            :class="[`som-popup-${position}`, show ? 'som-popup-show' : '']">
            <slot></slot>
        </div>
  </transition>
</template>

<script>
import dom from 'som-ui/src/utils/dom';
import Popup from './popup';

export default {
    name: 'SomPopup',
    props: {
        value: Boolean,
        height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: String,
            default: 'auto'
        },
        showMask: {
            type: Boolean,
            default: true
        },
        isTransparent: Boolean,
        hideOnBlur: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'bottom'
        },
        maxHeight: String,
        popupStyle: Object,
        hideOnDeactivated: {
            type: Boolean,
            default: true
        },
        maskClass: String
    },
    created () {
        // get global layout config
        if (this.$som && this.$som.config && this.$som.config.$layout === 'VIEW_BOX') {
            this.layout = 'VIEW_BOX';
        }
    },
    mounted () {
        this.$overflowScrollingList = document.querySelectorAll('.som-fix-safari-overflow-scrolling');
        this.$nextTick(() => {
            const _this = this;
            this.popup = new Popup({
                showMask: _this.showMask,
                isTransparent: _this.isTransparent,
                container: _this.$el,
                maskClass: _this.maskClass,
                hideOnBlur: _this.hideOnBlur,
                onOpen () {
                    _this.fixSafariOverflowScrolling('auto');
                    _this.show = true;
                },
                onClose () {
                    _this.show = false;
                    if (window.__$somPopups && Object.keys(window.__$somPopups).length > 1) return;
                    if (document.querySelector('.som-popup-dialog.som-popup-mask-disabled')) return;
                    setTimeout(() => {
                        _this.fixSafariOverflowScrolling('touch');
                    }, 300);
                }
            });
            if (this.value) {
                this.popup.show();
            }
            this.initialShow = false;
        });
    },
    deactivated () {
        if (this.hideOnDeactivated) {
            this.show = false;
        }
        this.removeModalClassName();
    },
    methods: {
        fixSafariOverflowScrolling (type) {
            if (!this.$overflowScrollingList.length) return;
            // if (!/iphone/i.test(navigator.userAgent)) return
            for (let i = 0; i < this.$overflowScrollingList.length; i++) {
                this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
            }
        },
        removeModalClassName () {
            this.layout === 'VIEW_BOX' && dom.removeClass(document.body, 'som-modal-open');
        }
    },
    data () {
        return {
            layout: '',
            initialShow: true,
            hasFirstShow: false,
            show: this.value
        };
    },
    computed: {
        styles () {
            const styles = {};
            if (!this.position || this.position === 'bottom' || this.position === 'top') {
                styles.height = this.height;
            } else {
                styles.width = this.width;
            }

            if (this.maxHeight) {
                styles['max-height'] = this.maxHeight;
            }

            if (this.popupStyle) {
                for (let i in this.popupStyle) { // eslint-disable-line
                    styles[i] = this.popupStyle[i];
                }
            }
            return styles;
        }
    },
    watch: {
        value (val) {
            this.show = val;
        },
        show (val) {
            this.$emit('input', val);
            if (val) {
                this.popup && this.popup.show();
                this.$emit('on-show');
                this.fixSafariOverflowScrolling('auto');
                this.layout === 'VIEW_BOX' && dom.addClass(document.body, 'som-modal-open');
                if (!this.hasFirstShow) {
                    this.$emit('on-first-show');
                    this.hasFirstShow = true;
                }
            } else {
                this.$emit('on-hide');
                this.show = false;
                this.popup.hide(false);
                setTimeout(() => {
                    if (!document.querySelector('.som-popup-dialog.som-popup-show')) {
                        this.fixSafariOverflowScrolling('touch');
                    }
                    this.removeModalClassName();
                }, 200);
            }
        }
    },
    beforeDestroy () {
        this.popup && this.popup.destroy();
        this.fixSafariOverflowScrolling('touch');
        this.removeModalClassName();
    }
};
</script>
