import sinon from 'sinon';

import tar from 'tar';
import path from 'path';
import { spawn } from 'child_process';

import NpmHelper from './NpmHelper';

jest.mock('tar');
jest.mock('path');
jest.mock('child_process');


describe('NpmHelper', () => {

    beforeEach(() => {
        path.resolve.mockImplementation((...stuff) => stuff.join('/'));
    });

    afterEach(() => {
        path.resolve.mockClear();
    });

    describe('extract', () => {

        it('should call tar.x to extract the modules', (done) => {
            const fakePath = 'fake';
            NpmHelper.extract(fakePath);

            setTimeout(() => {
                expect(tar.x).toHaveBeenCalledWith({
                    file: 'fake/modules.tgz',
                    cwd: 'fake'
                })
                done();
            })
        });

        it.todo('should call path.resolve to get the right project Path');
    });

    describe('build', () => {

        it.todo('should spawn a new process with right parameters');
    })
});
