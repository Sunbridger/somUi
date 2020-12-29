import Rate from 'components/rate';
import { destroyVM, createTest } from '../util';

describe('Rate', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(Rate, true);
        expect(vm.$el).to.exist;
    });

    it('rate size', (done) => {
        vm = createTest(Rate, {
            size: 30,
            iconName: 'star'
        }, true);
        vm.$nextTick(() => {
            expect(vm.$el.querySelector('.som-rate__img').style.fontSize).to.equal('30px');
            destroyVM(vm);
            vm.$nextTick(() => {
                vm = createTest(Rate, {
                    size: 30
                }, true);
                vm.$nextTick(() => {
                    expect(vm.$el.querySelector('.som-rate__img').style.width).to.equal('30px');
                    done();
                });
            });
        });
    });

    it('rate length', (done) => {
        vm = createTest(Rate, {
            length: 6
        }, true);
        vm.$nextTick(() => {
            expect(vm.$el.querySelectorAll('.som-rate__img').length).to.equal(6);
            done();
        });
    });

    it('rate select-count', (done) => {
        vm = createTest(Rate, {
            selectCount: 3.4,
            iconName: 'star',
            read: true
        }, true);
        vm.$nextTick(() => {
            let result = 0;
            let demarcation = Math.floor(vm.selectCount);
            const temp = ((vm.selectCount - Math.floor(demarcation)) * 68) + 16;
            for (let index = 0; index < 5; index++) {
                const width = vm.$el.querySelectorAll('.som-rate__surface')[index].style.width;
                if (index < demarcation && width === '100%') {
                    result += 1;
                } else if (index > demarcation && width === '1%') {
                    result += 1;
                } else if (index === demarcation && parseInt(width) === parseInt(temp)) {
                    result += 1;
                }
            }
            expect(result).to.equal(5);
            done();
        });
    });

    it('rate icon-color', (done) => {
        vm = createTest(Rate, {
            iconName: 'star',
            iconColors: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)']
        }, true);
        const index = Math.floor(Math.random() * 5);
        vm.$nextTick(() => {
            expect(vm.$el.querySelectorAll('.som-rate__surface')[index].style.color).to.equal(vm.iconColors[1]);
            expect(vm.$el.querySelectorAll('.som-rate__inside')[index].style.color).to.equal(vm.iconColors[0]);
            done();
        });
    });

    it('rate icon-name', (done) => {
        vm = createTest(Rate, {
            iconName: 'star'
        }, true);
        vm.$nextTick(() => {
            expect(vm.$el.querySelector('.som-rate__img').classList.contains('som-icon-star')).to.be.true;
            done();
        });
    });

    it('rate unselect-img select-img', (done) => {
        vm = createTest(Rate, {
            unselectImg: ['http://img.souche.com/f2e/27187485d2b691c06263ee1eb747c690.png'],
            selectImg: ['http://img.souche.com/f2e/2232d212c124ab8b2358b111515b460d.png']
        }, true);
        vm.$nextTick(() => {
            expect(vm.$el.querySelector('.som-rate__img').src).to.be.equal('http://img.souche.com/f2e/27187485d2b691c06263ee1eb747c690.png');
            const index = Math.floor(Math.random() * 5);
            let items = vm.$el.querySelectorAll('.som-rate__img');
            items[index].click();
            vm.$nextTick(() => {
                expect(vm.$el.querySelectorAll('.som-rate__img')[index].src).to.be.equal('http://img.souche.com/f2e/2232d212c124ab8b2358b111515b460d.png');
                done();
            });
        });
    });

    it('rate read', (done) => {
        vm = createTest(Rate, {
            read: true
        }, true);
        vm.$nextTick(() => {
            let items = vm.$el.querySelectorAll('.som-rate__img');
            const index = Math.floor(Math.random() * 5);
            const unselectImg0 = vm.$el.querySelectorAll('.som-rate__img')[index].src;
            items[index].click();
            vm.$nextTick(() => {
                const selectImg0 = vm.$el.querySelectorAll('.som-rate__img')[index].src;
                expect(unselectImg0).to.equal(selectImg0);
                done();
            });
        });
    });

    it('rate click', (done) => {
        vm = createTest(Rate, {}, true);
        vm.$nextTick(() => {
            let items = vm.$el.querySelectorAll('.som-rate__img');
            const index = Math.floor(Math.random() * 5);
            const unselectImg0 = vm.$el.querySelectorAll('.som-rate__img')[index].src;
            items[index].click();
            vm.$nextTick(() => {
                const selectImg0 = vm.$el.querySelectorAll('.som-rate__img')[index].src;
                expect(unselectImg0).not.to.equal(selectImg0);
                done();
            });
        });
    });
    it('rate tooltips', (done) => {
        const arr = [1, 2, 3, 4, 5];
        vm = createTest(Rate, {
            tooltips: arr
        }, true);
        const index = Math.floor(Math.random() * 5);
        const element = arr[index];
        vm.handleClickEmoji(element, index);
        vm.$nextTick(() => {
            let tooltipsText = vm.$el.querySelector('.som-rate__tooltips').textContent;
            expect(tooltipsText).to.equal(` ${element} `);
            done();
        });
    });
    it('rate tooltipStyle', (done) => {
        const arr = [1, 2, 3, 4, 5];
        vm = createTest(Rate, {
            tooltips: arr,
            tooltipStyle: {
                color: 'rgb(255, 255, 255)'
            }
        }, true);
        const index = Math.floor(Math.random() * 5);
        const element = arr[index];
        vm.handleClickEmoji(element, index);
        vm.$nextTick(() => {
            let tooltipsText = vm.$el.querySelector('.som-rate__tooltips');
            expect(tooltipsText.style.color).to.equal('rgb(255, 255, 255)');
            done();
        });
    });
});
