// import tar from 'tar';
import path from 'path';
import { spawn } from 'child_process';

import NpmHelper from './NpmHelper';

// jest.mock('tar');
jest.mock('path');
jest.mock('child_process');

describe.only('NpmHelper', () => {

    beforeEach(() => {
        // tar.Extract.mockImplementation(() => Promise.resolve());
        path.resolve.mockImplementation((...stuff) => stuff.join('/'));
    });

    afterEach(() => {
        // tar.Extract.mockClear();
        path.resolve.mockClear();
        spawn.mockClear();
    });

    // describe('extract', () => {
    //
    //     it.todo('should call tar.x to extract the modules', (done) => {
    //         const fakePath = 'fake';
    //         NpmHelper.extract(fakePath);
    //
    //         setTimeout(() => {
    //             expect(tar.Extract).toHaveBeenCalledWith({
    //                 file: 'fake/modules.tgz',
    //                 cwd: 'fake'
    //             });
    //             done();
    //         });
    //     });
    //
    //     it.todo('should call path.resolve to get the right project Path', async () => {
    //         const fakePath = 'fake';
    //         await NpmHelper.extract(fakePath);
    //
    //         expect(path.resolve).toHaveBeenCalledWith(fakePath, 'modules.tgz');
    //     });
    // });

    describe('build', () => {

        it('should spawn a new process with right parameters', () => {
            const fakePath = 'fake';
            NpmHelper.build(fakePath);

            expect(spawn).toHaveBeenCalledWith('npm', [
                'run',
                'build',
                '--prefix',
                `${fakePath}`
            ], { stdio: 'inherit' });
        });
    })
});
