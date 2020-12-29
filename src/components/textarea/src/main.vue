<template>
    <div class="som-textarea som-list-item">
        <div class="som-list-item__hd" :class="required ? 'som-textarea--required' : ''">
            <slot name="label">
                <label class="som-textarea__label" :class="labelClass"  v-if="title" v-html="title" :style="labelStyles"></label>
                <span class="som-textarea__label-desc" v-if="inlineDesc" :style="{ width: this.$parent.labelWidth || labelWidth + 'em' }">{{ inlineDesc }}</span>
            </slot>
        </div>
        <div class="som-list-item__bd">
            <textarea
                class="som-textarea__elm"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :spellcheck="spellcheck"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                :name="name"
                :rows="rows"
                :cols="cols"
                v-model="currentValue"
                @focus="$emit('on-focus')"
                @blur="onBlur"
                :style="textareaStyle"
                :maxlength="max"
                ref="textarea">
            </textarea>
            <div class="som-textarea__counter" v-show="showCounter && (max || maxNumber)" @click="focus">
                <span :style="countStyle">{{count}}</span>/{{maxNumber || max }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SomTextarea',
    props: {
        title: String,
        inlineDesc: String,
        showCounter: {
            type: Boolean,
            default: true
        },
        max: Number,
        maxNumber: Number,
        value: String,
        name: String,
        placeholder: String,
        readonly: Boolean,
        disabled: Boolean,
        rows: {
            type: Number,
            default: 3
        },
        cols: {
            type: Number,
            default: 30
        },
        height: Number,
        autocomplete: {
            type: String,
            default: 'off'
        },
        autocapitalize: {
            type: String,
            default: 'none'
        },
        spellcheck: {
            type: String,
            default: 'false'
        },
        autosize: [Boolean, Object],
        required: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.currentValue = this.value;
    },
    mounted () {
        this.$nextTick(this.adjustSize);
    },
    watch: {
        autosize (val) {
           this.$nextTick(this.adjustSize);
        },
        value (val) {
            this.$nextTick(this.adjustSize);
            this.currentValue = val;
        },
        currentValue (newVal) {
            if (this.max && newVal && newVal.length > this.max) {
                this.currentValue = newVal.slice(0, this.max);
            }
            this.$emit('input', this.currentValue);
            this.$emit('on-change', this.currentValue);
            this.$nextTick(this.adjustSize);
        }
    },
    data () {
        return {
            currentValue: ''
        }
    },
    computed: {
        count () {
            let len = 0;
            if (this.currentValue) {
                len = this.currentValue.replace(/\n/g, 'aa').length;
            }
            return len > this.max ? this.max : len;
        },
        textareaStyle () {
            if (this.height) {
                return {
                    height: `${this.height}px`
                };
            }
        },
        labelStyles () {
            return {
                width: this.$parent.labelWidth || (this.labelWidth + 'em'),
                textAlign: this.$parent.labelAlign,
                marginRight: this.$parent.labelMarginRight
            };
        },
        countStyle () {
            if (this.count > this.maxNumber) {
                return {color: '#FF4040'};
            }
        },
        labelWidth () {
            return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1;
        },
        labelClass () {
            return {
                'som-list-item-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
            };
        }
    },
    methods: {
        onBlur () {
            /** fix 微信客户端6.7.4 键盘收起页面未下移 bug */
            setTimeout(() => {
                document.body && (document.body.scrollTop = document.body.scrollTop);
            }, 100);

            this.$emit('on-blur');
        },
        adjustSize() {
            if (!this.autosize) {
                return;
            }

            const el = this.$refs.textarea;
            el.style.height = 'auto';

            let height = el.scrollHeight;

            if (typeof this.autosize === 'object') {
                const { maxHeight, minHeight } = this.autosize;
                if (maxHeight) {
                    height = Math.min(height, maxHeight);
                }
                if (minHeight) {
                    height = Math.max(height, minHeight);
                }
            }

            if (height) {
                el.style.height = height + 'px';
            }
        },
        focus () {
            this.$refs.textarea.focus();
        }
    }
};
</script>
