import sinon from 'sinon';
import fs from 'fs';
import File from './File';
jest.mock('fs');

const TEST_UUID = 'aaaaaaaa-dddd-cccc-bbbb-000000000000';

describe('File', () => {

    beforeEach(() => {
        fs.mkdir.mockClear();
        fs.openSync.mockClear();
        fs.writeSync.mockClear();
        fs.closeSync.mockClear();
        fs.readFileSync.mockClear();
    });

    it('creating a new file should set path', () => {
        const file = new File('marco.txt', '/path/to', TEST_UUID);

        expect(file.fullPath).toBe('/path/to/marco.txt');
    });

    it('toJSON should give the right output', () => {
        const file = new File('marco.txt', '/path/to', TEST_UUID);

        const expected = {
            name: 'marco.txt',
            extension: '.txt',
            uuid: "bbca4bc0-229a-5d22-9ccd-93cc3a6263c5",
            folder: '/path/to',
            fullPath: '/path/to/marco.txt'
        };

        expect(file.toJSON()).toStrictEqual(expected);
    });

    describe('read', () => {

        it('should return false if file doesnt exist', () => {
            const file = new File('marco.txt', '/path/to', TEST_UUID);
            sinon.stub(file, 'exists').callsFake(() => false);

            expect(file.read()).toBe(false);
        });

        it('should return the content if file exists', () => {
            const file = new File('marco.txt', '/path/to', TEST_UUID);
            fs.readFileSync.mockReturnValue('test');
            sinon.stub(file, 'exists').callsFake(() => true);

            expect(file.read()).toBe('test');
        });
    });

    describe('Write', () => {

        it('should do nothing if it has no content', () => {
            const file = new File('marco.txt', '/path/to', TEST_UUID);
            sinon.stub(file, 'hasContent').callsFake(() => false);

            expect(file.write()).toBe(false);
        });

        it('should write if it has content and is Buffer and folder exists', () => {
            const file = new File('marco.txt', '/path/to', TEST_UUID);
            file.isBuffer = true;
            file.content = 'test';

            sinon.stub(file, 'folderExists').callsFake(() => true);
            sinon.stub(file, 'hasContent').callsFake(() => true);

            file.write();

            expect(fs.openSync).toHaveBeenCalledTimes(1);
            expect(fs.writeSync).toHaveBeenCalledTimes(1);
            expect(fs.closeSync).toHaveBeenCalledTimes(1);
        });

        it('should write if it has content and is Buffer and folder does not exists', () => {
            const file = new File('marco.txt', '/path/to', TEST_UUID);
            fs.mkdir.mockImplementation((f, opts, cb) => cb());
            file.isBuffer = true;
            file.content = 'test';

            sinon.stub(file, 'folderExists').callsFake(() => false);
            sinon.stub(file, 'hasContent').callsFake(() => true);

            file.write();

            expect(fs.mkdir).toHaveBeenCalledTimes(1);
            expect(fs.openSync).toHaveBeenCalledTimes(1);
            expect(fs.writeSync).toHaveBeenCalledTimes(1);
            expect(fs.closeSync).toHaveBeenCalledTimes(1);
        });

        // it('should write text if it has content and is not buffer')
    });
});