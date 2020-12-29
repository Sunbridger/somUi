<template>
    <div class="som-toast" 
        :class="[typeClass || iconClass ? 'som-toast--icon' : '',
            type ? 'som-toast--type' : '']">
        <div class="som-mask_transparent" v-show="isShowMask && show"></div>
        <transition :name="currentTransition">
            <div class="som-toast__wrap" :style="{width: width, top: top ? top : ''}" :class="toastClass" v-show="show">
                <i class="som-toast__icon"
                    :class="[ typeClass, iconClass ]"
                    v-if="type || iconClass"></i>

                <p class="som-toast__content" v-if="text" :style="style" v-html="text"></p>
                <p class="som-toast__content" v-else :style="style">
                    <slot></slot>
                </p>
            </div>
        </transition>
    </div>
</template>

<script>
import SafariFixIssue from 'som-ui/src/mixins/safari-fix';

let typeMap = {
    success: 'circle-check',
    info: 'information',
    warn: 'warning',
    error: 'circle-close'
};

export default {
    name: 'SomToast',
    mixins: [SafariFixIssue],
    props: {
        value: Boolean,
        time: {
            type: Number,
            default: 2000
        },
        type: String,
        transition: String,
        width: String,
        isShowMask: {
            type: Boolean,
            default: false
        },
        text: String,
        iconClass: String,
        top: String,
        position: String
    },
    data () {
        return {
            show: false
        };
    },
    created () {
        if (this.value) {
            this.show = true;
        }
    },
    computed: {
        typeClass() {
            return this.type && typeMap[this.type] ? `som-icon-${typeMap[this.type]}` : '';
        },
        currentTransition () /* istanbul ignore next */ {
            if (this.transition) {
                return this.transition;
            }
            if (this.position === 'top') {
                return 'som-slide-from-top';
            }
            if (this.position === 'bottom') {
                return 'som-slide-from-bottom';
            }
            return 'som-fade';
        },
        toastClass () {
            return {
                'som-toast-top': this.position === 'top',
                'som-toast-bottom': this.position === 'bottom',
                'som-toast-middle': this.position === 'middle'
            };
        },
        style () {
            let style;
            if (this.type || this.iconClass) {
                style = { 'margin-bottom': '9px' };
            }
            if (this.width) {
                style = { 'text-align': 'center'};
            }
            return style;
        }
    },
    watch: {
        show (val) {
            if (val) {
                this.$emit('input', true);
                this.$emit('on-show');
                this.fixSafariOverflowScrolling('auto');

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.show = false;
                    this.$emit('input', false);
                    this.$emit('on-hide');
                    this.fixSafariOverflowScrolling('touch');
                }, this.time);
            }
        },
        value (val) {
            this.show = val;
        }
    }

};
</script>
