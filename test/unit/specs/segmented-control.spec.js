import { createVue, destroyVM } from '../util';

describe('SegmentedControl', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('height', (done) => {
        vm = createVue({
            template: `
                <som-segmented-control :height="40">
                    <som-segmented-control-item>第一个</som-segmented-control-item>
                    <som-segmented-control-item selected>第二个</som-segmented-control-item>
                    <som-segmented-control-item>第三个</som-segmented-control-item>
                </som-segmented-control>
            `
        }, true);
        setTimeout(() => {
            let item = vm.$el.querySelectorAll('.som-segmented-control-item')[0];
            expect(item.style.height).to.equal('40px');
            done();
        }, 200);
    });

    it('type', (done) => {
        vm = createVue({
            template: `
                <som-segmented-control type="info">
                    <som-segmented-control-item>第一个</som-segmented-control-item>
                    <som-segmented-control-item selected>第二个</som-segmented-control-item>
                    <som-segmented-control-item>第三个</som-segmented-control-item>
                </som-segmented-control>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.classList.contains('som-segmented-control--info')).to.true;
            done();
        }, 200);
    });

    it('value', (done) => {
        vm = createVue({
            template: `
                <som-segmented-control v-model="value">
                    <som-segmented-control-item>第一个</som-segmented-control-item>
                    <som-segmented-control-item selected>第二个</som-segmented-control-item>
                    <som-segmented-control-item>第三个</som-segmented-control-item>
                </som-segmented-control>
            `,
            data () {
                return {
                    value: 0
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.value).to.equal(1);
            let item = vm.$el.querySelectorAll('.som-segmented-control-item')[2];
            item.click();
            setTimeout(() => {
                expect(vm.value).to.equal(2);
                done();
            }, 200);
        }, 200);
    });

    it('disabled', (done) => {
        vm = createVue({
            template: `
                <som-segmented-control v-model="value">
                    <som-segmented-control-item>第一个</som-segmented-control-item>
                    <som-segmented-control-item disabled>第二个</som-segmented-control-item>
                    <som-segmented-control-item>第三个</som-segmented-control-item>
                </som-segmented-control>
            `,
            data () {
                return {
                    value: 0
                };
            }
        }, true);
        setTimeout(() => {
            let item = vm.$el.querySelectorAll('.som-segmented-control-item')[1];
            item.click();
            setTimeout(() => {
                expect(vm.value).to.equal(0);
                done();
            }, 200);
        }, 200);
    });


});

