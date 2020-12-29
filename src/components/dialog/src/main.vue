<template>
    <div class="som-dialog" :class="{'som-dialog-absolute': layout === 'VIEW_BOX'}">
        <transition :name="maskTransition">
            <div class="som-mask" @click="hide" v-show="dialogShow" :style="maskStyle"></div>
        </transition>

        <transition :name="dialogTransition">
            <div :class="dialogClass" v-show="dialogShow" :style="dialogStyle">
                <slot></slot>
                <div class="som-dialog__close" @click="handleClose" v-if="isCancle">
                    <div class="som-dialog-close-border">
                        <som-icon name="close" size="14"></som-icon>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import preventBodyScrollMixin from 'som-ui/src/mixins/prevent-body-scroll';

export default {
    name: 'SomDialog',
    mixins: [preventBodyScrollMixin],
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        maskTransition: {
            type: String,
            default: 'som-mask'
        },
        maskZIndex: [String, Number],
        dialogTransition: {
            type: String,
            default: 'som-dialog-fade'
        },
        dialogClass: {
            type: String,
            default: 'som-dialog__content'
        },
        hideOnBlur: Boolean,
        dialogStyle: Object,
        isCancle: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        maskStyle () {
            if (typeof this.maskZIndex !== 'undefined') {
                return {
                    zIndex: this.maskZIndex
                };
            }
        }
    },
    mounted () {
        this.dialogShow = this.show;
        if (typeof window !== 'undefined') {
            if (window.SOM_CONFIG && window.SOM_CONFIG.$layout === 'VIEW_BOX') {
                this.layout = 'VIEW_BOX';
            }
        }
    },
    watch: {
        show (val) {
            setTimeout(() => {
                this.dialogShow = val;
                this.$emit('update:show', val);
                this.$emit(val ? 'on-show' : 'on-hide');
                if (val) {
                    this.addModalClassName();
                } else {
                    this.removeModalClassName();
                }
            }, 150);
        }
    },
    methods: {
        shouldPreventScroll () {
            // hard to get focus on iOS device with fixed position, so just ignore it
            const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent);
            const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea');
            if (iOS && hasInput) {
                return true;
            }
        },
        hide () {
            if (this.hideOnBlur) {
                this.$emit('update:show', false);
                this.$emit('change', false);
                this.$emit('on-click-mask');
            }
        },
        handleClose () {
            this.$emit('update:show', false);
            this.$emit('change', false);
        }
    },
    data () {
        return {
            layout: '',
            dialogShow: ''
        };
    }
};
</script>
