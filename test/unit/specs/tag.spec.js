import Tag from 'components/tag';
import { createTest, createVue, destroyVM } from '../util';

describe('Tag', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('type', () => {
        vm = createTest(Tag, {
            type: 'primary'
        }, true);
        expect(vm.$el.classList.contains('som-tag--primary')).to.be.true;
    });

    it('plain', () => {
        vm = createTest(Tag, {
            plain: true
        }, true);
        expect(vm.$el.classList.contains('som-tag--plain')).to.be.true;
    });

    it('mark', () => {
        vm = createTest(Tag, {
            mark: true
        }, true);
        expect(vm.$el.classList.contains('som-tag--mark')).to.be.true;
    });

    it('closable', () => {
        vm = createTest(Tag, {
            closable: true
        }, true);
        expect(vm.$el.querySelector('.som-tag__close')).to.exist;
    });

    it('icon', () => {
        vm = createTest(Tag, {
            icon: 'date'
        }, true);
        expect(vm.$el.querySelector('.som-tag__icon')).to.exist;
    });

    it('on-close', (done) => {
        vm = createVue({
            template: `
                <som-tag closable @on-close="handleClose">标签标签</som-tag>
            `,
            data () {
                return {
                    close: false
                };
            },
            methods: {
                handleClose () {
                    this.close = true;
                }
            }
        }, true);
        setTimeout(() => {
            let closeBtn = vm.$el.querySelector('.som-tag__close');
            closeBtn.click();
            setTimeout(() => {
                expect(vm.close).to.true;
                done();
            }, 200);
        }, 200);
    });
});

