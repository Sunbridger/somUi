import Flow from 'components/flow';
import { createVue, destroyVM } from '../util';

describe('Flow', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('flex-item title-length', (done) => {
        vm = createVue({
            template: `
                <som-flow :title-length="3">
                    <som-flow-item title="节点名称" is-done></som-flow-item>
                </som-flow>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-flow-item__title span').style.width).to.equal('36px');
            done();
        }, 200);
    });

    it('item-width', (done) => {
        vm = createVue({
            template: `
                <som-flow item-width="80px">
                    <som-flow-item title="节点名称" is-done></som-flow-item>
                </som-flow>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-flow-item').style.width).to.equal('80px');
            done();
        }, 200);
    });

    it('vertical', (done) => {
        vm = createVue({
            template: `
                <som-flow orientation="vertical">
                    <som-flow-item title="节点名称" is-done></som-flow-item>
                </som-flow>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.classList.contains('som-flow--vertical')).to.true;
            done();
        }, 200);
    });

    it('flex-item acitve-color', (done) => {
        vm = createVue({
            template: `
                <som-flow>
                    <som-flow-item title="节点名称" is-done acitve-color="#7088FF"></som-flow-item>
                </som-flow>
            `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-flow-item__circle').style.borderColor).to.equal('rgb(112, 136, 255)');
            done();
        }, 200);
    });
});

