import Button from 'components/button';
import { createTest, createVue, destroyVM } from '../util';

describe('Button', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(Button, {
            type: 'primary'
        }, true);
        expect(vm.$el.classList.contains('som-button--primary')).to.be.true;
    });

    it('mini', () => {
        vm = createTest(Button, {
            mini: true
        }, true);
        expect(vm.$el.classList.contains('som-button--mini')).to.be.true;
    });

    it('plain', () => {
        vm = createTest(Button, {
            plain: true
        }, true);
        expect(vm.$el.classList.contains('som-button--plain--default')).to.be.true;
    });

    it('delay-time', (done) => {
        vm = createVue({
            template: `
                <som-button @click="click" :delay-time="1000">submit</som-button>
                `,
            data () {
                return {
                    clickn: 0
                };
            },
            methods: {
                click () {
                    this.clickn += 1;
                }
            }
        }, true);

        vm.$el.click();
        vm.$el.click();
        setTimeout(() => {
            expect(vm.clickn).to.equal(1);
            done();
        }, 1200);
    });

    it('gradients', () => {
        vm = createTest(Button, {
            gradients: ['#1D62F0', '#19D5FD']
        }, true);
        expect(vm.$el.style.background.indexOf('linear-gradient')).to.not.equal(-1);
    });

    it('button-group', () => {
        vm = createVue({
            template: `
                <som-button-group right>
                    <som-button type="gray">操作一</som-button>
                    <som-button type="primary">操作二</som-button>
                </som-button-group>
                `
        }, true);

        expect(vm.$el.classList.contains('som-button-group--right')).to.true;
    });
});
