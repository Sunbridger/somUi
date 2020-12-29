<template>
    <div class="som-modal">
        <som-dialog v-model="showValue"
            :is-cancle="false"
            :dialog-class="theme === 'android' ? 'som-dialog__content som-skin_android' : 'som-dialog__content'"
            :mask-transition="maskTransition"
            :dialog-transition="theme === 'android' ? 'som-fade' : dialogTransition"
            :hide-on-blur="hideOnBlur"
            :mask-z-index="maskZIndex"
            @on-hide="$emit('on-hide')">

            <div class="som-modal__title">
                <slot name="title">{{ title }}</slot>
            </div>

            <template>
                <div class="som-modal__body-wrap" :class="contentBody && 'need-scroll'">
                    <div class="som-modal__bd">
                        <slot><div v-if="content" v-html="content"></div></slot>
                    </div>

                    <div class="som-prompt" v-if="showInput">
                        <input 
                            class="som-prompt-msgbox" 
                            v-model="msg" 
                            :placeholder="placeholder" 
                            ref="input"/>
                    </div>
                </div>
            </template>

            <div class="som-modal__ft" v-if="!isConfirm">
                <slot name="footer">
                    <a href="javascript:;"
                        :style="cancelStyle || btnStyle"
                        :class="`som-modal__btn_${confirmType}`" 
                        class="som-modal__btn" 
                        @click="_onCancel">{{cancelText || '取消'}}</a>
                </slot>
            </div>

            <div class="som-modal__ft" v-else>
                <slot name="footer">
                    <a href="javascript:;"
                        :style="cancelStyle || btnStyle"
                        class="som-modal__btn som-modal__btn_default" 
                        @click="_onCancel">{{cancelText || '取消'}}</a>

                    <a href="javascript:;" 
                        :style="confirmStyle || btnStyle"
                        class="som-modal__btn" 
                        :class="`som-modal__btn_${confirmType}`" 
                        @click="_onConfirm">{{confirmText || '确定'}}</a>
                </slot>
            </div>
        </som-dialog>
    </div>
</template>

<script>
export default {
    name: 'SomModal',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        showInput: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'ios'
        },
        hideOnBlur: {
            type: Boolean,
            default: false
        },
        title: String,
        confirmText: String,
        btnStyle: Object,
        cancelText: String,
        cancelStyle: Object,
        confirmStyle: Object,
        maskTransition: {
            type: String,
            default: 'som-fade'
        },
        maskZIndex: [Number, String],
        dialogTransition: {
            type: String,
            default: 'som-dialog-fade'
        },
        content: String,
        closeOnConfirm: {
            type: Boolean,
            default: true
        },
        closeOnCancel: {
            type: Boolean,
            default: true
        },
        inputAttrs: Object,
        confirmType: {
            type: String,
            default: 'primary'
        },
        isConfirm: Boolean
    },
    created () {
        this.showValue = this.show;
        this.contentBody = this.content || this.$slots.default;
        if (this.value) {
            this.showValue = this.value;
        }
    },
    watch: {
        value (val) {
            this.showValue = val;
        },
        showValue (val) {
            this.$emit('input', val);
            if (val) {
                if (this.showInput) {
                    this.msg = '';
                    setTimeout(() => {
                        if (this.$refs.input) {
                            this.setInputFocus();
                        }
                    }, 300);
                }
                this.$emit('on-show'); // emit just after msg is cleared
            }
        }
    },
    data () {
        return {
            msg: '',
            contentBody: false,
            showValue: false
        };
    },
    methods: {
        setInputValue (val) {
            this.msg = val;
        },
        setInputFocus () {
            this.$refs.input.focus();
        },
        _onConfirm () {
            if (!this.showValue) {
                return;
            }
            if (this.closeOnConfirm) {
                this.showValue = false;
            }
            this.$emit('on-confirm', this.msg);
        },
        _onCancel () {
            if (!this.showValue) {
                return;
            }
            if (this.closeOnCancel) {
                this.showValue = false;
            }
            this.$emit('on-cancel');
        }
    }
};
</script>
