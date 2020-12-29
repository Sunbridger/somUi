import Vue from 'vue';
import SelectorItem from 'packages/selector-item';
import { mount } from '@vue/test-utils';

Vue.use(SelectorItem);
describe('SelectorItem', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('create', () => {
        vm = mount({
            template: `
                <som-selector-item title="热门城市" index="热">
                    <div class="citys">
                        <span>广州</span>
                        <span>深圳</span>
                        <span>上海</span>
                        <span>北京</span>
                    </div>
                </som-selector-item>
            `
        });
        expect(vm.attributes()['data-selector-item-index']).to.equal('热');
        expect(vm.findAll('.som-selector-item__content span').length).to.equal(4);
    });

    it('no index', () => {
        vm = mount({
            template: `
                <som-selector-item title="热门城市">
                    <div class="citys">
                        <span>广州</span>
                        <span>北京</span>
                    </div>
                </som-selector-item>
            `
        });
        expect(vm.attributes()['data-selector-item-index']).to.equal(undefined);
    });
});

