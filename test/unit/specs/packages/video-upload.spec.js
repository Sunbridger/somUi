import VideoUpload from 'packages/video-upload';
import { createTest, destroyVM } from '../../util';

describe('VideoUpload', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(VideoUpload, true);
        expect(vm.$el).to.exist;
    });
});

