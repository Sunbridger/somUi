import Vue from 'vue';
import ScrollPrevented from 'packages/scroll-prevented';
import { mount } from '@vue/test-utils';

Vue.use(ScrollPrevented);
describe('ScrollPrevented', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('create', (done) => {
        vm = mount({
            template: `
                <div v-som-scroll-prevented="true">
                    这是一个神奇的组件
                    <p>这是一个神奇的组件</p>
                    <p>这是一个神奇的组件</p>
                    <p>这是一个神奇的组件</p>
                </div>
            `
        }, {attachToDocument: true});

        setTimeout(() => {
            expect(document.body.style.position).to.equal('fixed');
            done();
        }, 100);
    });
});

