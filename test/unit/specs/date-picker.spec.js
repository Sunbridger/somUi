import DatePicker from 'components/date-picker';
import { createTest, createVue, destroyVM } from '../util';

describe('DatePicker', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(DatePicker, true);
        expect(vm.$el).to.exist;
    });

    it('type year', (done) => {
        vm = createVue({
            template: `
                <som-date-picker
                    v-model="currentYear"
                    @on-confirm="onConfirm"
                    type="year">
                </som-date-picker>
            `,
            data () {
                return {
                    currentYear: new Date(2018, 0, 1),
                    year: ''
                };
            },
            methods: {
                onConfirm (val) {
                    this.year = val.getFullYear();
                }
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-picker-column').length).to.equal(1);
            let year2011 = vm.$el.querySelectorAll('.som-picker-column li')[2];
            year2011.click();
            let confirm = vm.$el.querySelector('.som-picker__confirm');
            confirm.click();
            setTimeout(() => {
                expect(vm.year).to.equal(2011);
                done();
            }, 200);
        }, 200);
    });

    it('type year-month', (done) => {
        vm = createVue({
            template: `
                <som-date-picker
                    v-model="currentDate"
                    :min-date="minDate"
                    @on-confirm="onConfirm"
                    type="year-month">
                </som-date-picker>
            `,
            data () {
                return {
                    currentDate: new Date(),
                    minDate: new Date(2018, 2, 1),
                    month: ''
                };
            },
            methods: {
                onConfirm (val) {
                    this.month = `${val.getFullYear()}年${val.getMonth() + 1}月`;
                }
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns.length).to.equal(2);
            let year2020 = columns[0].querySelectorAll('li')[2];
            year2020.click();
            setTimeout(() => {
                let month4 = columns[1].querySelectorAll('li')[3];
                month4.click();
                let confirm = vm.$el.querySelector('.som-picker__confirm');
                confirm.click();
                setTimeout(() => {
                    expect(vm.month).to.equal('2020年4月');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('type date', (done) => {
        vm = createVue({
            template: `
                <som-date-picker
                    v-model="currentDate"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @on-confirm="onConfirm"
                    type="date">
                </som-date-picker>
            `,
            data () {
                return {
                    currentDate: new Date(),
                    minDate: new Date(2018, 2, 29),
                    maxDate: new Date(2018, 2, 31),
                    date: ''
                };
            },
            methods: {
                onConfirm (val) {
                    this.date = `${val.getFullYear()}年${val.getMonth() + 1}月${val.getDate()}日`;
                }
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns.length).to.equal(3);
            let years = columns[0].querySelectorAll('li');
            expect(years.length).to.equal(1);
            let months = columns[1].querySelectorAll('li');
            expect(months.length).to.equal(1);

            setTimeout(() => {
                let day31 = columns[2].querySelectorAll('li')[2];
                day31.click();
                let confirm = vm.$el.querySelector('.som-picker__confirm');
                confirm.click();
                setTimeout(() => {
                    expect(vm.date).to.equal('2018年3月31日');
                    done();
                }, 200);
            }, 200);
        }, 200);
    });
});
