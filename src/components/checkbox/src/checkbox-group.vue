<template>
    <div class="som-checkbox-group">
        <div class="som-checkbox">
            <div>
                <label class="som-list-item som-checkbox__label" 
                    :class="{
                        'som-checklist-label-left': labelPosition === 'left',
                        'som-checkbox-label-disable': disabled }" >

                    <div class="som-list-item__hd" @click="handleClick">
                        <input type="checkbox" 
                            class="som-check"
                            :value="true" 
                            v-model="currentValue"
                            :disabled="disabled">
                            
                        <span class="checkbox-icon">
                            <som-icon name="check" :size="14"></som-icon>
                        </span>
                    </div>
                    <div class="som-list-item__bd">
                        {{label}}
                    </div>
                </label>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import Emitter from 'som-ui/src/mixins/emitter';

export default {
    name: 'SomCheckboxGroup',
    mixins: [Emitter],
    props: {
        label: {
            type: String,
            default: '全选'
        },
        value: {
            type: Array,
            default: () => []
        },
        labelPosition: String,
        disabled: Boolean
    },
    data () {
        return {
            optionsCache: [],
            currentValue: false,
            optionsLength: 0,
            checkLength: 0,
            isCheckbox: true
        }
    },
    created () {
        this.$on('on-change', this.handleChange);
    },
    methods: {
        handleChange () {
            let length = 0
            let val = [];
            this.optionsCache.forEach((checkbox) => {
                length += checkbox.currentValue.length;
                val = val.concat(checkbox.currentValue);
            });
            if (length === this.optionsLength) {
                this.currentValue = true;
            } else {
                this.currentValue = false;
            }
            this.$emit('input', val);
            this.$emit('on-change-group', val);
        },
        handleClick () {
            // fix nextTick no use
            setTimeout(() => {
                if (this.currentValue) {
                    this.broadcast('SomCheckbox', 'handleAllCheck');
                } else {
                    this.broadcast('SomCheckbox', 'handleCancleCheck');
                }
            }, 100);
        }
    }
};
</script>
