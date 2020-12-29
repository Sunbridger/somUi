import Result from 'components/result';
import { createTest, createVue, destroyVM } from '../util';

describe('Result', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('img', () => {
        vm = createTest(Result, {
            img: 'http://img.souche.com/f2e/9475b2d835c7135830e8652956aa64a3.png'
        }, true);
        expect(vm.$el.querySelector('img').src).to.equal('http://img.souche.com/f2e/9475b2d835c7135830e8652956aa64a3.png');
    });

    it('title', () => {
        vm = createTest(Result, {
            title: 'hahha'
        }, true);
        expect(vm.$el.querySelector('.som-result__title').textContent).to.equal('hahha');
    });

    it('desc', () => {
        vm = createTest(Result, {
            desc: 'hhhhhhh'
        }, true);
        expect(vm.$el.querySelector('.som-result__desc').textContent).to.equal('hhhhhhh');
    });

    it('isCancel', () => {
        vm = createTest(Result, {
            isCancel: true
        }, true);
        expect(vm.$el.querySelectorAll('button').length).to.equal(2);
    });

    it('confirmText', () => {
        vm = createTest(Result, {
            confirmText: '不'
        }, true);
        expect(vm.$el.querySelector('button').textContent).to.equal('不');
    });

    it('cancelText', () => {
        vm = createTest(Result, {
            isCancel: true,
            cancelText: '不'
        }, true);
        expect(vm.$el.querySelectorAll('button')[1].textContent).to.equal('不');
    });

    it('on-confrim', (done) => {
        vm = createVue({
            template: `
                <som-result
                    :img="img"
                    @on-confrim="onConfrim"
                    title="主文案"
                    is-cancel
                    desc="这里是一些解释文案">
                </som-result>
                `,
            data () {
                return {
                    img: 'http://img.souche.com/f2e/9475b2d835c7135830e8652956aa64a3.png',
                    confrim: false
                };
            },
            methods: {
                onConfrim () {
                    this.confrim = true;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('button')[0].click();
            setTimeout(() => {
                expect(vm.confrim).to.true;
                done();
            }, 200);
        }, 200);
    });

    it('on-cancel', (done) => {
        vm = createVue({
            template: `
                <som-result
                    :img="img"
                    @on-cancel="onCancel"
                    title="主文案"
                    is-cancel
                    desc="这里是一些解释文案">
                </som-result>
                `,
            data () {
                return {
                    img: 'http://img.souche.com/f2e/9475b2d835c7135830e8652956aa64a3.png',
                    cancel: false
                };
            },
            methods: {
                onCancel () {
                    this.cancel = true;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelectorAll('button')[1].click();
            setTimeout(() => {
                expect(vm.cancel).to.true;
                done();
            }, 200);
        }, 200);
    });
});

