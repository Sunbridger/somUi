import Table from 'packages/table';
import { createTest, destroyVM } from '../../util';

describe('Table', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createTest(Table, true);
        expect(vm.$el).to.exist;
    });
});

