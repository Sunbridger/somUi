import Vue from 'vue';
import ImageUpload from 'packages/image-upload';
import {createVue, destroyVM} from '../../util';

Vue.use(ImageUpload);
describe('ImageUpload', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('imgList', (done) => {
        vm = createVue({
            template: `
                    <som-image-upload :imgList.sync="imgList"></som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG',
                        'https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            }
        }, true);

        setTimeout(() => {
            expect(vm.$el.querySelectorAll('.som-image-upload__added-img').length).to.equal(2);
            done();
        }, 200);
    });

    it('max', (done) => {
        vm = createVue({
            template: `
                    <som-image-upload :imgList.sync="imgList" :max="2"></som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG',
                        'https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            }
        }, true);

        setTimeout(() => {
            expect(vm.$el.classList.contains('som-image-upload__add-img')).to.be.false;
            done();
        }, 200);
    });

    it('width height', (done) => {
        vm = createVue({
            template: `
                    <som-image-upload :imgList.sync="imgList" :max="3" :width="100" :height="80">
                    </som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            }
        }, true);

        setTimeout(() => {
            expect(vm.$el.querySelector('.som-image-upload__input').style.width).to.equal('100px');
            expect(vm.$el.querySelector('.som-image-upload__input').style.height).to.equal('80px');
            done();
        }, 200);
    });

    it('lazy', (done) => {
        vm = createVue({
            template: `
                    <som-image-upload :imgList.sync="imgList" :max="3" :lazy="false">
                    </som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG',
                        'https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            }
        }, true);

        setTimeout(() => {
            expect(vm.$el.querySelector('.som-image-upload__added-img img').lazy).to.equal(undefined);
            done();
        }, 200);
    });

    it('show and delete', (done) => {
        vm = createVue({
            template: `
                    <som-image-upload :imgList.sync="imgList" :max="3" :lazy="false" deletable>
                    </som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG',
                        'https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            }
        }, true);

        setTimeout(() => {
            vm.$el.querySelector('.oss-image').click();
            setTimeout(() => {
                expect(vm.$el.querySelector('.pswp--open')).to.exist;
                vm.$el.querySelector('.pswp--open .delete').click();
                setTimeout(() => {
                    expect(vm.$el.querySelectorAll('.oss-image').length).to.equal(1);
                    done();
                }, 300);
            }, 1000);
        }, 200);
    });

    it('upload', (done) => {
        vm = createVue({
            template: `
                    <som-image-upload
                        :needCompress="false"
                        ref="upload"
                        :imgList.sync="imgList" :max="3" :lazy="false">
                    </som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            }
        }, true);

        const files = [{
            name: 'fail.png',
            type: 'image'
        }];

        let upload = vm.$refs.upload;
        upload.httpRequest = () => {
            return Promise.resolve({
                status: 200,
                data: {
                    success: 1,
                    path: 'https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG'
                }
            });
        };

        setTimeout(() => {
            upload.upload(new Blob());
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.oss-image').length).to.equal(2);
                done();
            }, 300);
        }, 200);
    });

    it('upload error', (done) => {
        const spy = sinon.spy();
        vm = createVue({
            template: `
                    <som-image-upload
                        ref="upload"
                        @error="error"
                        :imgList.sync="imgList" :max="3" :lazy="false">
                    </som-image-upload>
                    `,
            data () {
                return {
                    imgList: ['https://img.souche.com/f2e/bym0zm05xlby6nsac0zu1w5jy1hmlerb.JPG']
                };
            },
            methods: {
                error () {
                    spy();
                }
            }
        }, true);

        let upload = vm.$refs.upload;
        upload.httpRequest = () => {
            return Promise.reject('net error');
        };

        setTimeout(() => {
            upload.upload(new Blob(), '20190603');
            setTimeout(() => {
                expect(spy.calledOnce).to.true;
                done();
            }, 200);
        }, 200);
    });
});

