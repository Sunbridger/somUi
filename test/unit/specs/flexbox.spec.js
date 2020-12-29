import { createVue, destroyVM } from '../util';

describe('Flexbox', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('gutter', (done) => {
        vm = createVue({
            template: `
                <som-flexbox :gutter="10">
                    <som-flexbox-item><div class="flex-demo">1</div></som-flexbox-item>
                    <som-flexbox-item><div class="flex-demo">2</div></som-flexbox-item>
                    <som-flexbox-item><div class="flex-demo">5</div></som-flexbox-item>
                </som-flexbox>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-flexbox-item')[0].style.marginRight).to.equal('10px');
            done();
        }, 200);
    });

    it('orient', (done) => {
        vm = createVue({
            template: `
                <som-flexbox orient="vertical">
                    <som-flexbox-item><div class="flex-demo">1</div></som-flexbox-item>
                    <som-flexbox-item><div class="flex-demo">2</div></som-flexbox-item>
                    <som-flexbox-item><div class="flex-demo">5</div></som-flexbox-item>
                </som-flexbox>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.classList.contains('som-flex-col')).to.be.true;
            done();
        }, 200);
    });

    it('item span', (done) => {
        vm = createVue({
            template: `
                <som-flexbox style="width: 400px;" :gutter="0">
                    <som-flexbox-item :span="1/4"><div class="flex-demo">1</div></som-flexbox-item>
                    <som-flexbox-item :span="3"><div class="flex-demo">2</div></som-flexbox-item>
                    <som-flexbox-item span="200"><div class="flex-demo">3</div></som-flexbox-item>
                </som-flexbox>
                `
        }, true);
        setTimeout(() => {
            let FristWidth = vm.$el.querySelectorAll('.som-flexbox-item')[0].offsetWidth;
            let SecondWidth = vm.$el.querySelectorAll('.som-flexbox-item')[1].offsetWidth;
            let ThirdWidth = vm.$el.querySelectorAll('.som-flexbox-item')[2].offsetWidth;
            expect(FristWidth).to.equal(SecondWidth);
            done();
        }, 200);
    });

    it('item order', (done) => {
        vm = createVue({
            template: `
                <som-flexbox>
                    <som-flexbox-item order="2"><div class="flex-demo">1</div></som-flexbox-item>
                    <som-flexbox-item><div class="flex-demo">2</div></som-flexbox-item>
                </som-flexbox>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-flexbox-item')[0].style['-webkit-order']).to.equal('2');
            done();
        }, 200);
    });
});

