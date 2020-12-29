<template>
    <div class="som-list-item__ft som-switch__ft" v-if="singleButton">
        <input class="som-switch__ft__input" type="checkbox" :disabled="disabled" v-model="currentValue" :class="switchClass"/>
        <div v-if="preventDefault" class="som-switch__ft--overlay" @click="onClick"></div>
    </div>
    <div class="som-switch som-list-item" v-else>
        <div class="som-list-item__bd">
            <label class="som-list-item-label" :style="labelStyle" :class="labelClass" v-html="title"></label>
            <span class="som-list-item__label-desc" v-if="inlineDesc">{{ inlineDesc }}</span>
        </div>
        <div class="som-list-item__ft som-switch__ft">
            <input class="som-switch__ft__input" type="checkbox" :disabled="disabled" v-model="currentValue" :class="switchClass" />
            <div v-if="preventDefault" class="som-switch__ft--overlay" @click="onClick"></div>
        </div>
    </div>

</template>

<script>
import { cleanStyle } from 'som-ui/src/utils/util';

export default {
    name: 'SomSwitch',
    props: {
        title: String,
        singleButton: Boolean,
        disabled: Boolean,
        value: {
            type: [Boolean, String, Number],
            default: false
        },
        inlineDesc: [String, Boolean, Number],
        preventDefault: Boolean,
        switchClass: String,
        valueMap: {
            type: Array,
            default: () => ([false, true])
        }
    },
    data () {
        return {
            currentValue: this.toBoolean(this.value)
        };
    },
    watch: {
        currentValue (val) {
            const rawValue = this.toRaw(val);
            this.$emit('input', rawValue);
            this.$emit('on-change', rawValue);
        },
        value (val) {
            this.currentValue = this.toBoolean(val);
        }
    },
    computed: {
        labelStyle () {
            let isHTML = /<\/?[^>]*>/.test(this.title);
            let width = Math.min(isHTML ? 5 : (this.title.length + 1), 10) + 'em';
            width = this.$parent ? this.$parent.labelWidth || width : 'auto';
            return cleanStyle({
                display: 'block',
                width: width,
                textAlign: this.$parent ? this.$parent.labelAlign : ''
            });
        },
        labelClass () {
            return {
                'som-label-justify': this.$parent && this.$parent.labelAlign === 'justify'
            };
        }
    },
    methods: {
        onClick () {
            this.$emit('on-click', !this.currentValue, this.currentValue);
        },
        toBoolean (val) {
            if (!this.valueMap) {
                return val;
            } else {
                const index = this.valueMap.indexOf(val);
                return index === 1;
            }
        },
        toRaw (val) {
            if (!this.valueMap) {
                return val;
            } else {
                return this.valueMap[ val ? 1 : 0 ];
            }
        }
    }
};
</script>
