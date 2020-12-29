import { triggerTouch, createVue, destroyVM } from '../util';

describe('Range', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('normal', (done) => {
        vm = createVue({
            template: `
                <som-range
                    v-model="value"
                    range="10-50"
                    :step="1"
                ></som-range>
            `,
            data () {
                return {
                    value: '20-40'
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.range-container').style.width).to.equal('50%');
            vm.value = '10-20';
            setTimeout(() => {
                expect(vm.$el.querySelector('.range-container').style.width).to.equal('25%');
                done();
            }, 100);
        }, 100);
    });

    it('tips', (done) => {
        vm = createVue({
            template: `
                <som-range
                    v-model="value"
                    range="10-50"
                    primary-color="#000"
                    range-color="red"
                    :step="1"
                    :tip-list="tipList"
                ></som-range>
            `,
            data () {
                return {
                    value: '20-40',
                    tipList: ['10', '20', '30', '40', '不限']
                };
            }
        }, true);
        setTimeout(() => {
            let tips = vm.$el.querySelectorAll('.som-randge__number .range');
            expect(tips[0].style.color).to.equal('rgb(0, 0, 0)');
            expect(vm.$el.querySelector('.range-container').style.backgroundColor).to.equal('red');

            expect(tips[1].textContent.trim()).to.equal('20');
            expect(tips[2].textContent.trim()).to.equal('30');
            expect(tips[3].textContent.trim()).to.equal('40');
            expect(tips[4].textContent.trim()).to.equal('不限');
            done();
        }, 100);
    });


    it('touch', (done) => {
        vm = createVue({
            template: `
                <div style="width: 200px">
                    <som-range
                        v-model="value"
                        range="0-6"
                        :step="1"
                        :tip-list="tipList"
                    ></som-range>
                </div>
            `,
            data () {
                return {
                    value: '0-6',
                    tipList: ['0', '1', '2', '3', '4', '5']
                };
            }
        }, true);
        setTimeout(() => {
            triggerTouch(vm.$el.querySelector('.end-btn'), 'touchstart', 200, 0);
            triggerTouch(vm.$el.querySelector('.end-btn'), 'touchmove', 120, 0);
            triggerTouch(vm.$el.querySelector('.end-btn'), 'touchend', 120, 0);
            setTimeout(() => {
                expect(vm.value).to.equal('0-4');

                triggerTouch(vm.$el.querySelector('.start-btn'), 'touchstart', 0, 0);
                triggerTouch(vm.$el.querySelector('.start-btn'), 'touchmove', 40, 0);
                triggerTouch(vm.$el.querySelector('.start-btn'), 'touchend', 40, 0);
                setTimeout(() => {
                    expect(vm.value).to.equal('1-4');
                    done();
                }, 100);
            }, 100);
        }, 100);
    });
});

