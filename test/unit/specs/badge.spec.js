import Badge from 'components/badge';
import { createTest, destroyVM } from '../util';

describe('Badge', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('text', () => {
        vm = createTest(Badge, {
            text: '8'
        }, true);
        expect(vm.$el.textContent).to.equal('8');
    });

    it('badge-style', () => {
        vm = createTest(Badge, {
            badgeStyle: {background: 'rgb(255, 198, 26)'}
        }, true);
        expect(vm.$el.style.background).to.equal('rgb(255, 198, 26)');
    });
});

