import { createVue, destroyVM } from '../util';

describe('Progress', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('unfilled', (done) => {
        vm = createVue({
            template: `
                <som-progress :percent="30" unfilled></som-progress>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-progress__bar').style.backgroundColor).to.equal('transparent');
            done();
        }, 200);
    });

    it('filled-color', (done) => {
        vm = createVue({
            template: `
                <som-progress :percent="30" filled-color="#ccc"></som-progress>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-progress__bar').style.backgroundColor).to.equal('rgb(204, 204, 204)');
            done();
        }, 200);
    });

    it('bar-color', (done) => {
        vm = createVue({
            template: `
                <som-progress :percent="30" bar-color="#2BBE71"></som-progress>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-progress__inner-bar').style.backgroundColor).to.equal('rgb(43, 190, 113)');
            done();
        }, 200);
    });

    it('width', (done) => {
        vm = createVue({
            template: `
                <som-progress :width="200" bar-color="#2BBE71"></som-progress>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.style.width).to.equal('200px');
            done();
        }, 200);
    });


    it('ticks', (done) => {
        vm = createVue({
            template: `
                <som-progress 
                    :percent="30" 
                    bar-color="#2BBE71" 
                    :ticks="tickList"></som-progress>
                `,
            data () {
                return {
                    tickList: [{
                        percent: 20,
                        text: '20%'
                    }, {
                        percent: 90,
                        text: '90%'
                    }]
                };
            }
        }, true);
        setTimeout(() => {
            let tick = vm.$el.querySelectorAll('.som-progress__tick-wrap');
            expect(tick.length).to.equal(2);
            expect(tick[0].querySelector('.tick-content').textContent).to.equal('20%');
            done();
        }, 200);
    });

    it('on-cancel', (done) => {
        vm = createVue({
            template: `
                <som-progress :percent="percent" :show-cancel="true" @on-cancel="cancle"></som-progress>
            `,
            data () {
                return {
                    percent: 30
                };
            },
            methods: {
                cancle () {
                    this.percent = 0;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.som-progerss-close').click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-progress__inner-bar').style.width).to.equal('0%');
                done();
            }, 300);
        }, 200);
    });

    it('tip-content', (done) => {
        vm = createVue({
            template: `
                <div>
                <som-progress :percent="percent" :tip-content="tipContent"></som-progress>
                <a class="som-progress-tip-change" href="javascript:;" @click="changeTipContent"></a>
                </div>
                `,
            data () {
                return {
                    tipContent: '',
                    percent: 20
                };
            },
            methods: {
                changeTipContent () {
                    this.tipContent = '1/5';
                }
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-progress__tip').innerText).to.equal('20%');
            vm.$el.querySelector('.som-progress-tip-change').click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-progress__tip').innerText).to.equal('1/5');
                done();
            }, 300);
        }, 200);
    });
});
