import Icon from 'components/icon';
import { createTest, destroyVM } from '../util';

describe('Icon', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(Icon, true);
        expect(vm.$el).to.exist;
    });

    it('name', () => {
        vm = createTest(Icon, {
            name: 'test'
        }, true);
        expect(vm.$el.classList.contains('som-icon-test')).to.be.true;
    });

    it('size', () => {
        vm = createTest(Icon, {
            size: '32'
        }, true);
        expect(vm.$el.style.fontSize).to.be.eql('32px');
    });

    it('color', () => {
        vm = createTest(Icon, {
            color: '#000'
        }, true);
        expect(vm.$el.style.color).to.be.eql('rgb(0, 0, 0)');
    });
});

