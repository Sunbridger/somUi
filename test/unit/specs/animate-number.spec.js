import Vue from 'vue';
import AnimateNumber from 'components/animate-number';
import { createVue, destroyVM } from '../util';

Vue.use(AnimateNumber);
describe('AnimateNumber', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('creat', () => {
        vm = createVue({
            template: `
                <som-animate-number
                    :number="0"
                    :duration="1">
                </som-animate-number>
            `
        }, {attachToDocument: true});

        expect(vm.$el.textContent).to.equal('0');
    });
});

