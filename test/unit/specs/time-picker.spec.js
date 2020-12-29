import { createVue, destroyVM } from '../util';

describe('TimePicker', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('type time', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    v-model="currentTime"
                    @on-confirm="onConfirm">
                </som-time-picker>
            `,
            data () {
                return {
                    currentTime: '13: 12',
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
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns.length).to.equal(2);
            columns[1].querySelectorAll('li')[1].click();
            let confirm = vm.$el.querySelector('.som-picker__confirm');
            confirm.click();
            setTimeout(() => {
                expect(vm.val).to.equal('13:01');
                done();
            }, 200);
        }, 200);
    });

    it('halftime', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    v-model="currentTime"
                    @on-confirm="onConfirm"
                    :min-hour="minHour"
                    :max-hour="maxHour"
                    halftime>
                </som-time-picker>
            `,
            data () {
                return {
                    currentTime: '',
                    val: '',
                    minHour: 8,
                    maxHour: 20
                };
            },
            methods: {
                onConfirm (val) {
                    this.val = val;
                }
            }
        }, true);
        setTimeout(() => {
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns.length).to.equal(3);
            columns[0].querySelectorAll('li')[1].click();
            let confirm = vm.$el.querySelector('.som-picker__confirm');
            confirm.click();
            setTimeout(() => {
                expect(vm.val).to.equal('20:00');
                done();
            }, 200);
        }, 200);
    });

    it('minute-step', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    v-model="currentTime"
                    :minute-step="5"
                    @on-confirm="onConfirm">
                </som-time-picker>
            `,
            data () {
                return {
                    currentTime: '13: 00',
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
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns[1].querySelectorAll('li')[1].textContent).equal('05');
            done();
        }, 200);
    });

    it('type time minute-step', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    v-model="currentTime"
                    @on-confirm="onConfirm"
                    :minute-step="10">
                </som-time-picker>
            `,
            data () {
                return {
                    currentTime: '13: 00',
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
            let columns = vm.$el.querySelectorAll('.som-picker-column');
            expect(columns[1].querySelectorAll('li').length).to.equal(6);
            done();
        }, 200);
    });

    it('time-range', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    :min-hour="7"
                    :max-hour="17"
                    v-model="value"
                    range>
                </som-time-picker>
            `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let column = vm.$el.querySelector('.som-picker-column');
            expect(column.querySelectorAll('li')[0].textContent).to.equal('07:00 - 08:00');
            done();
        }, 200);
    });

    it('time-range step  default-min', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    :min-hour="7"
                    :time-range-step="3.25"
                    :default-minute="15"
                    :max-hour="17"
                    v-model="value"
                    range>
                </som-time-picker>
            `,
            data () {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            let column = vm.$el.querySelector('.som-picker-column');
            expect(column.querySelectorAll('li')[0].textContent).to.equal('07:15 - 10:30');
            done();
        }, 200);
    });

    it('time-range value', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    :min-hour="7"
                    :max-hour="17"
                    v-model="value"
                    range>
                </som-time-picker>
            `,
            data () {
                return {
                    value: ['09:00', '10:00']
                };
            }
        }, true);
        setTimeout(() => {
            let column = vm.$el.querySelector('.som-picker-column');
            expect(column.querySelectorAll('li')[2].classList.contains('som-picker-column--selected')).to.true;
            done();
        }, 200);
    });

    it('time-range change', (done) => {
        vm = createVue({
            template: `
                <som-time-picker
                    :min-hour="7"
                    :max-hour="17"
                    v-model="value"
                    range>
                </som-time-picker>
            `,
            data () {
                return {
                    value: ['09:00', '10:00']
                };
            }
        }, true);
        setTimeout(() => {
            let column = vm.$el.querySelector('.som-picker-column');
            expect(column.querySelectorAll('li')[2].classList.contains('som-picker-column--selected')).to.true;
            column.querySelectorAll('li')[4].click();
            setTimeout(() => {
                expect(vm.value[0]).to.equal('11:00');
                done();
            }, 200);
        }, 200);
    });
});

