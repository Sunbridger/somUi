import { createVue, destroyVM } from '../util';

describe('NoticeBar', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('mode link', (done) => {
        vm = createVue({
            template: `
                <som-notice-bar mode="link" :onClick="onclick" type="warn"
                    icon="information">
                    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
                </som-notice-bar>
                `
        }, true);

        setTimeout(() => {
            expect(vm.$el.querySelector('.som-icon-arrow-right')).to.exist;
            done();
        }, 200);
    });

    it('mode marquee', (done) => {
        vm = createVue({
            template: `
                <som-notice-bar
                    type="info"
                    icon="information"
                    style="width: 200px"
                    :marquee="marquee">
                    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
                </som-notice-bar>
            `,
            data () {
                return {
                    marquee: {
                        loop: true
                    }
                };
            }
        }, true);

        setTimeout(() => {
            let marquee = vm.$el.querySelector('.som-notice-bar-marquee');
            let marqueeContainer = vm.$el.querySelector('.som-notice-bar__content');
            expect(marquee.offsetWidth > marqueeContainer.offsetWidth);
            done();
        }, 500);
    });

    it('mode closeable', (done) => {
        vm = createVue({
            template: `
                <som-notice-bar mode="closable" icon="circle-check">
                    Customized icon.
                </som-notice-bar>
            `
        }, true);

        setTimeout(() => {
            let close = vm.$el.querySelector('.som-icon-close');
            close.click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-notice-bar').style.display).to.equal('none');
                done();
            }, 200);
        }, 200);
    });

    it('mode onclick', (done) => {
        vm = createVue({
            template: `
                <som-notice-bar mode="closable" :onClick="onclick">
                    Customized icon.
                </som-notice-bar>
            `,
            data () {
                return {
                    v: 1
                };
            },
            methods: {
                onclick () {
                    this.v = 2;
                }
            }
        }, true);

        setTimeout(() => {
            let close = vm.$el.querySelector('.som-icon-close');
            close.click();
            setTimeout(() => {
                expect(vm.v).to.equal(2);
                done();
            }, 200);
        }, 200);
    });


});

