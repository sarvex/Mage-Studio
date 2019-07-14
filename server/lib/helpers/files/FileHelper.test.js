import sinon from 'sinon';
import Scene from './Scene';
import Asset from './Asset';
import Script from './Script';
import Model from './Model';
import FileHelper from './FileHelper';

jest.mock('./Scene');
jest.mock('./Asset');
jest.mock('./Script');
jest.mock('./Model');

describe('FileHelper', () => {

    let setContentSpy;

    beforeEach(() => {
        setContentSpy = sinon.spy();
        Model.mockClear();
        Model.mockImplementation(() => (
            { setContent: sinon.spy(), type: 'model', read: sinon.spy() }
        ));

        Asset.mockClear();
        Asset.mockImplementation(() => (
            { setContent: sinon.spy(), type: 'asset', read: sinon.spy() }
        ));

        Scene.mockClear();
        Scene.mockImplementation(() => (
            { setContent: sinon.spy(), type: 'scene', read: sinon.spy() }
        ));

        Script.mockClear();
        Script.mockImplementation(() => (
            { setContent: sinon.spy(), type: 'script', read: sinon.spy() }
        ));
    });

    describe('FileFromBuffer', () => {

        it('should return a Model if type is MODEL', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.MODEL_TYPE(), {});

            expect(file.type).toBe('model');
        });

        it('should return a Asset if type is IMAGE', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.IMAGE_TYPE(), {});

            expect(file.type).toBe('asset');
        });

        it('should return an Asset if type is TEXTURE', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.TEXTURE_TYPE(), {});

            expect(file.type).toBe('asset');
        });

        it('should return a Scene if type is SCENE', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.SCENE_TYPE(), {});

            expect(file.type).toBe('scene');
        });

        it('should call setContent when creating a model', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.MODEL_TYPE(), {});

            expect(file.setContent.called).toBe(true);
        });

        it('should call setContent when creating a image', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.IMAGE_TYPE(), {});

            expect(file.setContent.called).toBe(true);
        });

        it('should call setContent when creating a texture', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.TEXTURE_TYPE(), {});

            expect(file.setContent.called).toBe(true);
        });

        it('should call setContent when creating a scene', () => {
            const file = FileHelper.fileFromBuffer('filename', FileHelper.SCENE_TYPE(), {});

            expect(file.setContent.called).toBe(true);
        });

    });

    describe('FileFromPath', () => {

        it('should return a Model if type is MODEL', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.MODEL_TYPE());

            expect(file.type).toBe('model');
        });

        it('should return a Asset if type is IMAGE', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.IMAGE_TYPE());

            expect(file.type).toBe('asset');
        });

        it('should return an Asset if type is TEXTURE', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.TEXTURE_TYPE());

            expect(file.type).toBe('asset');
        });

        it('should return an Asset if type is SCRIPT', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.SCRIPT_TYPE());

            expect(file.type).toBe('script');
        });

        it('should return a Scene if type is SCENE', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.SCENE_TYPE());

            expect(file.type).toBe('scene');
        });

        it('should call read when creating a model', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.MODEL_TYPE());

            expect(file.read.called).toBe(true);
        });

        it('should call read when creating a image', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.IMAGE_TYPE());

            expect(file.read.called).toBe(true);
        });

        it('should call read when creating a texture', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.TEXTURE_TYPE());

            expect(file.read.called).toBe(true);
        });

        it('should call read when creating a script', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.SCRIPT_TYPE());

            expect(file.read.called).toBe(true);
        });

        it('should call read when creating a scene', () => {
            const file = FileHelper.fileFromPath('filename', FileHelper.SCENE_TYPE());

            expect(file.read.called).toBe(true);
        });
    });

    describe('fileHasExtension', () => {

        it('should return true if filename has an extension', () => {
            const filename = 'simplefilename.js';
            expect(FileHelper.fileHasExtension(filename)).toBe(true);

        });

        it('should return false if filename doesnt have an extension', () => {
            const filename = 'noextension';
            expect(FileHelper.fileHasExtension(filename)).toBe(false);
        });
    });
});