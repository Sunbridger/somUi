import Picker from 'components/picker';
// import PickerColumn from 'components/picker/src/PickerColumn';
import { createTest, createVue, destroyVM } from '../util';

const simpleColumn = ['1990', '1991', '1992', '1993', '1994', '1995'];
const columns = [
    {
        values: ['vip', 'normal'],
        className: 'column1'
    },
    {
        values: simpleColumn,
        className: 'column2'
    }
];

describe('Picker', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('columns', (done) => {
        vm = createTest(Picker, {
            columns: columns
        }, true);
        expect(vm.$el).to.exist;
        expect(vm.getColumnValues(0).length).to.equal(2);
        expect(vm.getColumnValues(1).length).to.equal(6);
        vm.setColumnValue(1, '1993');
        setTimeout(() => {
            expect(vm.getColumnValue(1)).to.equal('1993');
            vm.setColumnValues(1, ['1997', '1998', '1999']);
            setTimeout(() => {
                expect(vm.getColumnValues(1).length).equal(3);
                vm.setColumnValues(1, simpleColumn);
                done();
            }, 200);
        }, 200);
    });

    it('show-toolbar', () => {
        vm = createTest(Picker, {
            columns: columns,
            showToolbar: true
        }, true);
        expect(vm.$el.querySelector('.som-picker__toolbar').style.display).not.equal('none');
    });

    it('title', () => {
        vm = createTest(Picker, {
            columns: columns,
            showToolbar: true,
            title: '标题'
        }, true);
        expect(vm.$el.querySelector('.som-picker__toolbar .som-picker__title').textContent).to.equal('标题');
    });

    it('item-height', () => {
        vm = createTest(Picker, {
            columns: columns,
            showToolbar: true,
            itemHeight: 44
        }, true);
        expect(vm.$el.querySelector('.som-picker__frame').style.height).to.equal('44px');
    });

    it('on-confirm', (done) => {
        vm = createVue({
            template: `
                <som-picker
                    show-toolbar
                    :columns="columns"
                    @on-confirm="onConfirm"/>
            `,
            data () {
                return {
                    value: '',
                    columns: columns
                };
            },
            methods: {
                onConfirm (val) {
                    this.value = val;
                }
            }
        }, true);
        setTimeout(() => {
            let ninefive = vm.$el.querySelectorAll('.som-picker-column')[1].querySelectorAll('li')[5];
            ninefive.click();
            let confirmBtn = vm.$el.querySelector('.som-picker__confirm');
            confirmBtn.click();
            setTimeout(() => {
                expect(vm.value[1]).to.equal('1995');
                done();
            }, 200);
        }, 200);
    });

    it('on-concle', (done) => {
        vm = createVue({
            template: `
                <som-picker
                    show-toolbar
                    :columns="columns"
                    @on-cancel="oncancel"/>
            `,
            data () {
                return {
                    cancel: false,
                    columns: columns
                };
            },
            methods: {
                oncancel () {
                    this.cancel = true;
                }
            }
        }, true);
        setTimeout(() => {
            let concleBtn = vm.$el.querySelector('.som-picker__cancel');
            concleBtn.click();
            setTimeout(() => {
                expect(vm.cancel).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('setValues', (done) => {
        vm = createTest(Picker, {
            columns: columns
        }, true);
        expect(vm.$el).to.exist;
        vm.setValues(['normal', '1993']);
        setTimeout(() => {
            expect(vm.getValues()[0]).to.equal('normal');
            expect(vm.getValues()[1]).to.equal('1993');
            done();
        }, 200);
    });

    it('setIndexes', (done) => {
        vm = createTest(Picker, {
            columns: columns
        }, true);
        expect(vm.$el).to.exist;
        vm.setIndexes([1, 3]);
        setTimeout(() => {
            expect(vm.getValues()[0]).to.equal('normal');
            expect(vm.getValues()[1]).to.equal('1993');
            done();
        }, 200);
    });

    it('getColumnIndex', (done) => {
        vm = createTest(Picker, {
            columns: columns
        }, true);
        let ninefive = vm.$el.querySelectorAll('.som-picker-column')[1].querySelectorAll('li')[5];
        ninefive.click();
        setTimeout(() => {
            expect(vm.getColumnIndex(1)).to.equal(5);
            done();
        }, 200);
    });

    it('onChange', (done) => {
        vm = createVue({
            template: `
                <som-picker
                    :columns="columns"
                    @on-change="onChange"/>
            `,
            data () {
                return {
                    value: '',
                    index: '',
                    columns: simpleColumn
                };
            },
            methods: {
                onChange (picker, val, index) {
                    this.value = val;
                    this.index = index;
                }
            }
        }, true);
        let ninefive = vm.$el.querySelector('.som-picker-column').querySelectorAll('li')[5];
        ninefive.click();
        setTimeout(() => {
            expect(vm.index).to.equal(5);
            expect(vm.value).to.equal('1995');
            done();
        }, 200);
    });

    it('column defaultIndex', (done) => {
        vm = createVue({
            template: `
                <som-picker :columns="columns"/>
            `,
            data () {
                return {
                    columns: [{
                        values: ['vip', 'normal', 'hhh', 'iiii'],
                        className: 'column1',
                        defaultIndex: 1
                    }]
                };
            }
        }, true);
        setTimeout(() => {
            vm.columns = [{
                values: ['vip', 'normal', 'hhh', 'iiii'],
                className: 'column1',
                defaultIndex: 2
            }];
            setTimeout(() => {
                expect(vm.$children[0].getColumnIndex(0)).to.equal(2);
                done();
            }, 400);
        }, 200);
    });
});

