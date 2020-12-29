import SlidePage from 'packages/slide-page';
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { triggerTouch } from '../../util';

Vue.use(SlidePage);
describe('SlidePage', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('touch', (done) => {
        vm = mount({
            template: `
                <som-slide-page class="slide-page" style="height: 500px;">
                    <div class="page-item"></div>
                    <div class="page-item"></div>
                </som-slide-page>
            `
        }, {attachToDocument: true});

        setTimeout(() => {
            expect(vm.find('.som-slide-page-Box').attributes().style).to.equal(undefined);
            triggerTouch(vm.find('.som-slide-page-Box'), 'touchstart', 150, 400);
            triggerTouch(vm.find('.som-slide-page-Box'), 'touchmove', 150, 150);
            triggerTouch(vm.find('.som-slide-page-Box'), 'touchend', 150, 150);
            setTimeout(() => {
                // 向下滑了
                triggerTouch(vm.find('.som-slide-page-Box'), 'touchstart', 150, 150);
                triggerTouch(vm.find('.som-slide-page-Box'), 'touchmove', 150, 400);
                triggerTouch(vm.find('.som-slide-page-Box'), 'touchend', 150, 400);
                setTimeout(() => {
                    // 向上滑了
                    done();
                }, 100);
            }, 100);
        }, 100);
    });

    it('next btn', (done) => {
        vm = mount({
            template: `
                <som-slide-page class="slide-page" style="height: 500px;">
                    <div class="page-item"></div>
                    <div class="page-item"></div>
                </som-slide-page>
            `
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.find('.next-icon').trigger('click');
            setTimeout(() => {
                expect(vm.find('.som-slide-page-Box').attributes().style).not.to.equal(undefined);
                done();
            }, 100);
        }, 100);
    });

    it('slide-type', () => {
        vm = mount({
            template: `
                <som-slide-page class="slide-page" style="height: 500px;" slide-type="left">
                    <div class="page-item"></div>
                    <div class="page-item"></div>
                </som-slide-page>
            `
        }, {attachToDocument: true});

        expect(vm.find('.leftDisplayFlex')).to.exist;
    });
});

