import WingBank from 'components/wing-bank';
import { createTest, createVue, destroyVM } from '../util';

describe('WingBank', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(WingBank, true);
        expect(vm.$el).to.exist;
        expect(vm.$el.style.marginLeft).to.equal('16px');
        expect(vm.$el.style.marginRight).to.equal('16px');
    });

    it('size', () => {
        let vm = createVue({
            template: `
                <som-wing-bank size="20px"></som-wing-bank>
            `
        }, true);
        expect(vm.$el.style.marginLeft).to.equal('20px');
        expect(vm.$el.style.marginRight).to.equal('20px');
    });
});

