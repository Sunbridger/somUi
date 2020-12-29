<template>
    <div class="som-input som-list-item" 
        :class="{'som-input--disabled' : disabled}">

        <div class="som-list-item__hd" :class="required ? 'som-input--required' : ''">
            <slot name="label">
                <label class="som-input__label" 
                    :class="labelClass" 
                    :style="labelStyles" 
                    v-if="title" 
                    v-html="title">
                </label>
            </slot>
        </div>

        <div class="som-list-item__bd" 
            v-if="type !== 'number-range'"
            :class="placeholderAlign ? `som-input-placeholder-${placeholderAlign}` : ''">
            
            <input v-if="!type || type === 'text'"
                class="som-input__elm"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :style="inputStyle"
                type="text"
                unselectable="on"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input"/>

            <input v-if="type === 'number'"
                class="som-input__elm"
                :maxlength="max"
                unselectable="on"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :style="inputStyle"
                type="number"
                pattern="[0-9]*"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input"/>

            <input v-if="type === 'email'"
                class="som-input__elm"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :style="inputStyle"
                unselectable="on"
                type="email"
                :name="name"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                :placeholder="placeholder"
                ref="input"/>

            <input v-if="type === 'date'"
                class="som-input__elm"
                :class="{'som-input__elm-tips': !currentValue}"
                :style="inputStyle"
                type="date"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                unselectable="on"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input"/>

            <input v-if="type === 'password'"
                class="som-input__elm"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :style="inputStyle"
                type="password"
                :name="name"
                :placeholder="placeholder"
                unselectable="on"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input"/>

            <input v-if="type === 'tel'"
                class="som-input__elm"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                unselectable="on"
                :style="inputStyle"
                type="tel"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input"/>
        </div>

        <div class="som-list-item__bd" 
            v-else-if="type === 'number-range'"
            :class="[ placeholderAlign ? `som-input-placeholder-${placeholderAlign}` : '',
            numberRangeAlign ? `som-input-${numberRangeAlign}` : '',
            required ? 'som-input-placeholder-required' : '']">
            
            <input class="som-input__range-number som-input__elm"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :style="inputStyle"
                type="number"
                :name="name"
                :placeholder="placeholder === '请输入' ? '' : placeholder"
                unselectable="on"
                :readonly="readonly"
                :disabled="disabled"
                v-model="rangeVal.min"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input1"/> 
                <span class="input-conect-line">-</span>

            <input class="som-input__range-number som-input__elm"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :style="inputStyle"
                type="number"
                :name="name"
                :placeholder="placeholder === '请输入' ? '' : placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="rangeVal.max"
                @focus="focusHandler"
                @blur="onBlur"
                @keyup="onKeyUp"
                ref="input2"/>
        </div>

        <div class="som-list-item__ft">
            <som-icon name="circle-close" class="som-input__icon" 
                v-show="!equalWith && showClear && currentValue !== '' && !readonly && !disabled" @click.native="clear">
            </som-icon>

            <som-icon @click.native="onClickErrorIcon" class="som-input__icon" name="warning" 
                :title="!valid ? firstError : ''" v-show="showWarn">
            </som-icon>
            <som-icon @click.native="onClickErrorIcon" class="som-input__icon" name="warning" 
                v-if="!novalidate && hasLengthEqual && dirty && equalWith && !valid">
            </som-icon>

            <som-icon name="circle-check"  class="som-input__icon"
                v-show="!novalidate && equalWith && equalWith === currentValue && valid">
            </som-icon>

            <slot name="right"></slot>
        </div>

        <som-toast
            v-model="showErrorToast"
            :time="600">{{ firstError }}
        </som-toast>
    </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
import mask from 'vanilla-masker';

export default {
    name: 'SomInput',
    created () {
        if (this.type === 'number-range') {
            this.rangeVal = this.value || {min: '', max: ''};
        } else {
            this.currentValue = (this.value === undefined || this.value === null) ? ''
            : (this.mask ? this.maskValue(this.value) : this.value);
        }

        if (this.required && typeof this.currentValue === 'undefined') {
            this.valid = false;
        }
        if (this.debounce) {
            this._debounce = debounce(this.debounce, () => {
                this.$emit('on-change', this.currentValue);
            });
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        numberRangeAlign: String,
        value: [String, Number, Object],
        name: String,
        readonly: Boolean,
        disabled: Boolean,
        inlineDesc: String,
        isType: Function,
        min: Number,
        max: Number,
        showClear: {
            type: Boolean,
            default: true
        },
        equalWith: String,
        textAlign: String,
        autocomplete: {
            type: String,
            default: 'off'
        },
        autocapitalize: {
            type: String,
            default: 'none'
        },
        autocorrect: {
            type: String,
            default: 'off'
        },
        spellcheck: {
            type: String,
            default: 'false'
        },
        novalidate: {
            type: Boolean,
            default: false
        },
        debounce: Number,
        placeholderAlign: String,
        labelWidth: String,
        mask: String,
        shouldToastError: {
            type: Boolean,
            default: true
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        dirty: {
            get: function () {
                return !this.pristine;
            },
            set: function (newValue) {
                this.pristine = !newValue;
            }
        },
        invalid () {
            return !this.valid;
        },
        labelStyles () {
            return {
                width: this.labelWidth || this.$parent && this.$parent.labelWidth,
                textAlign: this.$parent && this.$parent.labelAlign,
                marginRight: this.$parent && this.$parent.labelMarginRight
            };
        },
        labelClass () {
            return {
                'som-cell-justify': this.$parent.labelAlign === 'justify'
            };
        },
        hasErrors () {
            return Object.keys(this.errors).length > 0;
        },
        inputStyle () {
            if (this.textAlign) {
                return {
                    textAlign: this.textAlign
                };
            }
        },
        showWarn () {
            return !this.novalidate && !this.equalWith && !this.valid && this.firstError && (this.touched || this.forceShowError);
        }
    },
    methods: {
        setTouched () {
            this.touched = true
        },
        onClickErrorIcon () {
            if (this.shouldToastError && this.firstError) {
                this.showErrorToast = true;
            }
            this.$emit('on-click-error-icon', this.firstError);
        },
        maskValue (val) {
            const val1 = this.mask ? mask.toPattern(val, this.mask) : val;
            return val1;
        },
        reset (value = '') {
            this.dirty = false;
            this.currentValue = value;
            this.firstError = '';
            this.valid = true;
        },
        clear () {
            this.currentValue = '';
            this.$nextTick(() => {
                this.focus();
            });
        },
        focus () {
            this.$refs.input.focus();
        },
        blur () {
            this.$refs.input.blur();
        },
        focusHandler ($event) {
            if(this.readonly) $event.target.blur();
            this.$emit('on-focus', this.currentValue, $event);
        },
        onBlur ($event) {
            this.setTouched();
            this.validate();

            /** fix 微信客户端6.7.4 键盘收起页面未下移 bug */
            setTimeout(() => {
                document.body && (document.body.scrollTop = document.body.scrollTop);
            }, 100);

            this.$emit('on-blur', this.currentValue, $event);
        },
        onKeyUp (e) {
            if (e.key === 'Enter') {
                e.target.blur();
                this.$emit('on-enter', this.currentValue, e);
            }
        },
        getError () {
            let key = Object.keys(this.errors)[0];
            this.firstError = this.errors[key];
        },
        validate () {
            if (typeof this.equalWith !== 'undefined') {
                this.validateEqual();
                return;
            }
            this.errors = {};

            if (!this.currentValue && !this.required) {
                this.valid = true;
                return;
            }

            if (!this.currentValue && this.required) {
                this.valid = false;
                this.errors.required = '必填哦';
                this.getError();
                return;
            }

            if (typeof this.isType === 'function') {
                const validStatus = this.isType(this.currentValue);
                this.valid = validStatus.valid;
                if (!this.valid) {
                    this.errors.format = validStatus.msg;
                    this.forceShowError = true;
                    this.getError();
                    return;
                } else {
                    delete this.errors.format;
                }
            }

            if (this.min) {
                if (this.currentValue.length < this.min) {
                    this.errors.min = `最少应该输入${this.min}个字符哦`;
                    this.valid = false;
                    this.getError();
                    return;;
                } else {
                    delete this.errors.min;
                }
            }

            if (this.max) {
                if (this.currentValue.length > this.max) {
                    this.errors.max = `最多可以输入${this.max}个字符哦`;
                    this.valid = false;
                    this.forceShowError = true;
                    return;
                } else {
                    this.forceShowError = false;
                    delete this.errors.max;
                }
            }

            this.valid = true;
        },
        validateEqual () {

            // 只在长度符合时显示正确与否
            if (this.currentValue.length === this.equalWith.length) {
                this.hasLengthEqual = true;
                if (this.currentValue !== this.equalWith) {
                    this.valid = false;
                    this.errors.equal = '输入不一致';
                    return;
                } else {
                    this.valid = true;
                    delete this.errors.equal;
                }
            } else {
                this.valid = '';
                delete this.errors.equal;
            }
        }
    },
    data () {
        return {
            firstError: '',
            forceShowError: false,
            hasLengthEqual: false,
            valid: true,
            currentValue: '',
            rangeVal: {},
            showErrorToast: false,
            errors: {},
            pristine: true,
            touched: false
        };
    },
    watch: {
        mask (val) {
            if (val && this.currentValue) {
                this.currentValue = this.maskValue(this.currentValue);
            }
        },
        valid () {
            this.getError();
        },
        value : {
            handler (val) {
                if (this.type === 'number-range') {
                    this.rangeVal = this.value || {min: '', max: ''};
                } else {
                    this.currentValue = val;
                }

                if (this.pristine === true) {
                    this.pristine = false
                }
            },
            deep: true
        },
        equalWith (newVal) {
            this.hasLengthEqual = false;
            this.validate();
        },
        currentValue (newVal) {
            this.validate();
            this.$emit('input', this.maskValue(newVal));
            /** fix cursor position in dingding  */
            this.mask && !this.type.match('number') && setTimeout(() => {
                this.$refs.input.selectionStart = newVal.length;
                // this.$refs.input.focus();
            }, 0);

            if (this._debounce) {
                this._debounce();
            } else {
                this.$emit('on-change', newVal);
            }
        },
        'rangeVal': {
            handler (val) {
                if(val.min.length >= 6) {
                    this.$refs.input1.style.fontSize = '14px';
                } else {
                    this.$refs.input1.style.fontSize = '';
                }

                if (val.max.length >= 6) {
                    this.$refs.input2.style.fontSize = '14px';
                } else {
                    this.$refs.input2.style.fontSize = '';
                }
                this.$emit('input', val)
                this.$emit('on-change', val);
            },
            deep: true
        }
    }
}
</script>
