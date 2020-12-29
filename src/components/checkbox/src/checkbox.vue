<template>
    <div class="som-checkbox">
        <div v-if="align === 'vertical'">
            <div v-show="title" class="som-checkbox__title">{{ title }}</div>
            <label class="som-list-item som-checkbox__label" 
                :class="{ 'som-checklist-label-left': labelPosition === 'left', 'som-checkbox-label-disable': isDisabled(getValue(one)) || disabled }" 
                v-for="(one, index) in currentOptions"
                :key="index">
                <div class="som-list-item__hd">
                    <input type="checkbox" 
                        class="som-check"
                        :value="getValue(one)" 
                        v-model="currentValue" 
                        :disabled="isDisabled(getValue(one)) || disabled">
                    <span class="checkbox-icon">
                        <som-icon name="check" :size="14"></som-icon>
                    </span>
                </div>
                <div class="som-list-item__hd" v-if="one && one.icon">
                    <img :src="one.icon" height="24" width="24">
                </div>
                <div class="som-list-item__bd">
                    <span v-html="getKey(one)"></span>
                    <span :class="getInlineDesc(one) ? 'som-list-item__label-desc' : ''" @click="descClick(one, index, $event)">
                        <slot inlineDesc>{{ getInlineDesc(one) }}</slot>
                    </span>
                </div>
            </label>
        </div>

        <div v-else class="som-list-item som-checkbox--horizontal">
            <div class="som-list-item__hd" v-show="title">{{title}}</div>
            <div class="som-checkbox-wrap">
                <div class="som-list-item__ft" v-for="(one, index) in options" :key="`origin${index}`">
                    <input type="checkbox" class="som-check" v-model="currentValue" :value="getValue(one)" :disabled="isDisabled(getValue(one)) || disabled">
                    <span class="checkbox-icon">
                        <som-icon name="check" :size="14"></som-icon>
                    </span>
                    <span class="som-checkbox-label">{{ one | getKey }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getValue, getLabels, getKey, getInlineDesc } from 'som-ui/src/utils/object-fliter';
import Emitter from 'som-ui/src/mixins/emitter';

/* istanbul ignore next */
function shuffle (arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Expected Array, got ' + typeof arr);
    }

    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();

    while (len) {
        rand = Math.floor(Math.random() * len--);
        tmp = ret[len];
        ret[len] = ret[rand];
        ret[rand] = tmp;
    }

    return ret;
}

export default {
    name: 'SomCheckbox',
    filters: {
        getValue,
        getKey
    },
    mixins: [Emitter],
    props: {
        required: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            required: true
        },
        value: {
            type: Array,
            default: () => []
        },
        title: String,
        max: Number,
        min: Number,
        randomOrder: Boolean,
        labelPosition: {
            type: String,
            default: 'right'
        },
        align: {
            type: String,
            default: 'vertical'
        },
        disabled: Boolean,
        inlineDescClick: Function
    },
    data () {
        return {
            currentValue: [],
            currentOptions: this.options,
            tempValue: '' // used only for radio mode
        };
    },
    beforeUpdate () {
        if (this.isRadio) {
            const length = this.currentValue.length;
            if (length > 1) {
                this.currentValue = [this.currentValue[length - 1]];
            }
            const val = JSON.parse(JSON.stringify(this.currentValue));
            this.tempValue = val.length ? val[0] : '';
        }
    },
    created () {
        this.handleChangeEvent = true;
        this.$on('handleCancleCheck', this.cancleCheck);
        this.$on('handleAllCheck', this.allCheck);

        if (this.value) {
            this.currentValue = this.value;
            if (this.isRadio) {
                this.tempValue = this.isRadio ? this.value[0] : this.value;
            }
        }

        // checkgroup 是否有选中的值
        if (this.$parent && this.$parent.isCheckbox) {
            this.$parent.optionsLength += this.options.length;
            this.$parent.optionsCache.push(this);
            this.options.forEach((v) => {
                if (this.$parent.value.indexOf(v.value || v) !== -1) {
                    this.currentValue.push(v.value || v);
                }
            });
        }

        if (this.randomOrder) {
            this.currentOptions = shuffle(this.options);
        } else {
            this.currentOptions = this.options;
        }
    },
    methods: {
        descClick (one, index, event) {
            if (this.inlineDescClick) {
                this.inlineDescClick(one, index, event);
            }
        },
        getValue,
        getKey,
        getInlineDesc,
        getFullValue () {
            const labels = getLabels(this.options, this.currentValue);
            return this.currentValue.map((one, index) => {
                return {
                    value: one,
                    label: labels[index]
                };
            });
        },
        isDisabled (value) {
            if (this.$parent && this.$parent.isCheckbox && this.$parent.disabled) {
                return true;
            }

            if (this._max > 1) {
                return this.currentValue.indexOf(value) === -1 && this.currentValue.length === this._max;
            }

            return false;
        },
        allCheck() {
            this.options.forEach((v) => {
                if (this.currentValue.indexOf(v.value || v) === -1) this.currentValue.push(v.value || v);
            });
        },
        cancleCheck() {
            this.currentValue = [];
        }
    },
    computed: {
        isRadio () {
            if (typeof this.max === 'undefined') {
                return false;
            } else {
                return this.max === 1;
            }
        },
        _total () {
            return this.options.length;
        },
        _min () {
            if (!this.required && !this.min) {
                return 0;
            }
            if (!this.required && this.min) {
                return Math.min(this._total, this.min);
            }
            if (this.required) {
                if (this.min) {
                    let max = Math.max(1, this.min);
                    return Math.min(this._total, max);
                } else {
                    return 1;
                }
            }
        },
        _max () {
            if (!this.required && !this.max) {
                return this._total;
            }
            if (this.max) {
                return this.max;
            } else {
                return this._total;
            }
        },
        valid () {
            return this.currentValue.length >= this._min && this.currentValue.length <= this._max;
        }
    },
    watch: {
        tempValue (val) {
            const _val = val ? [val] : [];
            this.$emit('input', _val);
            this.$emit('on-change', _val, getLabels(this.options, _val));
        },
        value (newVal) {
            if (JSON.stringify(newVal) !== JSON.stringify(this.currentValue)) {
                this.currentValue = newVal;
            }
        },
        options (val) {
            this.currentOptions = val;
        },
        currentValue (newVal) {
            const val = JSON.parse(JSON.stringify(newVal));

            if (!this.isRadio) {
                this.$emit('input', val);
                this.$emit('on-change', val, getLabels(this.options, val));
                this.dispatch('SomCheckboxGroup', 'on-change');
                let err = {};
                if (this._min) {
                    if (this.required) {
                        if (this.currentValue.length < this._min) {
                            err = {
                                min: this._min
                            };
                        }
                    } else {
                        if (this.currentValue.length && this.currentValue.length < this._min) { //eslint-disable-line
                            err = {
                                min: this._min
                            };
                        }
                    }
                }
                if (!this.valid && JSON.stringify(err) !== "{}") {
                    this.$emit('on-error', err);
                } else {
                    this.$emit('on-clear-error');
                }
            }
        }
    }
};
</script>
