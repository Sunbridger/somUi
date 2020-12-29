<template>
    <div class="som-radio" :class="disabled ? 'som-radio--disabled' : ''">
        <!-- 勾选状态 -->
        <label class="som-list-item som-radio__label" v-for="(one, index) in options" :key="index" v-if="mode === 'icon'" @click="handleClick(one)">
            <div class="som-list-item__bd som-radio__bd">
                <slot name="each-item" :icon="one.icon" :label="getKey(one)" :index="index" :selected="currentValue === getValue(one)">
                    <p>
                        <img class="som-radio-icon" :src="one.icon" v-show="one && one.icon">
                        <span class="som-radio-label" :class="currentValue === getValue(one) ? 'som-radio-label-selected' : ''">{{ one | getKey }}</span>
                    </p>
                </slot>
            </div>
            <div class="som-list-item__ft som-radio__ft">
                <input type="radio" class="som-radio-check" v-model="currentValue" :value="getValue(one)" :disabled="disabled" @click.stop="()=>{}">
                <span class="som-icon-check"></span>
            </div>
        </label>

        <!-- 填写状态 -->
        <div class="som-list-item" v-show="fillMode">
            <div class="som-list-item__hd"><label>{{ fillLabel }}</label></div>
            <div class="som-list-item__bd">
                <input class="som-radio-input" type="text" v-model="fillValue" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus()">
            </div>
            <div class="som-list-item__ft" v-show="value==='' && !isFocus">
                <i class="som-icon-warn"></i>
            </div>
        </div>
        
        <!-- 按钮状态 -->
        <div class="som-list-item som-radio__label som-radio--button" v-if="mode === 'button'" :class="disabled ? 'som-radio--button-disabled' : ''">
            <div class="som-list-item__hd"><slot>{{title}}</slot></div>

            <div class="som-radio-button">
                <div class="som-list-item__ft som-radio__ft" v-for="(one, index) in options" :key="`origin${index}`">
                    <input type="radio" class="som-radio-check" v-model="currentValue" :value="getValue(one)" :disabled="disabled">
                    <span class="som-radio--button__inner"></span>
                    <span class="som-radio-label" :class="currentValue === getValue(one) ? 'som-radio-label-selected' : ''">{{ one | getKey }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getValue, getKey, getLabel } from 'som-ui/src/utils/object-fliter';

function contains (a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj || a[i].key === obj) {
            return true;
        }
    }
    return false;
}

export default {
    name: 'SomRadio',
    filters: {
        getValue,
        getKey
    },
    props: {
        mode: {
            type: String,
            default: 'button'
        },
        options: {
            type: Array,
            required: true
        },
        fillMode: {
            type: Boolean,
            default: false
        },
        fillPlaceholder: {
            type: String,
            default: '其他'
        },
        fillLabel: {
            type: String,
            default: '其他'
        },
        title: String,
        value: [String, Number, Boolean],
        disabled: Boolean
    },
    created () {
        this.handleChangeEvent = true;
    },
    methods: {
        getValue,
        getKey,
        onFocus () {
            this.currentValue = this.fillValue || '';
            this.isFocus = true;
        },
        handleClick (one) {
            this.$emit('on-click', this.getValue(one));
        }
    },
    watch: {
        value (val) {
            this.currentValue = val;
        },
        currentValue (newVal) {
            var isOption = contains(this.options, newVal);
            if (newVal !== '' && isOption) {
                this.fillValue = '';
            }
            this.$emit('on-change', newVal, getLabel(this.options, newVal));
            this.$emit('input', newVal);
        },
        fillValue (newVal) {
            if (this.isFocus) {
                this.currentValue = newVal;
            }
        }
    },
    data () {
        return {
            fillValue: '',
            isFocus: false,
            currentValue: this.value
        };
    }
};
</script>
