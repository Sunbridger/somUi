import Vue from 'vue';
import Carousel from 'packages/carousel';
import CarouselItem from 'packages/carousel/carousel-item';
import { createVue, destroyVM, triggerTouch } from '../../util';

Vue.use(Carousel);
Vue.use(CarouselItem);
const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
];

const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
}, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
}, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg',
    title: '送你一次旅行',
    fallbackImg: 'https://static.vux.li/demo/3.jpg'
}];

describe('Carousel', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('list', (done) => {
        vm = createVue({
            template: `
            <div>
                <som-carousel :list="list" :loop="true">
                </som-carousel>
                <som-button mini @click.native="change_list">第一张</som-button>
            </div>
                `,
            data () {
                return {
                    list: imgList
                };
            },
            methods: {
                change_list () {
                    this.list = [
                        'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
                        'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff'
                    ];
                }
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-carousel-item').length).to.equal(3);
            vm.$el.querySelector('.som-button').click();
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-carousel-item').length).to.equal(4);
                vm.list = imgList;
                setTimeout(() => {
                    expect(vm.$el.querySelectorAll('.som-carousel-item').length).to.equal(3);
                    done();
                }, 200);
            }, 200);
        }, 200);
    });

    it('value change', (done) => {
        vm = createVue({
            template: `
                <som-carousel 
                    :auto="false"
                    :list="demo01_list" 
                    v-model="demo01_index"
                    @on-index-change="demo01_onIndexChange">
                </som-carousel>
                `,
            data () {
                return {
                    demo01_list: imgList,
                    demo01_index: 0,
                    current_index: ''
                };
            },
            methods: {
                demo01_onIndexChange (cindex) {
                    this.current_index = cindex;
                }
            }
        }, true);
        setTimeout(() => {
            let img1 = vm.$el.querySelectorAll('.som-carousel-item')[0];
            expect(img1.classList.contains('active')).to.be.true;
            vm.demo01_index = 1;
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.som-carousel-item')[1].classList.contains('active')).to.be.true;
                expect(vm.current_index).to.equal(1);
                done();
            }, 1000);
        }, 10);
    });

    it('carousel-item', (done) => {
        vm = createVue({
            template: `
                <som-carousel auto height="100px">
                    <som-carousel-item><h2>它无孔不入</h2></som-carousel-item>
                    <som-carousel-item><h2>你无处可藏</h2></som-carousel-item>
                </som-carousel>
                `
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-carousel-item h2')).to.exist;
            done();
        }, 200);
    });

    it('auto', (done) => {
        vm = createVue({
            template: `
                <som-carousel 
                    :list="demo03_list" 
                    :auto="auto"
                    :interval="interval"
                    :duration="duration"
                    style="width:80%;margin:0 auto;" 
                    height="180px">
                </som-carousel>`,
            data () {
                return {
                    auto: true,
                    interval: 300,
                    duration: 100,
                    demo03_list: baseList
                };
            }
        }, true);
        setTimeout(() => {
            let imgs = vm.$el.querySelectorAll('.som-carousel-item');
            expect(imgs[0].classList.contains('active')).to.be.true;
            setTimeout(() => {
                expect(imgs[1].classList.contains('active')).to.be.true;
                done();
            }, 400);
        }, 200);
    });

    it('loop', (done) => {
        vm = createVue({
            template: `
                <som-carousel 
                    :list="demo03_list"
                    :loop="loop"
                    style="width:80%;margin:0 auto;" 
                    height="180px">
                </som-carousel>`,
            data () {
                return {
                    loop: true,
                    interval: 300,
                    duration: 100,
                    demo03_list: [
                        'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
                        'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff'
                    ]
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-carousel-item').length).to.equal(4);
            done();
        }, 200);
    });

    it('touch change', (done) => {
        vm = createVue({
            template: `
                <som-carousel height="100px" v-model="value" style="width: 300px">
                    <som-carousel-item><h2>它无孔不入</h2></som-carousel-item>
                    <som-carousel-item><h2>你无处可藏</h2></som-carousel-item>
                </som-carousel>
                `,
            data () {
                return {
                    value: 0
                };
            }
        }, true);
        setTimeout(() => {
            triggerTouch(vm.$el.querySelector('.som-swiper'), 'touchstart', 200, 50);
            triggerTouch(vm.$el.querySelector('.som-swiper'), 'touchmove', 50, 50);
            triggerTouch(vm.$el.querySelector('.som-swiper'), 'touchend', 50, 50);
            setTimeout(() => {
                expect(vm.$el.querySelector('.som-carousel-item').style.transform.indexOf('300px')).not.to.equal(-1);
                done();
            }, 100);

        }, 200);
    });
});

