<template>
    <div class="som-time-picker">
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

import { getMinutes, times, formatCover, getTrueValue } from '../../date-picker/src/util';

export default {
    name: 'SomTimePicker',
    props: {
        title: String,
        valueFormat: String,
        visibleItemCount: {
            type: Number,
            default: 7
        },
        confirmButtonText: String,
        cancelButtonText: String,
        itemHeight: {
            type: Number,
            default: 34
        },
        minHour: {
            type: Number,
            default: 0
        },
        minuteStep: {
            type: Number,
            default: 1
        },
        timeRangeStep: {
            type: Number,
            default: 1
        },
        defaultMinute: {
            type: Number,
            default: 0
        },
        maxHour: {
            type: Number,
            default: 23
        },
        value: {},
        range: Boolean,
        halftime: Boolean
    },
    data() {
        return {
            innerValue: this.correctValue(this.value)
        };
    },
    watch: {
        value(val) {
            val = this.correctValue(val);
            const isEqual = this.range ? val.join('') === this.innerValue.join('')
                : val === this.innerValue;
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
        halfFormat () {
            return this.format.match(/am|AM/) && this.format.match(/am|AM/)[0];
        },
        rangeHour () {
            return Math.floor(this.timeRangeStep);
        },
        ranges() {
            if (this.halftime) {
                if (this.innerValue && this.innerValue.split(':')[0] > 11) {
                    return [
                        [0, this.maxHour - 12],
                        [0, 59]
                    ];
                } else {
                    return [
                        [this.minHour, 11],
                        [0, 59]
                    ];
                }
            }
            return [
                [this.minHour, this.maxHour],
                [0, 59]
            ];
        },
        columns() {
            if (this.range) {
                return [{ values: this.getTimeRange()}];
            }

            const results = this.ranges.map((range, subIndex) => {
                if (subIndex === 1) {
                    return { values: getMinutes(this.minuteStep)};
                }
                const values = times(range[1] - range[0] + 1, index => {
                    let value = range[0] + index ;
                    return value = value < 10 ? `0${value}` : `${value}`;
                });
                return { values };
            });

            if (this.halftime) {
                if (this.innerValue && this.innerValue.split(':')[0] > 11) {
                    results[0].values[0] = '12';
                }
                if (this.minHour > 11) {
                    results.unshift({values: ['下午']});
                } else if (this.maxHour < 12) {
                    results.unshift({values: ['上午']});
                } else {
                    results.unshift({values: ['上午', '下午']});
                }
            }
            return results;
        }
    },
    methods: {
        correctValue(value) {

            if (!value || !value.length) {
                if (this.range) {
                    const { minHour, defaultMinute, timeRangeStep } = this;
                    let next = minHour + Math.floor(timeRangeStep);
                    let nextMin = defaultMinute + 60 * (timeRangeStep - Math.floor(timeRangeStep));
                    if (nextMin >= 60) {
                        nextMin -= 60;
                        next += 1;
                    }
                    value = [ `${formatCover(minHour)}:${formatCover(defaultMinute)}`,
                    `${formatCover(next)}:${formatCover(nextMin)}` ];
                } else {
                    const { minHour } = this;
                    value = `${minHour > 10 ? minHour : '0' + minHour}:00`;
                }
            }

            if (this.range) {
                return value.map((item) => {
                    const [hour, minute] = item.split(':');
                    let correctedHour = Math.max(parseInt(hour), this.minHour);
                    correctedHour = Math.min(correctedHour, this.maxHour);
                    return `${correctedHour < 10 ? '0' + correctedHour : correctedHour}:${minute}`;
                })
            } else {
                const [hour, minute] = value.split(':');
                let correctedHour = Math.max(hour, this.minHour);
                correctedHour = Math.min(correctedHour, this.maxHour);
                return `${correctedHour < 10 ? '0' + correctedHour : correctedHour}:${minute}`;
            }
        },
        getTimeRange () {
            let rangeMinte = (this.timeRangeStep - this.rangeHour) * 60;
            let nowMin = this.defaultMinute;
            let values = [];
            for (let i = this.minHour; i <= this.maxHour; i++) {
                let now = i < 10 ? '0' + i : i;
                let next = i + this.rangeHour;
                let nextMin = nowMin + rangeMinte;
                if (nextMin >= 60) {
                    nextMin -= 60;
                    next += 1;
                }
                values.push(`${now}:${formatCover(nowMin)} - ${formatCover(next)}:${formatCover(nextMin)}`);
                i = next - 1;
                nowMin = nextMin;
            }
            return values;
        },

        onConfirm() {
            this.$emit('on-confirm', this.innerValue);
        },

        onChange(picker) {
            let values = picker.getValues();
            let value;
            if (this.range) {
                value = values[0].replace(/ /g, '');
                value = value.split('-');
            } else {
                if (this.halftime) {
                    if (values[0] === '下午' && values[1] !== '12') {
                        values[1] = getTrueValue(values[1]) + 12;
                    }
                    if (values[0] === '上午' && values[1] === '12') {
                        values[1] = '00';
                    }
                    value = `${values[1]}:${values[2]}`;
                } else {
                    value = values.join(':');
                }
            }

            value = this.correctValue(value);
            this.innerValue = value;
            this.$emit('on-change', picker);
        },

        updateColumnValue(value) {
            let values = [];

            if (this.range) {
                values = [ value[0] + ' - ' + value[1] ];
            } else {
                const currentValue = value.split(':');
                values = [ currentValue[0], currentValue[1] ];
                if (this.halftime) {
                    values.unshift(values[0] < 12 ? '上午' : '下午');
                    if (values[1] > 12) {
                        values[1] = formatCover(getTrueValue(values[1]) - 12);
                    }
                }
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
