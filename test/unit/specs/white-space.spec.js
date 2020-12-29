import WhiteSpace from 'components/white-space';
import { createTest, createVue, destroyVM } from '../util';

describe('WhiteSpace', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(WhiteSpace, true);
        expect(vm.$el).to.exist;
        expect(vm.$el.getBoundingClientRect().height).to.equal(16);
    });

    it('size', () => {
        vm = createVue({
            template: `
                <som-white-space size="12px"></som-white-space>
            `
        }, true);
        expect(vm.$el.getBoundingClientRect().height).to.equal(12);
    });
});

