<template>
    <div class="som-date-picker" :class="type ? `som-date-picker--${type}` : ''">
        <som-picker
            ref="picker"
            show-toolbar
            :columns="columns"
            :title="title"
            :item-height="itemHeight"
            :confirm-button-text="confirmButtonText"
            :cancel-button-text="cancelButtonText"
            :visible-item-count="visibleItemCount"
            @on-change="onChange"
            @on-confirm="onConfirm"
            @on-cancel="$emit('on-cancel')">
        </som-picker>
    </div>
</template>

<script>

const isValidDate = date => Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
import { getMinutes, times, getTrueValue, getMonthEndDay } from './util.js';

export default {
    name: 'SomDatePicker',
    props: {
        type: {
            type: String,
            default: 'date'
        },
        title: String,
        valueFormat: String,
        confirmButtonText: String,
        cancelButtonText: String,
        itemHeight: {
            type: Number,
            default: 34
        },
        visibleItemCount: {
            type: Number,
            default: 7
        },
        minDate: {
            type: Date,
            default() {
                return new Date(new Date().getFullYear() - 10, 0, 1);
            },
            validator: isValidDate
        },
        maxDate: {
            type: Date,
            default() {
                return new Date(new Date().getFullYear() + 10, 11, 31);
            },
            validator: isValidDate
        },
        defaultDate: {
            type: Date,
            default() {
                return new Date();
            },
        },
        value: {}
    },
    data() {
        return {
            innerValue: this.correctValue(this.value),
            datetimeNextMonth: '',
            datetimePreMonth: '',
            dateYearFlag: '',
            datetimeYear: ''
        };
    },
    watch: {
        maxDate () {
            this.innerValue = this.correctValue(this.value);
            this.updateColumnValue(this.innerValue);
        },
        minDate() {
            this.innerValue = this.correctValue(this.value);
            this.updateColumnValue(this.innerValue);
        },
        value(val) {
            val = this.correctValue(val);
            const isEqual = val.valueOf() === this.innerValue.valueOf();

            if (!isEqual) {
                this.innerValue = val;
            }
        },
        innerValue(val) {
            this.updateColumnValue(val);
            this.$emit('input', val);
        }
    },

    computed: {
        ranges() {
            let date = this.pickerDate;
            const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary('max', date);
            const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary('min', date);

            const result = [
                [minYear, maxYear],
                [minMonth, maxMonth],
                [minDate, maxDate],
                [minHour, maxHour],
                [minMinute, maxMinute]
            ];

            if (this.type === 'date') result.splice(3, 2);
            if (this.type === 'year-month') result.splice(2, 3);
            if (this.type === 'year') result.splice(1, 4);
            return result;
        },
        columns() {
            const results = this.ranges.map((range, subIndex) => {

                const values = times(range[1] - range[0] + 1, index => {
                    let value = range[0] + index ;
                    switch(subIndex) {
                        case 0: value += '年';
                        break;
                        case 1: value += '月';
                        break;
                        case 2: value += '日';
                        break
                    }
                    return value = value < 10 ? `0${value}` : `${value}`;
                });
                return { values };
            });
            return results;
        },
        pickerDate () {
            return this.innerValue;
        }
    },
    methods: {
        correctValue(value) {
            // validate value
            if (!isValidDate(value)) {
                value = this.defaultDate;
            }

            value = Math.max(value, this.minDate);
            value = Math.min(value, this.maxDate);
            return new Date(value);
        },
        getBoundary (type, value) {
            const boundary = this[`${type}Date`];
            const year = boundary.getFullYear();
            let month = 1;
            let date = 1;
            let hour = 0;
            let minute = 0;

            if (type === 'max') {
                month = 12;
                date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
                hour = 23;
                minute = 59;
            }

            if (value.getFullYear() === year) {
                month = boundary.getMonth() + 1;

                if (value.getMonth() + 1 === month) { //eslint-disable-line
                    date = boundary.getDate();
                }

                if (value.getMonth() + 1 === month) {
                    if (value.getDate() === date) {
                        hour = boundary.getHours();
                        if (value.getHours() === hour) {
                            minute = boundary.getMinutes();
                        }
                    }
                }
            }

            return {
                [`${type}Year`]: year,
                [`${type}Month`]: month,
                [`${type}Date`]: date,
                [`${type}Hour`]: hour,
                [`${type}Minute`]: minute
            };
        },
        onConfirm() {
            let label = this.valueFormat;
            if (this.valueFormat) {
                let y,M, d,h, m;
                if (this.valueFormat.match(/yyyy/i)){
                    y = this.pickerDate.getFullYear();
                    label = label.replace(/yyyy/, y);
                }
                if (this.valueFormat.match(/MM/)){
                    M = this.pickerDate.getMonth() + 1;
                    label = this.valueFormat.replace(/yyyy/, y);
                    label = label.replace(/MM/, M < 10 ? `0${M}` : M);
                }
                if (this.valueFormat.match(/dd/i)){
                    d = this.pickerDate.getDate();
                    label = label.replace(/dd/i, d < 10 ? `0${d}` : d);
                }
            }
            this.$emit('on-confirm', label || this.innerValue);
        },

        onChange(picker) {
            let values = picker.getValues();

            for (let i = 0; i < values.length; i++) {
                values[i] = values[i].replace(/['年', '月', '日']/g, '');
            }

            let value;
            const year = getTrueValue(values[0]);
            const month = getTrueValue(values[1]) || 1;
            const maxDate = getMonthEndDay(year, month);
            let date = getTrueValue(values[2]) || 1;
            date = date > maxDate ? maxDate : date;
            let hour = 0;
            let minute = 0;
            value = new Date(year, month - 1, date, hour, minute);

            value = this.correctValue(value);
            this.innerValue = value;
            this.$emit('on-change', picker);
        },

        updateColumnValue(value) {
            let values = [];
            values = [
                `${value.getFullYear()}年`,
                `${value.getMonth() + 1}月`,
                `${value.getDate()}日`
            ];

            if (this.type === 'year-month') {
                values = values.slice(0, 2);
            }

            if (this.type === 'year') {
                values = values.slice(0, 1);
            }
            this.$nextTick(() => {
                this.setColumnByValues(values);
            });
        },

        setColumnByValues(values) {
            if (!this.$refs.picker) {
                return;
            }
            this.$refs.picker.setValues(values);
        }
    },
    mounted() {
        this.updateColumnValue(this.innerValue);
    }

};
</script>
