import { createVue, destroyVM, triggerEvent } from '../util';

describe('Textarea', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('title', () => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea title="好标题" placeholder="请输入"></som-textarea>
                </som-list>  
            `
        }, true);
        expect(vm.$el.querySelector('.som-textarea__label').textContent).to.equal('好标题');
    });

    it('inline-desc', () => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea inline-desc="哈哈哈哈"  placeholder="请输入" title="好标题"></som-textarea>
                </som-list>  
            `
        }, true);
        expect(vm.$el.querySelector('.som-textarea__label-desc').textContent).to.equal('哈哈哈哈');
    });

    it('value', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea v-model="value" ref="textarea"></som-textarea>
                </som-list>  
            `,
            data() {
                return {
                    value: ''
                };
            }
        }, true);
        setTimeout(() => {
            vm.$refs.textarea.$refs.textarea.value = 'hhhhh';
            triggerEvent(vm.$refs.textarea.$refs.textarea, 'input');

            setTimeout(() => {
                expect(vm.value).to.equal('hhhhh');
                done();
            }, 200);
        }, 200);
    });

    it('on-change', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea  @on-change="change" v-model="val"></som-textarea>
                </som-list>  
            `,
            data() {
                return {
                    val: '222',
                    value: ''
                };
            },
            methods: {
                change (val) {
                    this.value = val;
                }
            }
        }, true);
        setTimeout(() => {
            vm.val = '333';
            setTimeout(() => {
                expect(vm.value).to.equal('333');
                done();
            }, 200);
        }, 200);
    });

    it('autosize', (done) => {
        vm = createVue({
            template: `
                <div style="width: 40px">
                    <som-list>
                        <som-textarea placeholder="请输入" autosize ref="textarea" v-model="val" :rows="1"></som-textarea>
                    </som-list>
                </div>  
            `,
            data() {
                return {
                    val: '我我哦我我哦我我很后悔或或或或或或我我哦我我哦我我很后悔或或或或或或我我我哦我我哦我我很后悔或或或或或或我我我哦我我哦我我很后悔或或'
                };
            }
        }, true);
        setTimeout(() => {
            let height0 = vm.$refs.textarea.$refs.textarea.style.height;
            vm.val = 'ah';
            setTimeout(() => {
                let height1 = vm.$refs.textarea.$refs.textarea.style.height;
                expect(height0).not.to.equal(height1);
                done();
            }, 200);
        }, 200);
    });

    it('show-counter', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea show-counter  placeholder="请输入" :max-number="5" v-model="val"></som-textarea>
                </som-list>  
            `,
            data() {
                return {
                    val: '我我哦我我哦我我很后悔或或或或或或我'
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$el.querySelector('.som-textarea__counter').style.display).not.to.equal('none');
            expect(vm.$el.querySelector('.som-textarea__counter span').style.color).to.equal('rgb(255, 64, 64)');
            done();
        }, 200);
    });

    it('max', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea show-counter  placeholder="请输入" :max="5" v-model="val"></som-textarea>
                </som-list>  
            `,
            data() {
                return {
                    val: '我我哦我我哦我我很后悔'
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.val).to.equal('我我哦我我');
            done();
        }, 200);
    });

    it('height', (done) => {
        vm = createVue({
            template: `
                <som-list>
                    <som-textarea :height="200"  placeholder="请输入" ref="textarea"></som-textarea>
                </som-list>  
            `
        }, true);
        setTimeout(() => {
            expect(vm.$refs.textarea.$refs.textarea.style.height).to.equal('200px');
            done();
        }, 200);
    });

    it('autosize obejct', (done) => {
        vm = createVue({
            template: `
                <div style="width: 40px">
                    <som-list>
                        <som-textarea placeholder="请输入" :autosize="autosize" ref="textarea" v-model="val" :rows="1"></som-textarea>
                    </som-list>
                </div>
            `,
            data() {
                return {
                    val: 'hh',
                    autosize: {
                        minHeight: 20,
                        maxHeight: 40
                    }
                };
            }
        }, true);
        setTimeout(() => {
            vm.autosize = false;
            vm.$refs.textarea.$refs.textarea.value = '我我哦我我哦我我很后悔或或或或或或我我我哦我我哦我我很后悔或或或或或或我我我哦我我哦我我很后';
            triggerEvent(vm.$refs.textarea.$refs.textarea, 'input');
            setTimeout(() => {
                expect(vm.$refs.textarea.$refs.textarea.style.height).to.equal('40px');
                done();
            }, 200);
        }, 200);
    });
});

