<template>
    <div class="som-select">
        <som-input
            readonly
            :required="required"
            :placeholder="placeholder"
            @click.native="handleClick"
            v-model="currentLabel"
            :disabled="disabled"
            :text-align="textAlign"
            :label-width="labelWidth || $parent.labelWidth"
            :title="title">
            <slot name="label" slot="label"></slot>
            <slot name="right" slot="right">
                <som-icon name="arrow-right" class="arrow"></som-icon>
            </slot>

        </som-input>

        <som-popup v-model="show" v-transfer-dom>
            <som-picker
                ref="picker"
                :value-key="labelKey"
                :title="pickerTitle"
                :columns="options"
                :visible-item-count="visibleItemCount"
                :item-height="itemHeight"
                :show-toolbar="showToolbar"
                @on-change="handleChange" 
                @on-cancel="show = false"
                @on-confirm="handleConfrim">
                <slot></slot>
            </som-picker>
        </som-popup>
    </div>
</template>

<script>
import { TransferDom } from 'som-ui/src';

export default {
    name: 'SomSelect',
    directives: {
        TransferDom
    },
    props: {
        required: Boolean,
        placeholder: {
            type: String,
            default: '请选择'
        },
        options: {
            type: Array,
            default: () => ([])
        },
        disabled: Boolean,
        value: [String, Number, Object],
        emptyLabel: {
            type: String,
            default: ''
        },
        textAlign: {
            type: String,
            default: 'left'
        },
        title: String,
        labelWidth: String,
        labelKey: {
            type: String,
            default: 'text'
        },
        valueKey: {
            type: String,
            default: 'value'
        },
        itemHeight: {
            type: Number,
            default: 34
        },
        showToolbar: {
            type: Boolean,
            default: true
        },
        pickerTitle: String,
        confirmButtonText: String,
        cancelButtonText: String,
        visibleItemCount: {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            show: false,
            currentLabel: '',
            currentItem: ''
        }
    },
    watch: {
        value: {
            handler () {
                this.$nextTick(() => {
                    if (!this.value) {
                        this.currentLabel = this.emptyLabel;
                        this.$refs.picker.setColumnIndex(0, 0);
                    } else {
                        this.initLable();
                    }
                });
            },
            immediate: true
        },
        currentItem (value) {
            this.$emit('on-change', value[this.valueKey], value);
            this.$emit('input', value[this.valueKey]);
        },
        options () {
            this.$nextTick(() => {
                this.initLable();
            })
        }
    },
    methods: {
        initLable () {
            let val = this.value;
            if (!this.currentItem || val !== this.currentItem.value) {
                let options = this.options;
                for (let i = 0; i < this.options.length; i++) {
                    if (options[i][this.valueKey] === val) {
                        let label = options[i][this.labelKey];
                        this.$refs.picker.setValues([label]);
                        this.currentLabel = label;
                        this.flag = false;
                    }
                }
            }
        },
        handleClick () {
            if (!this.disabled) this.show = true;
        },
        handleConfrim (val) { /* istanbul ignore next */
            this.show = false;
            this.currentItem = val;
            this.currentLabel = val[this.labelKey];
        },
        handleChange (picker, values, index) {
            if (!this.showToolbar) {
                this.currentItem = values;
                this.currentLabel = values[this.labelKey];
            }
        }
    }
};
</script>
