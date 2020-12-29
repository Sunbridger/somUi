import NavBar from 'components/nav-bar';
import { createTest, createVue, destroyVM } from '../util';

describe('NavBar', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('fill', () => {
        vm = createTest(NavBar, {
            fill: true
        }, true);
        expect(vm.$el.classList.contains('som-nav-bar--fill')).to.true;
    });

    it('left', () => {
        vm = createTest(NavBar, true);
        expect(vm.$el.querySelector('.som-icon-arrow-left')).to.exist;
    });

    it('left-text', () => {
        vm = createTest(NavBar, {
            leftText: '取消'
        }, true);
        expect(vm.$el.querySelector('.som-nav-bar__left').textContent).to.equal('取消');
    });

    it('right-text', () => {
        vm = createTest(NavBar, {
            rightText: '取消'
        }, true);
        expect(vm.$el.querySelector('.som-nav-bar__right').textContent).to.equal('取消');
    });

    it('title', () => {
        vm = createTest(NavBar, {
            title: '取消'
        }, true);
        expect(vm.$el.querySelector('.som-nav-bar__title').textContent).to.equal('取消');
    });

    it('left-icon', () => {
        vm = createTest(NavBar, {
            leftIcon: 'ssssssss'
        }, true);
        expect(vm.$el.querySelector('.som-nav-bar__left img')).to.exist;
    });
    it('right-icon', () => {
        vm = createTest(NavBar, {
            rightIcon: 'ssssssss'
        }, true);
        expect(vm.$el.querySelector('.som-nav-bar__right img')).to.exist;
    });

    it('on-click', (done) => {
        vm = createVue({
            template: `
                <som-nav-bar
                    @on-left-click="leftClick" 
                    @on-title-click="rightClick" 
                    @on-right-click="titleClick" 
                    right-text="查看" 
                    left-text="取消">
                    我的公积金
                </som-nav-bar>
            `,
            data () {
                return {
                    left: false,
                    title: false,
                    right: false
                };
            },
            methods: {
                leftClick () {
                    this.left = true;
                },
                rightClick () {
                    this.right = true;
                },
                titleClick () {
                    this.title = true;
                }
            }
        }, true);
        setTimeout(() => {
            let left = vm.$el.querySelector('.som-nav-bar__left');
            let right = vm.$el.querySelector('.som-nav-bar__right');
            let title = vm.$el.querySelector('.som-nav-bar__title');
            left.click();
            right.click();
            title.click();
            setTimeout(() => {
                expect(vm.left).to.true;
                expect(vm.right).to.true;
                expect(vm.title).to.true;
                done();
            }, 200);
        }, 200);
    });


});

