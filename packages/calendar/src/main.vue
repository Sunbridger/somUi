<template>
    <transition name="som-calendar-animate-bottom">
        <div class="som-calendar" ref="calendar" :style="styles" v-show="show" :class="show ? 'som-calendar-show' : ''">
            <div v-if="showToolbar" ref="toolbar" class="som-calendar__toolbar-wrap">
                <slot name="toolbar">
                    <div class="som-calendar__toolbar">
                        <div class="som-calendar__cancel" @click="handleCancel">{{ cancelButtonText || '取消' }}</div>
                        <div class="som-calendar__title som-ellipsis">{{ isTime ? '选择时间' : '选择日期' }}</div>
                        <div class="som-calendar__confirm"
                             :class="disableConfirm && 'disable'"
                            @click="handleConfirm">{{ confirmButtonText || '完成' }}
                        </div>
                    </div>
                </slot>
            </div>

            <div class="som-calendar__result" v-if="isMultiple && showResult" ref="result">
                <div>
                    <input :placeholder="isTime ? '开始时间' : '开始日期'" :value="bDateStr" readonly onfocus="this.blur()" />
                    <span class="time-txt" v-if="isTime && btime" @click="showBTime = true;">
                        {{ (btime < '12'  ? '上午: ' : '下午: ') + btime }}<i class="som-icon-arrow-right" />
                    </span>
                    
                </div>
                <span class="range-length" v-if="dateVal.overDate">
                    <div>{{dayNum}}天</div>
                </span>
                <div>
                    <input :placeholder="isTime ? '结束时间' : '结束日期'" :value="eDateStr" class="end-input" readonly onfocus="this.blur()"/>
                    <span class="time-txt" v-if="isTime && etime" @click="showETime = true">
                        {{ (etime < '12'  ? '上午: ' : '下午: ') + etime }}<i class="som-icon-arrow-right" />
                    </span>
                </div>
            </div>
            <div class="som-calendar__result" v-else-if="showResult" ref="result">
                <div>
                    <input :placeholder="isTime ? '选择时间' :'选择日期'" :value="dateStr" readonly onfocus="this.blur()" />
                    <span class="time-txt" v-if="isTime && btime" @click="showBTime = true;">
                        {{ (btime < '12'  ? '上午: ' : '下午: ') + btime }}<i class="som-icon-arrow-right" />
                    </span>
                </div>
            </div>
            <div class="som-calendar__week" :class="weekClass" ref="week">
                <div v-for="(week, index) in weeksList" :key="index">{{week}}</div>
            </div>

            <date-table
                ref="datebody"
                @mounted="datebody = true"
                v-model="dateVal"
                :startDate="startDate"
                :past="past"
                :endDate="endDate"
                :isMultiple="isMultiple"
                :disablePast="disablePast"
                :disableFuture="disableFuture"
                :disableWeekend="disableWeekend"
                :disableDates="disableDates"
                :beginDateClass="beginDateClass"
                :inDateClass="inDateClass"
                :overDateClass="overDateClass"
                :renderDate="renderDate"
                :currentDateClass="currentDateClass">
            </date-table>
            
            <div class="som-calendar__shortcut" v-if="shortcuts && datebody">
                <span
                    :class="['shortcut-button', getShortDisable(shortcut.value(), index) ? 'disable': '']"
                    v-for="(shortcut, index) in shortcuts"
                    @click="handleShortcutClick(index)"
                    :key="index">
                    {{ shortcut.text }}
                </span>
            </div>

            <div class="som-calebdar__footer">
                <slot name="footer"></slot>
            </div>

            <som-popup 
                v-model="showBTime"
                :hide-on-blur="false"
                v-transfer-dom 
                v-if="isTime">
               <som-time-picker
                    :title="beginTimeTitle"
                    v-model="bPickTime"
                    :minute-step="minuteStep"
                    :min-hour="minHour"
                    :max-hour="maxHour"
                    halftime
                    @on-confirm="selectBTime"
                    @on-cancel="cancelTime">
                </som-time-picker>
            </som-popup>
            <som-popup v-model="showETime" v-transfer-dom v-if="isMultiple && isTime" :hide-on-blur="false">
                <som-time-picker
                    :title="endTimeTitle"
                    v-model="ePickTime"
                    halftime
                    :minute-step="minuteStep"
                    :min-hour="minHour"
                    :max-hour="maxHour"
                    @on-confirm="selectETime"
                    @on-cancel="cancelTime(false)">
                </som-time-picker>
            </som-popup>

        </div>
    </transition>
</template>

<script>
import { format } from 'som-ui/src/utils/util';
import TransferDom from 'som-ui/src/directives/transfer-dom';
import DateTable from './date-table';
import './main.css';

export default {
    name: 'SomCalendar',
    directives: {
        TransferDom
    },
    props: {
        value: {
            type: [String, Object],
            default: ''
        },
        show: Boolean,
        past: Boolean,
        startDate: String,
        endDate: String,
        weeksList: {
            type: Array,
            validator (val) {
                if (val) {
                    return val.length === 7 || val.length === 0;
                }
                return true
            },
            default () {
                return ['日', '一', '二', '三', '四', '五', '六'];
            }
        },
        weekClass: String,
        showResult: {
            type: Boolean,
            default: true
        },
        showToolbar: {
            type: Boolean,
            default: true
        },
        isMultiple: Boolean,
        isTime: Boolean,
        minuteStep: {
            type: Number,
            default: 5
        },
        minHour: {
            type: Number,
            default: 0
        },
        maxHour: {
            type: Number,
            default: 23
        },
        disablePast: Boolean,
        disableFuture: Boolean,
        disableWeekend: Boolean,
        disableDates: Array,
        renderDate: Function,
        cancelButtonText: String,
        confirmButtonText: String,
        beginDateClass: {
            type: String,
            default: 'begin-date'
        },
        inDateClass: {
            type: String,
            default: 'in-date'
        },
        overDateClass: {
            type: String,
            default: 'over-date'
        },
        currentDateClass: {
            type: String,
            default: 'current-date'
        },
        height: String,
        shortcuts: Array,
        defaultTime: {
            type: Array,
            default() {
                return ['08:00', '17:00']
            }
        }
    },
    components: {
        DateTable
    },
    data () {
        return {
            dateVal: this.value,
            inday: [],
            datebody: false,
            showBTime: false,
            showETime: false,
            btime: '',
            etime: '',
            bPickTime: this.defaultTime[0],
            ePickTime: this.defaultTime[1],
        }
    },
    created () {
        if (this.isTime) {
            if (this.isMultiple && this.dateVal.beginDate) this.btime = this.dateVal.beginDate.slice(11, 16);
            if (!this.isMultiple && this.dateVal) this.btime = this.dateVal.slice(11, 16);
            if (this.isMultiple && this.dateVal.overDate) this.etime = this.dateVal.overDate.slice(11, 16);
        }
    },
    watch: {
        value (val) {
            this.$emit('on-change', val);
            this.dateVal = this.value;
            this.correctTime();
        },
        dateVal: {
            handler (val) {
                if (!this.show) return;
                this.btime = '';
                this.etime = '';
                if (val && !this.isMultiple && this.isTime) {
                    this.showBTime = true;
                }
                if (val.overDate && this.isMultiple && this.isTime) {
                    this.btime = this.defaultTime[0];
                    this.etime = this.defaultTime[1];
                }
            },
            deep: true
        },
        btime (val) {
            if (val) {
                this.bPickTime = val;
            } else {
                this.bPickTime = this.defaultTime[0];
            }
        },
        etime (val) {
            if (val) {
                this.ePickTime = val;
            } else {
                this.ePickTime = this.defaultTime[1];
            }
        }
    },
    computed: {
        styles () {
            if (this.height) {
                return { 'height': this.height };
            }
        },
        disableConfirm () {
            if (this.isMultiple) {
                return !this.dateVal.overDate;
            }
            return !this.dateVal;
        },
        dayNum () {
            if (this.inday.length) {
                return this.inday.length;
            }
            if (this.dateVal || this.dateVal.beginDate) {
                return 1;
            }
            return 0;
        },
        beginTimeTitle () {
            if (this.isMultiple) {
                return `开始时间: ${this.bDateStr}`;
            }
            return `选择日期: ${this.dateStr}`;
        },
        endTimeTitle () {
            return `结束时间: ${this.eDateStr}`;
        },
        dateStr () {
            if (!this.isMultiple && this.dateVal) return this.dateVal.slice(0, 10);
            return '';
        },
        bDateStr () {
            if (this.isMultiple && this.dateVal.beginDate) return this.dateVal.beginDate.slice(0, 10);
            return '';
        },
        eDateStr () {
            if (this.isMultiple && this.dateVal.overDate) return this.dateVal.overDate.slice(0, 10);
            return '';
        }
     },
    methods: {
        getDate (date) {
            if (!date) return '';

        },
        correctTime () {
            if (this.isTime) {
                if (this.isMultiple) this.btime = this.dateVal.beginDate && this.dateVal.beginDate.slice(11, 16) || '';
                if (!this.isMultiple) this.btime = this.dateVal && this.dateVal.slice(11, 16) || '';
                if (this.isMultiple) this.etime = this.dateVal.overDate && this.dateVal.overDate.slice(11, 16) || '';
            }
        },
        handleShortcutClick(index) {
            let val = this.shortcuts[index].value();

            if (this[`shortcut${index}`]) return;
            if (!this.isMultiple) {
                let value = format(val, 'YYYY/MM/DD');
                this.dateVal = value;
                this.$nextTick(()=> {
                    this.$refs.datebody.renderView();
                })
            } else {
                let beginDate = format(val[0], 'YYYY/MM/DD');
                let overDate = format(val[1], 'YYYY/MM/DD');
                // this.dateVal.beginDate = beginDate;
                this.dateVal = { beginDate, overDate };
                // this.dateVal = '';
                setTimeout(() => {
                    this.$refs.datebody.renderView();
                }, 100);
            }
        },
        getShortDisable (val, index) {
            if (!val) {
                console.error('请配置快捷选项的选项值');
                return true;
            }

            if (this.isMultiple) {
                let bdate = format(val[0], 'YYYY/MM/DD');
                let edate = format(val[1], 'YYYY/MM/DD');
                this[`shortcut${index}`] = this.getDisableDate(bdate, val[0]) || this.getDisableDate(edate, val[1]);
                return this[`shortcut${index}`];

            } else {
                let value = format(val, 'YYYY/MM/DD');
                this[`shortcut${index}`] = this.getDisableDate(value, val);
                return this[`shortcut${index}`];
            }
        },
        getDisableDate(value, val) {
            let month = value.slice(0, 7);
            let child = Number(value.slice(8, 10));
            let k2 = val.getDay();
            return this.$refs.datebody.getDateDisabled(month, child, k2) ||
                this.$refs.datebody.getDisableCustom(month, child).disabled;
        },
        selectBTime (val) {
            if (val > this.etime && this.etime) {
                this.btime = this.etime;
                this.etime = val;
            } else {
                this.btime = val;
            }
            this.showBTime = false;
        },
        selectETime (val) {
            if (val < this.btime) {
                this.etime = this.btime;
                this.btime = val;
            } else {
                this.etime = val;
            }
            this.showETime = false;
        },
        handleConfirm () {
            if (this.disableConfirm) return;

            if (!this.isTime) {
                this.$emit('input', this.dateVal);
                this.$emit('update:show', false);
                this.$emit('on-confirm', this.dateVal);
                return;
            }

            let val;
            if (this.isMultiple) {
                val = {
                    beginDate: this.bDateStr + ' ' + this.btime,
                    overDate: this.eDateStr + ' ' + this.etime
                }
                this.$emit('on-confirm', this.dateVal, this.inday);
            } else {
                val = this.dateStr + ' ' + this.btime;
                this.$emit('on-confirm', this.dateVal);
            }
            this.$emit('update:show', false);
            if (JSON.stringify(val) === JSON.stringify(this.dateVal)) return;
            this.$emit('input', val);
        },
        handleCancel () {
            this.$emit('update:show', false);
            this.$emit('on-cancel');
            this.dateVal = this.value;
            this.correctTime();
        },
        cancelTime (begin = true) {
            if (!this.btime) this.dateVal = '';
            if (!begin && !this.etime) this.dateVal = '';
            this.showBTime = false;
            this.showETime = false;
        }
    }
};
</script>
