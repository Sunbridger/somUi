import Vue from 'vue';
import Calendar from 'packages/calendar';
import { createVue, destroyVM, triggerEvent } from '../../util';

Vue.use(Calendar);
describe('Calendar', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('week-lists', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    start-date="2018/02/01"
                    end-date="2018/02/28"
                    :weeks-list="weeklist"
                    :show="true"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '',
                    weeklist: ['0', '1', '2', '3', '4', '5', '6']
                };
            }
        }, true);
        setTimeout(() => {
            let weekday = vm.$el.querySelectorAll('.som-calendar__week div')[5];
            expect(weekday.textContent).to.equal('5');
            done();
        }, 200);
    });

    it('value', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :show="true"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let date = vm.$el.querySelectorAll('.som-calendar__date-each span')[5];
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            date.click();
            confirm.click();
            setTimeout(() => {
                expect(vm.value).to.equal('2018/04/06');
                done();
            }, 200);
        }, 200);
    });

    it('start-date', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :start-date="sd"
                    :end-date="ed"
                    :show="true">
                </som-calendar>
                `,
            data () {
                return {
                    sd: '',
                    ed: ''
                };
            }
        }, true);
        setTimeout(() => {
            vm.sd = '2017/09/20';
            vm.ed = '2017/12/22';
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-calendar__month-title')[0].textContent).to.equal('2017年09月');
                done();
            }, 200);
        }, 200);
    });

    it('disable-past', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :disable-past="true"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let date = vm.$el.querySelectorAll('.som-calendar__date-each')[5];
            expect(date.classList.contains('disabled-date')).to.true;
            done();
        }, 200);
    });

    it('disable-futrue', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    :disable-future="true"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let nextMonthweekday = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getDay();
            let nexMonth = vm.$el.querySelectorAll('.date-body > div')[1];
            let nextdate = nexMonth.querySelectorAll('.som-calendar__date-each')[nextMonthweekday];
            expect(nextdate.classList.contains('disabled-date')).to.true;
            nextdate.querySelector('span').click();
            setTimeout(() => {
                expect(vm.value).to.equal('');
                done();
            }, 200);
        }, 200);
    });

    it('disable-weekend', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :disable-weekend="true"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let date = vm.$el.querySelectorAll('.som-calendar__date-each')[0];
            expect(date.classList.contains('disabled-date')).to.true;
            done();
        }, 200);
    });

    it('disable-custom', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :disable-dates="disableDates"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '',
                    disableDates: [
                        {'2018/04/06': '清明'},
                        {'2018-04-26': '满'}
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            let date = vm.$el.querySelectorAll('.som-calendar__date-each')[5];
            expect(date.classList.contains('disabled-date')).to.true;
            done();
        }, 200);
    });

    it('is-multiple', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    is-multiple
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: {beginDate: '', overDate: ''}
                };
            }
        }, true);
        setTimeout(() => {
            let date6 = vm.$el.querySelectorAll('.som-calendar__date-each span')[5];
            let date11 = vm.$el.querySelectorAll('.som-calendar__date-each span')[10];
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            date6.click();
            setTimeout(() => {
                date11.click();
                setTimeout(() => {
                    confirm.click();
                    setTimeout(() => {
                        expect(vm.value.beginDate).to.equal('2018/04/06');
                        expect(vm.value.overDate).to.equal('2018/04/11');
                        done();
                    }, 200);
                }, 10);
            }, 10);
        }, 200);
    });

    it('is-multiple disable', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :disable-weekend="true"
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    is-multiple
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: {beginDate: '', overDate: ''}
                };
            }
        }, true);
        setTimeout(() => {
            let date6 = vm.$el.querySelectorAll('.som-calendar__date-each span')[5];
            let date11 = vm.$el.querySelectorAll('.som-calendar__date-each span')[10];
            let date12 = vm.$el.querySelectorAll('.som-calendar__date-each span')[11];
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            date6.click();
            setTimeout(() => {
                date11.click();
                setTimeout(() => {
                    date12.click();
                    setTimeout(() => {
                        confirm.click();
                        expect(vm.value.beginDate).to.equal('2018/04/11');
                        expect(vm.value.overDate).to.equal('2018/04/12');
                        done();
                    }, 50);
                }, 50);
            }, 50);
        }, 200);
    });

    it('on-confirm', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    @on-confirm="onConfirm"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '2018/04/12',
                    val: ''
                };
            },
            methods: {
                onConfirm (vals) {
                    this.val = vals;
                }
            }
        }, true);
        setTimeout(() => {
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            confirm.click();
            setTimeout(() => {
                expect(vm.val).to.equal(vm.value);
                done();
            }, 200);
        }, 200);
    });

    it('on-cancel', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    @on-cancel="onCancel"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '2018/04/12',
                    val: false
                };
            },
            methods: {
                onCancel () {
                    this.val = true;
                }
            }
        }, true);
        setTimeout(() => {
            let cancel = vm.$el.querySelector('.som-calendar__cancel');
            cancel.click();
            setTimeout(() => {
                expect(vm.val).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('height', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    ref="calendar"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    height="400px"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '2018/04/12'
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.height).to.equal('400px');
            done();
        }, 200);
    });

    it('shortcuts', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    ref="calendar"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :shortcuts="shortcuts"
                    height="400px"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '2018/04/12',
                    shortcuts: [
                        {
                            text: '2018/04/10',
                            value: () => {
                                return new Date(2018, 3, 10);
                            }
                        }
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            let short = vm.$el.querySelector('.shortcut-button');
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            expect(vm.$el.querySelector('.shortcut-button').textContent.indexOf('2018/04/10')).not.equal(-1);
            short.click();
            setTimeout(() => {
                confirm.click();
                setTimeout(() => {
                    expect(vm.value).to.equal('2018/04/10');
                    done();
                }, 50);
            }, 50);
        }, 200);
    });

    it('shortcuts multipe', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    ref="calendar"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :shortcuts="shortcuts"
                    height="400px"
                    is-multiple
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '2018/04/12',
                    shortcuts: [
                        {
                            text: '昨两天',
                            value: () => {
                                return [new Date(2018, 3, 10), new Date(2018, 3, 11)];
                            }
                        }
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            let short = vm.$el.querySelector('.shortcut-button');
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            expect(short.textContent.indexOf('昨两天')).not.equal(-1);
            short.click();
            setTimeout(() => {
                confirm.click();
                setTimeout(() => {
                    expect(vm.value.beginDate).to.equal('2018/04/10');
                    expect(vm.value.overDate).to.equal('2018/04/11');
                    done();
                }, 50);
            }, 50);
        }, 200);
    });

    it('is-time', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    ref="calendar"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    :is-time="true"
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: '2018/04/12 03:22'
                };
            }
        }, true);
        setTimeout(() => {
            let timetxt = vm.$el.querySelector('.time-txt');
            expect(vm.$el.querySelector('.time-txt').textContent.indexOf('03:22')).not.equal(-1);
            triggerEvent(timetxt, 'click');
            setTimeout(() => {
                expect(document.querySelector('.som-popup-mask').classList.contains('som-popup-show')).to.be.true;
                let timeConfirm = document.querySelector('.som-picker__confirm');
                timeConfirm.click();
                setTimeout(() => {
                    expect(document.querySelector('.som-popup-mask').classList.contains('som-popup-show')).to.be.false;
                    done();
                }, 100);
            }, 200);
        }, 20);
    });

    it('is-multiple is-time', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    is-multiple
                    is-time
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: {beginDate: '', overDate: ''}
                };
            }
        }, true);
        setTimeout(() => {
            let date6 = vm.$el.querySelectorAll('.som-calendar__date-each span')[5];
            let date11 = vm.$el.querySelectorAll('.som-calendar__date-each span')[10];
            let confirm = vm.$el.querySelector('.som-calendar__confirm');
            date6.click();
            setTimeout(() => {
                date11.click();
                setTimeout(() => {
                    confirm.click();
                    expect(vm.value.beginDate).to.equal('2018/04/06 08:00');
                    expect(vm.value.overDate).to.equal('2018/04/11 17:00');
                    let beginDatePicker = document.querySelectorAll('.som-time-picker')[1];
                    beginDatePicker.querySelectorAll('ul')[0].querySelectorAll('li')[1].click();
                    beginDatePicker.querySelector('.som-picker__confirm').click();
                    confirm.click();
                    setTimeout(() => {
                        expect(vm.value.overDate).to.equal('2018/04/11 20:00');
                        let endDatePicker = document.querySelectorAll('.som-time-picker')[2];
                        endDatePicker.querySelectorAll('ul')[0].querySelectorAll('li')[0].click();
                        setTimeout(() => {
                            endDatePicker.querySelectorAll('ul')[1].querySelectorAll('li')[0].click();
                            setTimeout(() => {
                                endDatePicker.querySelector('.som-picker__confirm').click();
                                confirm.click();
                                setTimeout(() => {
                                    expect(vm.value.beginDate).to.equal('2018/04/06 00:00');
                                    done();
                                }, 50);
                            }, 40);
                        }, 10);
                    }, 50);
                }, 50);
            }, 10);
        }, 200);
    });

    it('is-multiple disable', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show="true"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    is-time
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-calendar__confirm').classList.contains('disable')).to.true;
            done();
        }, 200);
    });


    it('cancel time', (done) => {
        vm = createVue({
            template: `
                <som-calendar
                    :show.sync="show"
                    start-date="2018/04/01"
                    end-date="2018/04/30"
                    is-multiple
                    is-time
                    v-model="value">
                </som-calendar>
                `,
            data () {
                return {
                    show: true,
                    value: {beginDate: '', overDate: ''}
                };
            }
        }, true);
        setTimeout(() => {
            let date6 = vm.$el.querySelectorAll('.som-calendar__date-each span')[5];
            date6.click();
            setTimeout(() => {
                document.querySelectorAll('.som-picker__cancel')[3].click();
                setTimeout(() => {
                    expect(vm.$el.querySelector('.som-calendar__confirm').classList.contains('disable')).to.true;
                    date6.click();
                    setTimeout(() => {
                        document.querySelectorAll('.som-picker__confirm')[3].click();
                        setTimeout(() => {
                            let confirm = vm.$el.querySelector('.som-calendar__confirm');
                            confirm.click();
                            setTimeout(() => {
                                expect(vm.show).to.be.false;
                            }, 50);
                        }, 50);
                    }, 50);
                    done();
                }, 50);
            });
        }, 200);
    });
});

