import { createVue, destroyVM, triggerTouch } from '../util';

describe('Tips', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('mode guide', (done) => {
        vm = createVue({
            template: `
                <som-tips
                    :show="show"
                    mode="guide"
                    writer="副文案"
                    illustration="http://img.souche.com/f2e/8d88281af394b56d39b5871e7ef5eec1.jpg"
                    title="主文案十字六七八九十主文案十字六七八九十">
                    <som-button>第一步</som-button>
                </som-tips>  
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tips--guide .title').textContent).to.equal('主文案十字六七八九十主文案十字六七八九十');
            expect(vm.$el.querySelector('.som-tips--guide .writer').textContent).to.equal('副文案');
            done();
        }, 300);
    });

    it('is-trigger', (done) => {
        vm = createVue({
            template: `
                <som-tips placement="top" v-model="show" style="margin: 20px;">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: false
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tips').style.display).to.equal('none');
            vm.$el.querySelector('.som-button').click();
            setTimeout(() => {
                expect(vm.show).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('hide-on-blur', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur>
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            triggerTouch(document.body, 'touchstart');
            setTimeout(() => {
                expect(vm.show).to.be.false;
                done();
            }, 200);
        }, 200);
    });

    it('mode list', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" effect="dark" mode="list" style="margin: 20px;" hide-on-blur>
                    <som-button mini type="primary">列表模式</som-button>
                    <div slot="content">
                        <som-tips-item v-for="(v, i) in lists" :key="i" :text="v.text" :icon="v.icon" :link="v.link" ></som-tips-item>
                        <som-tips-item>
                            <span class="define-item">呵呵哒</span>
                        </som-tips-item>
                    </div>
                </som-tips>  
            `,
            data() {
                return {
                    show: true,
                    lists: [
                        {icon: 'eye', text: '查看 button'},
                        {icon: 'reload', text: '刷新'}
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-tips-item').length).to.equal(3);
            vm.$el.querySelectorAll('.som-tips-item')[0].click();
            setTimeout(() => {
                expect(vm.show).to.be.false;
                done();
            }, 200);
        }, 200);
    });

    it('on-show', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur @on-show="showed = true">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: false,
                    showed: false
                };
            }
        }, true);
        setTimeout(() => {
            vm.$el.querySelector('.som-button').click();
            setTimeout(() => {
                expect(vm.showed).to.be.true;
                done();
            }, 200);
        }, 200);
    });

    it('placement', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur @on-show="showed = true" placement="left">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.is-light .som-tips-arrow-right')).to.exist;
            done();
        }, 200);
    });

    it('placement top-start', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur placement="top-start">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tips-arrow-down-start')).to.exist;
            done();
        }, 200);
    });

    it('placement top-end', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur placement="top-end">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tips-arrow-down-end')).to.exist;
            done();
        }, 200);
    });

    it('placement right', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur placement="right">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tips-arrow-left')).to.exist;
            done();
        }, 200);
    });

    it('placement bottom-end', (done) => {
        vm = createVue({
            template: `
                <som-tips v-model="show" hide-on-blur placement="bottom-end">
                    <div slot="content" class="som-tips-demo-content">
                        hello world
                    </div>
                    <som-button type="primary" mini>基本用法</som-button>
                </som-tips> 
            `,
            data() {
                return {
                    show: true
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-tips-arrow-up-end')).to.exist;
            done();
        }, 200);
    });

});
