<template>
    <div class="som-date-time-picker" :class="!range && 'not-range'">
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
import { getMinutes, times, formatCover, getTrueValue, getWeek, getMonthEndDay, isToday, getWeekLable } from '../../date-picker/src/util';

export default {
    name: 'SomDateTimePicker',
    props: {
        range: Boolean,
        title: String,
        format: {
            type: String,
            default: 'yyyy-mm-dd am H mm'
        },
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
        defaultDate: {
            type: Date,
            default() {
                return new Date();
            },
        },
        defaultMinute: {
            type: Number,
            default: 0
        },
        maxHour: {
            type: Number,
            default: 23
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
            const isEqual = this.range ? val.join('') === this.innerValue.join('') :
                val.valueOf() === this.innerValue.valueOf();

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
            let date = this.pickerDate;

            this.datetimeYear = date.getFullYear();

            const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary('max', date);
            const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary('min', date);

            const result = [
                [minYear, maxYear],
                [minMonth, maxMonth],
                [minDate, maxDate],
                [minHour, maxHour],
                [minMinute, maxMinute]
            ];

            result.splice(0, 1);
            return result;
        },
        columns() {
            const results = this.ranges.map((range, subIndex) => {
                const values = times(range[1] - range[0] + 1, index => {
                    let value = range[0] + index ;
                    this.datetimePreMonth = this.pickerDate.getMonth();
                    this.datetimeNextMonth = this.datetimePreMonth + 2;
                    return value = value < 10 ? `0${value}` : `${value}`;
                });
                return { values };
            });


            let datetime = [{}, {}, {}];
            let dvalues = [];
            let weekDay = '';

            let nextMonthRange = getMonthEndDay(this.datetimeYear, this.datetimePreMonth);
            let preMonthRange = getMonthEndDay(this.datetimeYear, this.datetimePreMonth);
            let monthRange = getMonthEndDay(this.datetimeYear, this.datetimePreMonth + 1);

            if (this.datetimePreMonth === 0) {
                this.datetimePreMonth = 12;
            }
            let preFalg = this.getPreMonthRange();

            if (preFalg.falg) {
                for (let i = preFalg.date; i<= preMonthRange; i++) {
                    weekDay = getWeek(this.datetimeYear, Number(this.datetimePreMonth), i);
                    dvalues.push(weekDay === '今天' ? '今天' : `${this.datetimePreMonth}月${i}日 ${weekDay}`);
                }
            }

            let min = this.getMonthRange().min || 1;
            let max = this.getMonthRange().max || monthRange;
            for (let i = min; i <= max; i++) {
                weekDay = getWeek(this.datetimeYear, Number(this.datetimeNextMonth - 1), i);
                dvalues.push(weekDay === '今天' ?
                    weekDay :`${`${Number(this.datetimeNextMonth - 1)}月${i}日 ${weekDay}`}`);
            }

            let nextRange = this.getNextMonthRange();
            if (this.datetimeNextMonth === 13) {
                this.datetimeNextMonth = 1;
            }

            if (nextRange.falg) {
                for (let i = 1; i <= nextRange.date; i++ ) {
                    weekDay = getWeek(this.datetimeYear, Number(this.datetimeNextMonth), i);
                    dvalues.push(weekDay === '今天' ? '今天' : `${this.datetimeNextMonth}月${i}日 ${weekDay}`);
                }
            }

            datetime[0].values = dvalues;
            // 如果是日期带时间段选择, 直接返回
            if (this.range) {
                datetime.splice(2, 1);
                datetime[1].values = this.getTimeRange();
                return datetime;
            }
            if (this.halfFormat) {
                datetime[1].values = this.getDateHalf().half;
                datetime[2].values = this.getDateHalf().hours;
                if (this.innerValue.getHours() > 11 && datetime[2].values.indexOf('0') !== -1) {
                    datetime[2].values[0] = '12';
                }
                datetime[3] = { values: getMinutes(this.minuteStep) };
            } else {
                datetime[1].values = this.getDateHalf().hours;
                datetime[2].values = getMinutes(this.minuteStep);
            }
            return datetime;
        },
        pickerDate () {
            return this.range ? this.innerValue[0] : this.innerValue;
        }
    },
    methods: {
        correctValue(value) {
            // validate value
            if (!this.range && !isValidDate(value)) {
                value = this.defaultDate;
            } else if (!value || !value.length) {

                if (this.range) {
                    const { minHour, defaultMinute, timeRangeStep, type } = this;
                    let next = minHour + Math.floor(timeRangeStep);
                    let nextMin = defaultMinute + 60 * (timeRangeStep - Math.floor(timeRangeStep));
                    if (nextMin >= 60) {
                        nextMin -= 60;
                        next += 1;
                    }

                    value = [ this.minDate,
                    `${formatCover(minHour)}:${formatCover(defaultMinute)}`,
                    `${formatCover(next)}:${formatCover(nextMin)}` ];
                }
            }

            // time type
            if (this.range) {
                let date = value && value[0];
                let time = [];
                if (!(date instanceof Date)) {
                    console.error('绑定日期格式错误！！！');
                }
                // date type
                const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary('max', date);
                const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary('min', date);
                const minDay = new Date(minYear, minMonth - 1, minDate, minHour, minMinute);
                const maxDay = new Date(maxYear, maxMonth - 1, maxDate, maxHour, maxMinute);
                date = Math.max(date, minDay);
                date = Math.min(date, maxDay);
                time.push(new Date(date));

                if (value && value[1] &&  value[2]) {
                    const [hour, minute] = value[1].split(':');
                    let correctedHour = Math.max(parseInt(hour), this.minHour);
                    correctedHour = Math.min(correctedHour, this.maxHour);
                    time.push(`${correctedHour < 10 ? '0' + correctedHour : correctedHour}:${minute}`);
                    const [hour1, minute1] = value[2].split(':');
                    let correctedHour1 = Math.max(parseInt(hour1), this.minHour);
                    correctedHour1 = Math.min(correctedHour1, this.maxHour);
                    time.push(`${correctedHour1 < 10 ? '0' + correctedHour1 : correctedHour1}:${minute1}`);
                }

                return time;
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

                // datetime 时取最大最小日期
                if (!this.range) {
                    date = boundary.getDate();
                    hour = boundary.getHours();
                } else {
                    if (value.getMonth() + 1 === month) { //eslint-disable-line
                        date = boundary.getDate();
                    }
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
        getDateHalf () {
            let half = [];
            let hours = [];
            // 当时最大日时
            if (this.halfFormat) {
                if (this.datetimeYear === this.maxDate.getFullYear() &&
                this.innerValue.getMonth() === this.maxDate.getMonth() &&
                this.innerValue.getDate() === this.maxDate.getDate()) {
                    if (this.maxDate.getHours() < 12) {
                        half = this.halfFormat === 'am' ? ['上午'] : ['AM'];
                        hours = times(this.maxDate.getHours() + 1, index => {
                            return `${index}`;
                        });
                    } else {
                        half = this.halfFormat === 'am' ? ['上午', '下午'] : ['AM', 'PM'];
                        if (this.innerValue.getHours() > 11) {
                            hours = times(this.maxDate.getHours() - 11, index => {
                                return `${index}`;
                            });
                        } else {
                            hours = times(12, index => {
                                return `${index}`;
                            });
                        }
                    }
                // 当时最小日时
                } else if (this.datetimeYear === this.minDate.getFullYear() &&
                    this.innerValue.getMonth() === this.minDate.getMonth() &&
                    this.innerValue.getDate() === this.minDate.getDate()) {
                        if (this.minDate.getHours() < 12) {
                            half = this.halfFormat === 'am' ? ['上午', '下午'] : ['AM', 'PM'];
                            if (this.innerValue.getHours() < 12) {
                                hours = times(12 - this.minDate.getHours(), index => {
                                    return `${index + this.minDate.getHours()}`;
                                });
                            } else {
                                hours = times(12, index => {
                                    return `${index}`;
                                });
                            }
                        } else {
                            half = this.halfFormat === 'am' ? ['下午'] : ['PM'];
                            hours = times(23 - this.minDate.getHours(), index => {
                                return `${index + this.minDate.getHours() - 12}`;
                            });
                        }
                } else {
                    half = this.halfFormat === 'am' ? ['上午', '下午'] : ['AM', 'PM'];
                    hours = times(12, index => {
                        return index + '';
                    });
                }
            } else {
                hours = times(24, index => {
                    return index + '';
                });
            }
            return {half, hours};
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

        getPreMonthRange () {
            let year = this.datetimePreMonth === 12 ? this.datetimeYear - 1 : this.datetimeYear;

            if (year > this.minDate.getFullYear()) {
                return { falg: true, date: 21 };
            } else if (year === this.minDate.getFullYear()) {
                if (this.datetimePreMonth > this.minDate.getMonth() + 1) {
                    return { falg: true, date: 21 };
                } else if (this.datetimePreMonth === this.minDate.getMonth() + 1) {
                    return { falg: true, date:  this.minDate.getDate()};
                }
                return {falg: false};
            }
            return {falg: false};
        },
        getMonthRange () {
            let min, max;
            if (this.datetimeYear === this.minDate.getFullYear() && this.pickerDate.getMonth() === this.minDate.getMonth()) {
                min = this.minDate.getDate();
            }
            if (this.datetimeYear === this.maxDate.getFullYear() && this.pickerDate.getMonth() === this.maxDate.getMonth()) {
                max = this.maxDate.getDate();
            }
            return {min: min, max: max}
        },
        getNextMonthRange () {
            let year = this.datetimeNextMonth === 13 ? this.datetimeYear + 1 : this.datetimeYear;
            let month = this.datetimeNextMonth === 13 ? 1 : this.datetimeNextMonth;
            if (year < this.maxDate.getFullYear()) {
                return { falg: true, date: 7 };
            } else if (year === this.maxDate.getFullYear()) {
                if (month < this.maxDate.getMonth() + 1) {
                    return { falg: true, date: 7 };
                } else if (month === this.maxDate.getMonth() + 1) {
                    return { falg: true, date:  this.maxDate.getDate()};
                }
                return {falg: false};
            }
            return {falg: false};
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

                if (this.range) {
                    label = label.slice(0, 10) + ' ';
                    let label1 =  label + this.innerValue[1];
                    let label2 =  label + this.innerValue[2];
                    label = [label1, label2]
                } else {
                    if (this.valueFormat.match(/hh/i)){
                        h = this.pickerDate.getHours();
                        label = label.replace(/hh/i, h < 10 ? `0${h}` : h);
                    }

                    if (this.valueFormat.match(/mm/)){
                        m = this.pickerDate.getMinutes();
                        label = label.replace(/mm/, m < 10 ? `0${m}` : m);
                    }
                }
            }
            this.$emit('on-confirm', label || this.innerValue);
        },

        onChange(picker) {
            let values = picker.getValues();

            if (values[0] === '今天') {
                values[0] = new Date().getDate() + '';
                values.unshift(new Date().getMonth() + 1 + '');
            } else {
                let m = values[0].split('月');
                this.datetimeNextMonth = Number(m[0]) + 1;

                this.datetimePreMonth = this.datetimeNextMonth === 2 ? 12 : this.datetimeNextMonth - 2 ;
                values[0] = m[1];
                values.unshift(m[0]);
                if (!this.dateYearFlag) this.dateYearFlag = this.pickerDate.getMonth() + 1;
                if (Number(m[0]) === 1 && this.dateYearFlag === 12) {
                    this.datetimeYear ++;
                } else if (Number(m[0]) === 12 && this.dateYearFlag === 1) {
                    this.datetimeYear --;
                }
                this.dateYearFlag !== Number(m[0]) ? this.dateYearFlag = Number(m[0]) : '';
            }

            for (let i = 0; i < values.length; i++) {
                values[i] = values[i].replace(/['年', '月', '日']/g, '');
            }

            let value;
            if (this.range) {
                const month = getTrueValue(values[0]);
                const maxDate = getMonthEndDay(this.datetimeYear, month);
                let date = getTrueValue(values[1]);
                date = date > maxDate ? maxDate : date;

                let hrange = values[2].replace(' ', '');

                value = [new Date(this.datetimeYear, month - 1, date)].concat(hrange.split('-'));

            } else {
                const month = getTrueValue(values[0]);
                const maxDate = getMonthEndDay(this.datetimeYear, month);
                let date = getTrueValue(values[1]);
                date = date > maxDate ? maxDate : date;

                let hour, minute;

                if (this.halfFormat) {
                    hour = getTrueValue(values[3]);
                    minute = getTrueValue(values[4]);
                    if (values[2] === '下午') {
                        if(values[3] != '12') {
                            hour += 12;
                        }
                    } else {
                        if(values[3] === '12') {
                            hour -= 12;
                        }
                    }
                } else {
                    hour = getTrueValue(values[2]);
                    minute = getTrueValue(values[3]);
                }

                value = new Date(this.datetimeYear, month - 1, date, hour, minute);
            }

            value = this.correctValue(value);
            this.innerValue = value;
            this.$emit('on-change', picker);
        },

        updateColumnValue(value) {
            let values = [];

            if(!this.range) {
                if (this.halfFormat) {
                    values = [
                        `${isToday(this.datetimeYear, value.getMonth() + 1, value.getDate()) ?
                        '今天' : `${value.getMonth() + 1}月${value.getDate()}日 ${getWeekLable(value.getDay())}`}`,
                        `${value.getHours() > 11 ? this.halfFormat === 'am' ? '下午' : 'PM'
                            : this.halfFormat === 'am' ? '上午' : 'AM'}`,
                        `${value.getHours() > 13 ? value.getHours() - 12 : value.getHours()}`,
                        `0${value.getMinutes()}`.slice(-2)
                    ];
                } else {
                    values = [
                        `${isToday(this.datetimeYear, value.getMonth() + 1, value.getDate()) ?
                        '今天' : `${value.getMonth() + 1}月${value.getDate()}日 ${getWeekLable(value.getDay())}`}`,
                        `${value.getHours()}`,
                        `0${value.getMinutes()}`.slice(-2)
                    ];
                }
            } else {
                let date = value[0];
                let minH = value[1];
                let maxH = value[2];
                let range;
                let ranges = this.getTimeRange();
                if (!minH || !maxH) {
                    range = ranges[0];
                } else {
                    range = minH + ' - ' + maxH;
                    if (ranges.indexOf(range) === -1) {
                        range = ranges[0];
                        console.error('绑定时间段与设定的时间段不匹配');
                    }
                }
                values = [
                    `${isToday(this.datetimeYear, date.getMonth() + 1, date.getDate()) ?
                    '今天' : `${date.getMonth() + 1}月${date.getDate()}日 ${getWeekLable(date.getDay())}`}`,
                    range
                ];
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
