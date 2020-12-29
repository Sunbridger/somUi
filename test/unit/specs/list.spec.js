import List from 'components/list';
import { createTest, createVue, destroyVM } from '../util';

describe('List', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(List, true);
        expect(vm.$el).to.exist;
    });

    it('list title', () => {
        vm = createTest(List, {
            title: '我是列表'
        }, true);
        expect(vm.$el.querySelector('.som-list__title').textContent).to.equal('我是列表');
    });

    it('list gutter', () => {
        vm = createTest(List, {
            gutter: '20px'
        }, true);
        expect(vm.$el.querySelector('.som-list').style.marginTop).to.equal('20px');
    });

    it('list label-width', (done) => {
        vm = createVue({
            template: `
                <som-list title="基础用法" title-color="red" label-width="5em">
                    <som-list-item title="通知" value="已开启"></som-list-item>
                </som-list>
                `
        }, true);

        setTimeout(() => {
            expect(vm.$el.querySelector('.som-list-item-label').style.width).to.equal('5em');
            done();
        }, 200);
    });

    describe('list item', () => {
        let vm;
        beforeEach((done) => {
            vm = createVue({
                template: `
                    <som-list title="基础用法" title-color="red" label-width="5em">
                        <som-list-item title="通知" value="已开启"></som-list-item>
                        <som-list-item title="余额" value="money"></som-list-item>
                        <som-list-item title="提现" disabled is-link></som-list-item>
                        <som-list-item title="隐私" arrow-direction="left"></som-list-item>
                        <som-list-item title="flex-start" align-items="flex-start" value="从前有一只小鸭子的"></som-list-item>
                        <som-list-item title="Slot 内容">
                            <div>
                                <span style="color: green">Hi, I'm Som List.</span>
                            </div>
                        </som-list-item>
                    </som-list>
                `
            }, true);
            setTimeout(done, 200);
        });

        afterEach(() => destroyVM(vm));

        it('list title-color', () => {
            expect(vm.$el.querySelector('.som-list__title').style.color).to.equal('red');
        });

        it('list item title', () => {
            expect(vm.$el.querySelectorAll('.som-list-item-label')[0].textContent).to.equal('通知');
        });

        it('list item value', () => {
            expect(vm.$el.querySelectorAll('.som-list-item__ft')[0].textContent).to.equal('已开启');
        });
        it('list item disabled', () => {
            expect(vm.$el.querySelector('.som-list-item-disabled .som-list-item-label').textContent).to.equal('提现');
        });

        it('list item arrow-direction', () => {
            let item = vm.$el.querySelectorAll('.som-list-item')[3];
            expect(item.querySelector('.som-arrow-left')).to.exist;
        });

        it('list item is-link', () => {
            let item = vm.$el.querySelectorAll('.som-list-item')[2];
            expect(item.querySelector('.som-arrow-right')).to.exist;
        });

        it('list item align-items', () => {
            let item = vm.$el.querySelectorAll('.som-list-item')[4];
            expect(item.querySelector('.som-list-item--primary')).to.exist;
        });

        it('list item slot', () => {
            let item = vm.$el.querySelectorAll('.som-list-item')[5];
            expect(item.querySelector('.som-list-item__ft span').style.color).to.equal('green');
        });

    });

});

