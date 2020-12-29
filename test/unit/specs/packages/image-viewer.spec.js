import Vue from 'vue';
import ImageViewer from 'packages/image-viewer';
import { mount } from '@vue/test-utils';

Vue.use(ImageViewer);
describe('ImageViewer', () => {
    let vm;

    afterEach(() => {
        vm.destroy();
    });

    it('directive', (done) => {
        vm = mount({
            template: `
                <div>
                    <som-image-viewer ref="viewer1" :deletable="true" @on-delete="handleDelete"></som-image-viewer>
                    <ul class="image-container" v-image-viewer:viewer1>
                        <li v-for="(item, index) in porps" :key="index">
                            <img :src="item.src"/>
                        </li>
                    </ul>
                </div>
            `,
            data () {
                return {
                    deleteIndex: '',
                    porps: [
                        { src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg'},
                        { src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg'}
                    ]
                };
            },
            methods: {
                handleDelete (index) {
                    this.deleteIndex = index;
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.find('.image-container img').trigger('click');
            setTimeout(() => {
                expect(document.querySelector('.pswp').classList.contains('pswp--visible')).to.true;
                expect(document.querySelector('.som-image-viewer').textContent).to.equal('01\n                / 02\n            ');
                document.querySelector('.som-image-viewer .delete').click();
                setTimeout(() => {
                    expect(vm.vm.deleteIndex).to.equal(0);
                    document.querySelector('.som-image-viewer .close').click();
                    setTimeout(() => {
                        expect(document.querySelector('.pswp').classList.contains('pswp--visible')).to.false;
                        done();
                    }, 500);
                }, 10);
            }, 500);
        }, 10);
    });


    it('list', (done) => {
        vm = mount({
            template: `
                <som-image-viewer
                    ref="viewer4"
                    :list="porps"
                    show-tab-lenth
                    :showPreview="true"
                    ></som-image-viewer>
            `,
            data () {
                return {
                    deleteIndex: '',
                    porps: [
                        {
                            src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg',
                            tab: '动漫'
                        },
                        {
                            src: 'http://img.souche.com/f2e/743a985bbf89cf8f61c7790699d3ddbb.jpg',
                            tab: '海洋'
                        },
                        {
                            src: 'http://img.souche.com/f2e/f40ac95e09e4e69608f0724b6a99a5a3.jpg',
                            tab: '风景'
                        },
                        {
                            src: 'http://img.souche.com/f2e/d4ad9ae2a84883393ae02a7ae494fc35.jpg',
                            tab: '风景'
                        }
                    ]
                };
            },
            methods: {
                show () {
                    this.$refs.viewer4.show(0, 0);
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.vm.show();
            setTimeout(() => {
                let tabs = document.querySelectorAll('.som-image-viewer__tab li');
                expect(tabs.length).to.equal(3);
                expect(tabs[0].textContent).to.equal('动漫(1)');
                expect(tabs[1].textContent).to.equal('海洋(1)');
                expect(tabs[2].textContent).to.equal('风景(2)');


                document.querySelectorAll('.som-image-viewer__preview li')[1].click();
                setTimeout(() => {
                    expect(document.querySelector('.som-image-viewer__tab .active').textContent).to.equal('海洋(1)');
                    expect(document.querySelector('.som-image-viewer__footer .page-tag').textContent).to.equal('\n                02/04\n            ');

                    tabs[2].click();
                    setTimeout(() => {
                        expect(document.querySelector('.som-image-viewer__tab .active').textContent).to.equal('风景(2)');
                        expect(document.querySelector('.som-image-viewer__footer .page-tag').textContent).to.equal('\n                03/04\n            ');
                        done();
                    }, 10);
                }, 10);
            }, 500);
        }, 10);
    });

    it('checkReport', (done) => {
        vm = mount({
            template: `
                <som-image-viewer
                    ref="viewer4"
                    :list="porps"
                    :checkReport="true"
                    ></som-image-viewer>
            `,
            data () {
                return {
                    porps: [
                        {
                            src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg',
                            title: '这是一辆黑色的车子',
                            description: '这里有一个描述哈哈哈哈哈哈哈哈哈哈',
                            littleTag: 'http://img.souche.com/f2e/26a4c0c7ece38bbef6fea8e966eb4862.png'
                        },
                        {
                            src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg',
                            title: '2.jpg'
                        }
                    ]
                };
            },
            methods: {
                show () {
                    this.$refs.viewer4.show(0);
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.vm.show();
            setTimeout(() => {
                expect(document.querySelector('.som-image-viewer__checkmsg .check-title span').textContent).to.equal('这是一辆黑色的车子');
                done();
            }, 800);
        }, 10);
    });

    it('simple', (done) => {
        vm = mount({
            template: `
                <ul class="image-container">
                    <li v-for="(item, index) in porps" :key="index">
                        <img :src="item.src" v-image-viewer="item.src"/>
                    </li>
                </ul>
            `,
            data () {
                return {
                    porps: [
                        { src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg'},
                        { src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg'}
                    ]
                };
            },
            methods: {
                show () {
                    this.$refs.viewer4.show(0);
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.find('.image-container img').trigger('click');
            setTimeout(() => {
                expect(document.querySelector('.pswp').classList.contains('pswp--visible')).to.true;
                done();
            }, 800);
        }, 10);
    });

    it('list change', (done) => {
        vm = mount({
            template: `
                <som-image-viewer
                    ref="viewer4"
                    :list="porps"
                    :showPreview="true"
                    ></som-image-viewer>
            `,
            data () {
                return {
                    deleteIndex: '',
                    porps: [
                        {
                            src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg',
                            tab: '动漫'
                        },
                        {
                            src: 'http://img.souche.com/f2e/743a985bbf89cf8f61c7790699d3ddbb.jpg',
                            tab: '海洋'
                        },
                        {
                            src: 'http://img.souche.com/f2e/f40ac95e09e4e69608f0724b6a99a5a3.jpg',
                            tab: '风景'
                        },
                        {
                            src: 'http://img.souche.com/f2e/d4ad9ae2a84883393ae02a7ae494fc35.jpg',
                            tab: '风景'
                        }
                    ]
                };
            },
            methods: {
                show () {
                    this.$refs.viewer4.show(0, 0);
                }
            }
        }, {attachToDocument: true});

        setTimeout(() => {
            vm.vm.show();
            setTimeout(() => {
                let tabs = document.querySelectorAll('.som-image-viewer__tab li');
                expect(tabs.length).to.equal(3);
                expect(tabs[0].textContent).to.equal('动漫');
                expect(tabs[1].textContent).to.equal('海洋');
                expect(tabs[2].textContent).to.equal('风景');

                vm.vm.porps = [
                    {
                        src: 'http://img.souche.com/f2e/94f33c45f27cd4622c9be4568112260f.jpg',
                        tab: '动漫'
                    }
                ];

                setTimeout(() => {
                    let tabs = document.querySelectorAll('.som-image-viewer__tab li');
                    expect(tabs.length).not.to.equal(3);
                    done();
                }, 500);
            }, 500);
        }, 10);
    });
});

