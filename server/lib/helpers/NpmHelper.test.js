import path from 'path';
import { spawn } from 'child_process';

import NpmHelper from './NpmHelper';

jest.mock('path');
jest.mock('child_process');

describe('NpmHelper', () => {

    beforeEach(() => {
        path.resolve.mockImplementation((...stuff) => stuff.join('/'));
    });

    afterEach(() => {
        path.resolve.mockClear();
        spawn.mockClear();
    });

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
