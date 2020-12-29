<template>
    <div class="som-picker">
        <div class="som-picker__toolbar som-hairline--top-bottom" v-if="showToolbar">
            <slot>
                <div class="som-picker__cancel" @click="emit('on-cancel')">{{ cancelButtonText || '取消' }}</div>
                <div class="som-picker__title som-ellipsis" v-if="title" v-text="title" />
                <div class="som-picker__confirm" @click="emit('on-confirm')">{{ confirmButtonText || '确定' }}</div>
            </slot>
        </div>
        <div class="som-picker__columns" :style="columnsStyle" @touchmove.prevent>
            <picker-column
                v-for="(item, index) in currentColumns"
                :key="index"
                :value-key="valueKey"
                :options="item.values"
                :class-name="item.className"
                :default-index="item.defaultIndex"
                :item-height="itemHeight"
                :visible-item-count="visibleItemCount"
                @on-change="(selectIndex) => onChange(index, selectIndex)"
            />
            <div class="som-picker__frame som-hairline--top-bottom" :style="frameStyle" />
        </div>
    </div>
</template>

<script>
import { extend } from 'som-ui/src/utils/util';
import PickerColumn from './picker-column';

export default {
    name: 'SomPicker',
    components: {
        PickerColumn
    },
    props: {
        title: String,
        showToolbar: Boolean,
        confirmButtonText: String,
        cancelButtonText: String,
        visibleItemCount: {
            type: Number,
            default: 5
        },
        valueKey: {
            type: String,
            default: 'text'
        },
        itemHeight: {
            type: Number,
            default: 34
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            children: [],
            baseLineHeight: 25,
            currentColumns: []
        };
    },
    created() {
        this.initColumns();
    },
    watch: {
        columns() {
            this.initColumns();
        }
    },
    computed: {
        frameStyle() {
            return {
                height: this.itemHeight + 'px'
            };
        },
        columnsStyle() {
            return {
                height: (this.baseLineHeight * (this.visibleItemCount - 1) + this.itemHeight) + 'px' //eslint-disable-line
            };
        }
    },
    methods: {
        initColumns() {
            const columns = this.columns.map(extend);
            this.isSimpleColumn = columns.length && !columns[0].values;
            this.currentColumns = this.isSimpleColumn ? [{ values: columns }] : columns;
        },
        emit(event) {
            if (this.isSimpleColumn) {
                this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                this.$emit(event, this.getValues(), this.getIndexes());
            }
        },
        onChange(columnIndex, selectIndex) {
            if (this.isSimpleColumn) {
                this.$emit('on-change', this, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                this.$emit('on-change', this, this.getValues(), selectIndex, columnIndex);
            }
        },
        // get column instance by index
        getColumn(index) {
            return this.children[index];
        },
        // get column value by index
        getColumnValue(index) {
            return (this.getColumn(index) || {}).currentValue;
        },
        // set column value by index
        setColumnValue(index, value) {
            const column = this.getColumn(index);
            column && column.setValue(value);
        },
        // get column option index by column index
        getColumnIndex(columnIndex) {
            return (this.getColumn(columnIndex) || {}).currentIndex;
        },
        // set column option index by column index
        setColumnIndex(columnIndex, optionIndex) {
            const column = this.getColumn(columnIndex);
            column && column.setIndex(optionIndex);
        },
        // get options of column by index
        getColumnValues(index) {
            return (this.currentColumns[index] || {}).values;
        },
        // set options of column by index
        setColumnValues(index, options) {
            const column = this.currentColumns[index];
            if (column) {
                column.values = options;
            }
        },
        // get values of all columns
        getValues() {
            return this.children.map(child => child.currentValue);
        },
        // set values of all columns
        setValues(values) {
            values.forEach((value, index) => {
                this.setColumnValue(index, value);
            });
        },
        // get indexes of all columns
        getIndexes() {
            return this.children.map(child => child.currentIndex);
        },
        // set indexes of all columns
        setIndexes(indexes) {
            indexes.forEach((optionIndex, columnIndex) => {
                this.setColumnIndex(columnIndex, optionIndex);
            });
        }
    }
};
</script>
