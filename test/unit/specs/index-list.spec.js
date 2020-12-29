import { createVue, destroyVM, triggerTouch } from '../util';

const list = [
    {key: 'A', title: 'A', data: ['A1', 'A2', 'A3', 'A4']},
    {key: 'B', title: 'B', data: ['B1', 'B2', 'B3', 'B4']},
    {key: 'C', title: 'C', data: ['C1', 'C2', 'C3', 'C4']},
    {key: 'D', title: 'D', data: ['D1', 'D2', 'D3', 'D4']},
    {key: 'E', title: 'E', data: ['E1', 'E2', 'E3', 'E4']},
    {key: 'F', title: 'F', data: ['F1', 'F2', 'F3', 'F4']},
    {key: 'G', title: 'G', data: ['G1', 'G2', 'G3', 'G4']},
    {key: 'H', title: 'H', data: ['H1', 'H2', 'H3', 'H4']},
    {key: 'I', title: 'I', data: ['I1', 'I2', 'I3', 'I4']},
    {key: 'N', title: 'N', data: ['N1', 'N2', 'N3', 'N4']}
];

describe('IndexList', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('list', (done) => {
        vm = createVue({
            template: `
                <div style="position: absolute; height: 400px">
                    <som-index-list 
                        :list="list">
                    </som-index-list>
                </div>
            `,
            data () {
                return {
                    list: list
                };
            }
        }, true);
        setTimeout(() => {
            let indexlist = vm.$el.querySelectorAll('.som-index-list__index .index-item');
            expect(indexlist.length).to.equal(10);
            done();
        }, 200);
    });

    it('item-class', (done) => {
        vm = createVue({
            template: `
                <div style="position: absolute; height: 400px">
                    <som-index-list :list="list" item-class="list-item" ref="indexList">
                        <som-list
                            class="list-item"
                            :title="item.title"
                            :key="index"
                            v-for="(item, index) in list">
                            <som-list-item
                                v-for="(data, i) in item.data"
                                :key="i"
                                :title="data">
                            </som-list-item>
                        </som-list>
                    </som-index-list>
                </div>
            `,
            data () {
                return {
                    list: list
                };
            }
        }, true);
        setTimeout(() => {
            expect(vm.$refs.indexList.Nodes.length).to.equal(10);
            done();
        }, 200);
    });

    it('on-key-change', (done) => {
        vm = createVue({
            template: `
                <div style="position: absolute; height: 400px">
                    <som-index-list 
                        :list="list"
                        @on-key-change="onChange"
                        ref="indexList">
                    </som-index-list>
                </div>
            `,
            data () {
                return {
                    list: list,
                    key: ''
                };
            },
            methods: {
                onChange (key) {
                    this.key = key;
                }
            }
        }, true);
        setTimeout(() => {
            let F = vm.$el.querySelectorAll('.som-index-list__index .index-item')[5];
            F.click();
            setTimeout(() => {
                expect(vm.key).to.equal('F');
                done();
            }, 200);
        }, 200);
    });

    it('on-item-click', (done) => {
        vm = createVue({
            template: `
                <div style="position: absolute; height: 400px">
                    <som-index-list 
                        :list="list"
                        @on-item-click="onClick"
                        ref="indexList">
                    </som-index-list>
                </div>
            `,
            data () {
                return {
                    list: list,
                    val: '',
                    title: ''
                };
            },
            methods: {
                onClick (val, key, title) {
                    this.val = val;
                    this.title = title;
                }
            }
        }, true);
        setTimeout(() => {
            let F = vm.$el.querySelectorAll('.som-list')[5];
            let F4 = F.querySelectorAll('.som-list-item')[3];
            F4.click();
            setTimeout(() => {
                expect(vm.val).to.equal('F4');
                expect(vm.title).to.equal('F');
                done();
            }, 200);
        }, 200);
    });

    it('touch', (done) => {
        vm = createVue({
            template: `
                <div style="position: absolute; height: 400px">
                    <som-index-list 
                        :list="list"
                        @on-key-change="onChange"
                        ref="indexList">
                    </som-index-list>
                </div>
            `,
            data () {
                return {
                    list: list,
                    keys: []
                };
            },
            methods: {
                onChange (key) {
                    this.keys.push(key);
                }
            }
        }, true);
        setTimeout(() => {
            let F = vm.$el.querySelectorAll('.som-index-list__index .index-item')[5];
            let left = F.getBoundingClientRect().left;
            let top = F.getBoundingClientRect().top;
            triggerTouch(F, 'touchstart', left, top);
            setTimeout(() => {
                triggerTouch(F, 'touchmove', left, top - 10);
                setTimeout(() => {
                    triggerTouch(F, 'touchmove', left, top - 22);
                    setTimeout(() => {
                        triggerTouch(F, 'touchend', left, top - 22);
                        setTimeout(() => {
                            expect(vm.keys.length).to.equal(3);
                            expect(vm.keys[0]).length.to.equal('F');
                            expect(vm.keys[2]).length.to.equal('D');
                            done();
                        }, 20);
                    }, 20);
                }, 20);
            }, 20);
        }, 200);
    });

    it('set-active-key', (done) => {
        vm = createVue({
            template: `
                <div style="position: absolute; height: 400px">
                    <som-index-list
                        :list="list"
                        @on-key-change="onChange"
                        ref="indexList">
                    </som-index-list>
                </div>
            `,
            data () {
                return {
                    list: list,
                    index: ''
                };
            },
            methods: {
                onChange (key, index) {
                    this.index = index;
                }
            }
        }, true);
        setTimeout(() => {
            vm.$refs.indexList.setActiveKey('G');
            setTimeout(() => {
                expect(vm.index).to.equal(6);
                done();
            }, 200);
        }, 300);
    });
});

