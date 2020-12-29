import { createVue, destroyVM } from '../util';

describe('Accordion', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('on-change', (done) => {
        vm = createVue({
            template: `
                 <som-accordion @on-change="handleC">
                    <som-accordion-panel header="111">
                        <som-list-item title="展开列表一"></som-list-item>
                        <som-list-item title="展开列表二"></som-list-item>
                        <som-list-item title="展开列表三"></som-list-item>
                    </som-accordion-panel>
                </som-accordion>
                `,
            data () {
                return {
                    active: ''
                };
            },
            methods: {
                handleC (key) {
                    this.active = key[0];
                }
            }
        }, true);
        setTimeout(() => {
            let item = vm.$children[0].$el.querySelectorAll('.som-list-item')[0];
            item.click();
            setTimeout(() => {
                expect(vm.active).to.equal(0);
                done();
            }, 300);
        }, 300);
    });

    it('accordion', (done) => {
        vm = createVue({
            template: `
                 <som-accordion>
                    <som-accordion-panel header="111">
                        <som-list-item title="展开列表一"></som-list-item>
                        <som-list-item title="展开列表二"></som-list-item>
                        <som-list-item title="展开列表三"></som-list-item>
                    </som-accordion-panel>
                    <som-accordion-panel header="列表三">
                        展开内容是一段文案展开内容是一段文案展开内容是
                    </som-accordion-panel>
                    <som-accordion-panel header="列表三">
                        展开内容是一段文案展开内容是一段文案展开内容是
                    </som-accordion-panel>
                </som-accordion>
                `
        }, true);
        setTimeout(() => {
            let items = vm.$el.querySelectorAll('.som-list');
            items[0].querySelectorAll('.som-list-item')[0].click();
            setTimeout(() => {
                items[1].querySelectorAll('.som-list-item')[0].click();
                setTimeout(() => {
                    expect(vm.$el.querySelectorAll('.som-list')[0].querySelector('.som-accordion__panel').classList.contains('v-leave')).to.true;
                    done();
                }, 0);
            }, 200);
        }, 200);
    });

    it('center', (done) => {
        vm = createVue({
            template: `
                    <som-accordion center>
                        <som-accordion-panel>
                            <som-list-item title="展开列表一"></som-list-item>
                            <som-list-item title="展开列表二"></som-list-item>
                            <som-list-item title="展开列表三"></som-list-item>
                        </som-accordion-panel>
                    </som-accordion>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-accordion--center')).to.exist;
            done();
        }, 200);
    });

    it('default-active-key', (done) => {
        vm = createVue({
            template: `
                 <som-accordion :default-active-key="[0, 1]">
                    <som-accordion-panel header="111">
                        <som-list-item title="展开列表一"></som-list-item>
                        <som-list-item title="展开列表二"></som-list-item>
                        <som-list-item title="展开列表三"></som-list-item>
                    </som-accordion-panel>
                    <som-accordion-panel header="列表三">
                        展开内容是一段文案展开内容是一段文案展开内容是
                    </som-accordion-panel>
                    <som-accordion-panel header="列表三">
                        展开内容是一段文案展开内容是一段文案展开内容是
                    </som-accordion-panel>
                </som-accordion>
                `
        }, true);

        setTimeout(() => {
            let items = vm.$el.querySelectorAll('.som-list');
            expect(items[0].querySelector('.som-accordion__panel').style.display).not.to.equal('none');
            expect(items[0].querySelector('.som-accordion__panel').style.display).not.to.equal('none');
            done();
        }, 300);
    });

    it('!accordion', (done) => {
        vm = createVue({
            template: `
                 <som-accordion :default-active-key="[0, 1]" @on-change="handleC" :accordion="false">
                    <som-accordion-panel header="111">
                        <som-list-item title="展开列表一"></som-list-item>
                        <som-list-item title="展开列表二"></som-list-item>
                        <som-list-item title="展开列表三"></som-list-item>
                    </som-accordion-panel>
                    <som-accordion-panel header="列表三">
                        展开内容是一段文案展开内容是一段文案展开内容是
                    </som-accordion-panel>
                    <som-accordion-panel header="列表三">
                        展开内容是一段文案展开内容是一段文案展开内容是
                    </som-accordion-panel>
                </som-accordion>
                `,
            data () {
                return {
                    actives: []
                };
            },
            methods: {
                handleC (keys) {
                    this.actives = keys;
                }
            }
        }, true);

        setTimeout(() => {
            let items = vm.$el.querySelectorAll('.som-list');
            items[2].querySelectorAll('.som-list-item')[0].click();
            setTimeout(() => {
                expect(vm.actives.length).to.equal(3);
                items[2].querySelectorAll('.som-list-item')[0].click();
                setTimeout(() => {
                    expect(vm.actives.length).to.equal(2);
                    done();
                }, 300);
            }, 300);
        }, 300);
    });

});

