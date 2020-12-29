import TabBar from 'components/tab-bar';
import { createTest, createVue, destroyVM } from '../util';

describe('TabBar', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(TabBar, true);
        expect(vm.$el).to.exist;
    });

    it('props', () => {
        vm = createVue({
            template: `
                <som-tab-bar>
                    <som-tab-bar-item icon-class="test-class">
                        <img slot="icon" src="http://img.souche.com/f2e/a35fbfe7ef993ced24acf3bbeabedf5d.png">
                        <span slot="label">Wechat</span>
                    </som-tab-bar-item>
                    <som-tab-bar-item selected>
                        <img slot="icon" src="http://img.souche.com/f2e/c7f2cb7014d5f7ad34242a23e31bde0a.png">
                        <span slot="label">Message</span>
                    </som-tab-bar-item>
                    <som-tab-bar-item show-dot>
                        <img slot="icon" src="http://img.souche.com/f2e/9c59a59e00ba122dca81c01dc04708e9.png">
                        <span slot="label">Explore</span>
                    </som-tab-bar-item>
                    <som-tab-bar-item badge="2">
                        <img slot="icon" src="http://img.souche.com/f2e/e5b35520f5c3c9aa0c33d90febe212fd.png">
                        <span slot="label">News</span>
                    </som-tab-bar-item>
                </som-tab-bar>
            `
        }, true);
        const items = vm.$el.querySelectorAll('.som-tab-bar__item');
        expect(items[0].querySelector('span').innerText).to.equal('Wechat');
        expect(items[0].querySelector('.test-class').innerText).to.exist;
        expect(items[1].className).to.equal('som-tab-bar__item som-tab-bar__item-on');
        expect(items[2].querySelector('.som-tab-bar-reddot')).to.exist;
        expect(items[3].querySelector('.som-badge').innerText).to.equal('2');
    });

    it('simple & icon-active', (done) => {
        vm = createVue({
            template: `
                <som-tab-bar>
                    <som-tab-bar-item>
                        <span slot="label">Wechat</span>
                    </som-tab-bar-item>
                    <som-tab-bar-item>
                        <img slot="icon-active" src="http://img.souche.com/f2e/c7f2cb7014d5f7ad34242a23e31bde0a.png">
                        <img slot="icon" src="http://img.souche.com/f2e/a35fbfe7ef993ced24acf3bbeabedf5d.png">
                        <span slot="label">Wechat</span>
                    </som-tab-bar-item>
                </som-tab-bar>
            `
        }, true);
        setTimeout(() => {
            const items = vm.$el.querySelectorAll('.som-tab-bar__item');
            expect(items[0].className).to.equal('som-tab-bar__item som-tab-bar-simple');
            expect(items[1].querySelector('img').src).to.equal('http://img.souche.com/f2e/a35fbfe7ef993ced24acf3bbeabedf5d.png');
            items[1].click();
            setTimeout(() => {
                expect(items[1].querySelector('img').src).to.equal('http://img.souche.com/f2e/c7f2cb7014d5f7ad34242a23e31bde0a.png');
                done();
            }, 200);
        }, 200);
    });
});

