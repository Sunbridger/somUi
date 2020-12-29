import { format } from 'som-ui/src/utils/util';
import { throttle } from 'throttle-debounce';
import {zero, getMonthEndDay } from './util';


const today = format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'YYYY/MM/DD');
const endDay = getMonthEndDay(new Date().getFullYear() + 1, new Date().getMonth() + 1);
const defaultStart = format(new Date(new Date().getFullYear() - 1, new Date().getMonth(), endDay), 'YYYY/MM/DD');
const defaultEnd = format(new Date(new Date().getFullYear() + 1, new Date().getMonth(), endDay), 'YYYY/MM/DD');

export default {
    props: {
        value: {
            type: [String, Object],
            default: ''
        },
        startDate: {
            type: String,
            default: defaultStart
        },
        endDate: {
            type: String,
            default: defaultEnd
        },
        past: Boolean,
        isMultiple: Boolean,
        disablePast: Boolean,
        disableFuture: Boolean,
        disableWeekend: Boolean,
        disableDates: Array,
        renderDate: Function,
        beginDateClass: String,
        inDateClass: String,
        overDateClass: String,
        currentDateClass: String
    },
    data () {
        return {
            currentValue: '',
            rangeVal: {},
            multi: false,
            year: 0,
            month: 0,
            yearMothList: [],
            yearMoth: [],
            lastYearMoth: '',
            currentYearMonth: '',
            currentDate: '',
            today: format(new Date(), 'YYYY/MM/DD'),
            bYearMonth: '',
            bDate: '',
            eYearMonth: '',
            eDate: '',
            startx: '',
            starty: '',
            endx: '',
            endy: '',
            scrollMore: false,
            delta: 0,
            screenHeight: window.screen.height,
            inday: [],
            addNoMore: false,
            isChange: '',
            scroll: false
        };
    },
    created () {
        this.setCurrentVal(this.value);
        this.yearMothList = this.getYearMonthsList();
        this.initalYearMonth();
        this._throttle = throttle(800, () => {
            this.getYearMonths();
        });
    },
    mounted () {
        this.$el.addEventListener('scroll', this.handleScroll, false);
        this.$emit('mounted');
    },
    watch: {
        inday (val) {
            let dateLength = new Date(this.rangeVal.overDate) - new Date(this.rangeVal.beginDate);
            dateLength /= (1000 * 3600 * 24);
            dateLength += 1;
            if (dateLength > val.length && this.isChange) {
                if (this.isChange === 'yes') {
                    this.rangeVal.beginDate = this.rangeVal.beginDate;
                } else {
                    this.rangeVal.beginDate = this.rangeVal.overDate;
                }
                this.rangeVal.overDate = '';
                this.inday = [];
            } else {
                this.$parent.inday = val;
            }
            this.isChange = '';
        },
        value (val) {
            this.setCurrentVal(val);
        },
        startDate () {
            this.yearMothList = this.getYearMonthsList();
            this.initalYearMonth();
        },
        endDate () {
            this.yearMothList = this.getYearMonthsList();
            this.initalYearMonth();
        },
        currentValue (val) {
            if (!val) val = today;
            this.currentYearMonth = val.slice(0, 7);
            this.currentDate = Number(val.slice(8, 10));
        },
        rangeVal: {
            handler (val) {
                if (val.beginDate) {
                    this.bYearMonth = val.beginDate.slice(0, 7) || '';
                    this.bDate = Number(val.beginDate.slice(8, 10)) || '';
                } else {
                    this.bYearMonth = '';
                    this.bDate = '';
                }
                if (val.overDate) {
                    this.eYearMonth = val.overDate.slice(0, 7) || '';
                    this.eDate = Number(val.overDate.slice(8, 10)) || '';
                } else {
                    this.eYearMonth = '';
                    this.eDate = '';
                }
                this.$emit('input', val);
                this.$emit('on-change', val);
            },
            deep: true
        }
    },
    render (h) {
        return (
            <div class="som-calebdar__date-wrap"
                on-touchstart={$event => this.touchStart($event)}
                on-touchmove={$event => this.touchMove($event)}
                on-touchcancel={this.touchEnd}
                on-touchend={this.touchEnd}>
                <div ref="dateBody" class="date-body">
                    { this._l(this.yearMoth, (month) => {
                        let days = this.getDays(month);
                        return (
                            <div >
                                <p class="som-calendar__month-title">{month.replace('/', '年') + '月'}</p>
                                { this._l(days, (day) => {
                                    return (
                                        <div class="som-calendar__date">
                                            { this._l(day, (child, k2) =>
                                                this.renderDay(h, child, k2, month)
                                            ) }
                                        </div>
                                    );
                                }) }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    },
    methods: {
        renderDay (h, child, k2, month) {
            let { getInDate, getDateDisabled, getDisableCustom, bYearMonth, bDate, eYearMonth, eDate,
                beginDateClass, overDateClass, inDateClass, currentDateClass, handleSelect, currentDate,
                isMultiple, currentYearMonth, renderDate } = this;

            let istoday = month === this.today.slice(0, 7) && child === Number(this.today.slice(8, 10));

            return (
                child && <div
                    class={[
                        'som-calendar__date-each',
                        month === bYearMonth && child === bDate ? beginDateClass : '',
                        getInDate(month, child, k2) ? inDateClass : '',
                        month === eYearMonth && child === eDate ? overDateClass : '',
                        getDateDisabled(month, child, k2) || getDisableCustom(month, child).disabled ? 'disabled-date' : ''
                    ]}>
                    <span
                        on-click={() => handleSelect(month, child, k2)}
                        class={[
                            month === currentYearMonth && child === currentDate && !isMultiple ? currentDateClass : '',
                            istoday ? 'today' : ''
                        ]}>
                            { renderDate && renderDate(h, month, istoday ? '今天' : child)}
                            { !renderDate ? istoday ? '今天' : child : '' }
                            { !renderDate && (getDisableCustom(month, child).txt)
                                ? <sup> { getDisableCustom(month, child).txt } </sup> : ''
                            }
                    </span>
                </div>
            );
        },
        setCurrentVal(val) {
            if (!this.isMultiple) {
                this.currentValue = val;
                this.currentDate = val ? Number(val.slice(8, 10)) : '';
                this.currentYearMonth = val ? val.slice(0, 7) : '';
            } else {
                this.rangeVal = this.value || {beginDate: '', overDate: ''};
            }
        },
        testDate (str) {
            let reg = /^\d{4}[\/\d{2}]+$/; //eslint-disable-line
            return reg.test(str);
        },
        renderView () {
            let sdate = this.currentValue || this.rangeVal.beginDate;
            let currentYearMonth = sdate.slice(0, 7);
            let index = this.yearMothList.indexOf(currentYearMonth) === -1 ? 0 : this.yearMothList.indexOf(currentYearMonth);
            this.yearMoth = [];
            this.yearMoth = this.yearMothList.slice(index, this.$el.scrollTop > 0 ? index + 1 : index + 2);
            this.lastYearMoth = this.yearMoth[this.yearMoth.length - 1];
        },
        getYearMonthsList () {
            let list = [];
            let sdate = this.startDate;
            let edate = this.endDate;
            if (!sdate) sdate = today;
            if (!this.testDate(sdate)) {
                console.error('起始日期格式错误，应为 yyyy/mm/dd 格式, 至少输入到月份');
                return;
            }

            if (!edate) edate = defaultEnd;
            if (!this.testDate(edate)) {
                console.error('结束日期格式错误，应为 yyyy/mm/dd 格式, 至少输入到月份');
                return;
            }

            if (sdate > edate) {
                console.error('结束日期大于开始日期了');
                return;
            }

            let sy = this.getYear(sdate);
            let ey = this.getYear(edate);
            let sm = this.getMonth(sdate);
            let em = this.getMonth(edate);
            while (sy + '/' + zero(sm) <= ey + '/' + zero(em)) {
                list.push(sy + '/' + zero(sm));
                sm++;
                sm === 13 ? sy += 1 : '';
                sm === 13 ? sm = 1 : '';
            }

            if (this.past) list.reverse();
            return list;
        },
        initalYearMonth () {
            let sdate = this.currentValue || this.rangeVal.beginDate || this.rangeVal.overDate || today;
            let currentYearMonth = sdate.slice(0, 7);
            let index = this.yearMothList.indexOf(currentYearMonth) === -1 ? 0 : this.yearMothList.indexOf(currentYearMonth);
            this.yearMoth = this.yearMothList.slice(index, index + 6);
            this.lastYearMoth = this.yearMoth[this.yearMoth.length - 1];
        },
        getInDate (month, date, day) {
            if (!date) return false;
            if (!this.rangeVal.overDate || !this.rangeVal.beginDate) return false;
            let ymd = `${month}/${zero(date)}`;
            if (ymd >= this.rangeVal.beginDate.slice(0, 10)
                && ymd <= this.rangeVal.overDate
                && !this.getDateDisabled(month, date, day)
                && !this.getDisableCustom(month, date).disabled) {
                if (this.inday.indexOf(ymd) === -1) {
                    this.inday.push(ymd);
                }
                return true;
            } else {
                if (this.inday.indexOf(ymd) !== -1) {
                    this.inday.splice(this.inday.indexOf(ymd), 1);
                }
                return false;
            }
        },
        getYear (month) {
            return Number(month.split('/')[0]);
        },
        getMonth(month) {
            return Number(month.split('/')[1]);
        },
        getDays(month) {
            let year = this.getYear(month);
            let m = this.getMonth(month);
            let monthEndDay = getMonthEndDay(year, m);
            let day = new Date(year, m - 1, 1).getDay();
            let days = [];
            days[0] = [];

            for (let i = 0; i < day; i++) {
                days[0].push('');
            }
            for (let j = 1; j <= monthEndDay; j++) {
                if ((j + day) % 7 === 0) {
                    days[parseInt((j + day) / 7 - 1)].push(j); //eslint-disable-line
                    days[parseInt((j + day) / 7)] = [];
                } else {
                    days[parseInt((j + day) / 7)].push(j);
                }
            }

            if (days[days.length - 1].length < 7 && days[days.length - 1].length !== 0) {
                let len = 7 - days[days.length - 1].length;
                for (let i = 0; i < len; i++) {
                    days[days.length - 1].push('');
                }
            }
            return days;
        },
        getYearMonths () {
            let index = this.yearMothList.indexOf(this.lastYearMoth);
            let one = this.yearMothList[index + 1];
            let two = this.yearMothList[index + 2];
            one ? this.yearMoth.push(one) : '';
            two ? this.yearMoth.push(two) : '';
            two || one ? this.lastYearMoth = two || one : '';
        },
        getPreYearMonths () {
            let index = this.yearMothList.indexOf(this.yearMoth[0]);
            index !== 0 ? this.yearMoth.unshift(this.yearMothList[index - 1]) : '';
        },
        getDateDisabled (month, date, day) {
            let ymd = `${month}/${zero(date)}`;

            let sdate = this.startDate || today;
            let edate = this.endDate || defaultEnd;

            if (ymd < sdate && sdate.length > 7) {
                return true;
            }
            if (ymd > edate && edate.length > 7) {
                return true;
            }

            if (!date || date === '0') {
                return true;
            }

            if (this.disablePast) {
                if (ymd < this.today) {
                    return true;
                }
            }
            if (this.disableFuture) {
                if (ymd > this.today) {
                    return true;
                }
            }

            if (this.disableWeekend) {
                if (day === 0 || day === 6) {
                    return true;
                }
            }

            return false;
        },
        getDisableCustom (month, date) {
            let ymd = `${month}/${zero(date)}`;
            if (this.disableDates) {
                for (let item of this.disableDates) {
                    for (let i in item) {
                        if (ymd === i) {
                            return {disabled: true, txt: item[i]};
                        }
                    }
                }
            }
            return {};
        },
        touchStart (evt) {
            this.starty = evt.touches[0].screenY;
            this.delta = 0;
        },
        touchMove (evt) {
            var ele = evt.currentTarget;
            var isReachTop = ele.scrollTop === 0;
            if (isReachTop) {
                this.delta = evt.touches[0].screenY - this.starty;
                if (this.delta > 0) {
                    evt.preventDefault();
                    if (this.delta > 80) {
                        this.delta = 80;
                    }
                } else {
                    this.delta = 0;
                }
                this.$refs.dateBody.style.transform = 'translate3d(0,' + this.delta + 'px,0)';
            }
        },
        touchEnd () {
            if (this.delta > 40 && this.yearMoth[0] > this.yearMothList[0]) {
                this.getPreYearMonths();
            }

            this.$refs.dateBody.style.transform = 'translate3d(0,' + this.delta + 'px,0)';
            this.$refs.dateBody.style.transition = '.3s';
            setTimeout(() => {
                this.$refs.dateBody.style = '';
            }, 300);
        },
        handleScroll () {
            this.addNoMore = this.lastYearMoth === this.yearMothList[this.yearMothList.length - 1];
            if (!this.addNoMore) {
                this._throttle();
            }
        },
        handleSelect (month, date, day) {
            let y = this.getYear(month);
            let m = this.getMonth(month);
            let d = date;
            date = zero(date);
            let ymd = month + '/' + date;

            if (this.getDateDisabled(month, d, day) || this.getDisableCustom(month, d).disabled) {
                return;
            }

            if (!this.isMultiple) {
                this.currentValue = ymd;
                this.$emit('input', this.currentValue);
            } else {
                let begin = this.rangeVal.beginDate;
                let over = this.rangeVal.overDate;
                if (begin && over) {
                    begin = ymd;
                    over = '';
                } else if (!begin && !over) {
                    begin = ymd;
                } else if (!begin && over) {
                    if (ymd > over) {
                        begin = over;
                        over = ymd;
                    } else {
                        begin = ymd;
                    }
                } else {
                    let by = this.getYear(this.rangeVal.beginDate);
                    let bm = this.getMonth(this.rangeVal.beginDate);
                    let bd = Number(this.rangeVal.beginDate.slice(8, 10));
                    if (by < y || (by === y && bm < m) || (by === y && bm === m && bd < d)) {
                        over = ymd;
                        this.isChange = 'no';
                    } else {
                        this.isChange = 'yes';
                        over = begin;
                        begin = ymd;
                    }
                }
                this.rangeVal = {
                    beginDate: begin || '',
                    overDate: over || ''
                };
            }
        }
    },
    destroy () {
        this.$el.removeEventListener('scroll', this.handleScroll, false);
    }

};
