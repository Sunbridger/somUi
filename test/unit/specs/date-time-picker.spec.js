import { createVue, destroyVM } from '../util';

describe('DataTimePicker', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('datetime', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    v-model="currentDate"
                    @on-change="change"
                    @on-confirm="onConfirm">
                </som-date-time-picker>
            `,
            data () {
                return {
                    currentDate: new Date(),
                    picker: '',
                    datetime: '',
                    hour: ''
                };
            },
            methods: {
                change (picker) {
                    this.picker = picker;
                },
                onConfirm (val) {
                    this.hour = val.getHours();
                    this.datetime = `${val.getFullYear()}年${val.getMonth() + 1}月${val.getDate()}日${val.getHours()}:${val.getMinutes()}`;
                }
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns.length).to.equal(4);
            columns[1].querySelectorAll('li')[1].click();
            columns[1].querySelectorAll('li')[0].click();
            setTimeout(() => {
                let vals = vm.picker.getValues();
                expect(vals[0]).to.equal('今天');
                expect(vals[1]).to.equal('上午');
                let confirm = vm.$el.querySelector('.som-picker__confirm');
                confirm.click();
                setTimeout(() => {
                    vm.currentDate = new Date(2018, 2, 29);
                    setTimeout(() => {
                        columns[1].querySelectorAll('li')[1].click();
                        confirm.click();
                        setTimeout(() => {
                            expect(vm.datetime).to.equal('2018年3月29日12:0');
                            done();
                        }, 400);
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    });

    it('yearchange', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    v-model="currentDate"
                    @on-change="change"
                    @on-confirm="onConfirm"
                    :min-date="minDate"
                    :max-date="maxDate">
                </som-date-time-picker>
            `,
            data () {
                return {
                    currentDate: new Date(2018, 11, 30),
                    minDate: new Date(2018, 11, 29),
                    maxDate: new Date(2019, 0, 3),
                    picker: '',
                    datetime: '',
                    year: ''
                };
            },
            methods: {
                change (picker) {
                    this.picker = picker;
                },
                onConfirm (val) {
                    this.year = val.getFullYear();
                    this.datetime = `${val.getFullYear()}年${val.getMonth() + 1}月${val.getDate()}日${val.getHours()}:${val.getMinutes()}`;
                }
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            let nextYear = columns[0].querySelectorAll('li')[3];
            nextYear.click();
            let confirm = vm.$el.querySelector('.som-picker__confirm');
            confirm.click();
            setTimeout(() => {
                expect(vm.year).to.equal(2019);
                let preYear = columns[0].querySelectorAll('li')[0];
                preYear.click();
                confirm.click();
                setTimeout(() => {
                    expect(vm.year).to.equal(2018);
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('nohalf', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    format="yyyy-MM-dd hh mm">
                </som-date-time-picker>
            `
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns.length).to.equal(3);
            done();
        }, 200);
    });

    it('mindate, maxdate', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    v-model="currentDate"
                    :min-date="minDate"
                    :max-date="maxDate">
                </som-date-time-picker>
            `,
            data () {
                return {
                    currentDate: new Date(2018, 11, 28),
                    minDate: new Date(2018, 11, 29, 6),
                    maxDate: new Date(2019, 0, 3, 18)
                };
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            let hour = columns[2].querySelectorAll('li')[0];
            expect(hour.textContent).to.equal('6');
            vm.currentDate = new Date(2019, 1, 30);
            setTimeout(() => {
                expect(columns[2].querySelectorAll('li').length).to.equal(7);
                done();
            }, 200);
        }, 200);
    });


    it('value-format', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    value-format="yyyy-MM-dd hh/mm"
                    v-model="currentDate"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @on-confirm="onConfirm">
                </som-date-time-picker>
            `,
            data () {
                return {
                    val: '',
                    currentDate: new Date(2018, 11, 28),
                    minDate: new Date(2018, 11, 20, 6),
                    maxDate: new Date(2019, 0, 3, 18)
                };
            },
            methods: {
                onConfirm (val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.som-picker__confirm').click();
            setTimeout(() => {
                expect(vm.val).to.equal('2018-12-28 00/00');
                done();
            }, 200);
        }, 200);
    });

    it('minute-step', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    format="yyyy-mm-dd H mm"
                    v-model="currentDate"
                    :minute-step="10">
                </som-date-time-picker>
            `,
            data () {
                return {
                    val: '',
                    currentDate: new Date(2018, 11, 28)
                };
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns[2].querySelectorAll('li').length).to.equal(6);
            done();
        }, 200);
    });

    it('range', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    v-model="value"
                    range>
                </som-date-time-picker>
            `,
            data () {
                return {
                    value: [ new Date(), '08:00', '09:00']
                };
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns[0].querySelector('.som-picker-column--selected').textContent).to.equal('今天');
            expect(columns[1].querySelector('.som-picker-column--selected').textContent).to.equal('08:00 - 09:00');
            done();
        }, 200);
    });

    it('range change', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    v-model="value"
                    range>
                </som-date-time-picker>
            `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            columns[1].querySelectorAll('li')[2].click();
            setTimeout(() => {
                expect(vm.value[1]).to.equal('02:00');
                done();
            }, 200);
        }, 200);
    });

    it('range valueFormat', (done) => {
        vm = createVue({
            template: `
                <som-date-time-picker
                    v-model="value"
                    @on-confirm="onConfirm"
                    value-format="yyyy-MM-dd"
                    range>
                </som-date-time-picker>
            `,
            data () {
                return {
                    value: [new Date(2018, 6, 22), '00:00', '01:00'],
                    val: ''
                };
            },
            methods: {
                onConfirm (val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.som-picker__confirm').click();
            setTimeout(() => {
                expect(vm.val[0]).to.equal('2018-07-22 00:00');
                done();
            }, 200);
        }, 200);
    });
});

