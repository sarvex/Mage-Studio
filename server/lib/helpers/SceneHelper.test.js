import sinon from 'sinon';
import { ncp } from 'ncp';
import path from 'path';
import fs from 'fs';

import SceneHelper from './SceneHelper';
import FileHelper from './files/FileHelper';
import Scene from './files/Scene';
import Zipper from '../Zipper';
import Downloader from '../Downloader';

jest.mock('ncp');
jest.mock('path');
jest.mock('fs');
jest.mock('./files/FileHelper');
jest.mock('./files/Scene');

jest.mock('../Zipper');
jest.mock('../Downloader');

describe.only('SceneHelper', () => {

    const fakeSceneData = {
        data: 'fake data'
    };

    let renameSceneClassnameStub;

    beforeEach(() => {
        ncp.mockClear();

        FileHelper.fileFromPath.mockClear();

        Scene.mockClear();
        Scene.mockImplementation(() => ({
                setContent: sinon.spy(),
                type: 'scene',
                read: sinon.spy(),
                toJSON: () => fakeSceneData
            })
        );

        path.join.mockClear();
        path.resolve.mockClear();
        path.join.mockImplementation((...bits) => bits.join('/'));
        path.resolve.mockImplementation(p => p);

        fs.existsSync.mockClear();
        fs.renameSync.mockClear();
        fs.existsSync.mockImplementation(() => true);

        Zipper.unzip.mockClear();
        Zipper.unzip.mockImplementation(() => Promise.resolve());

        Downloader.downloadFileToPath.mockClear();
        Downloader.downloadFileToPath.mockImplementation(() => Promise.resolve());

        FileHelper.createFolder.mockClear();
        FileHelper.createFolder.mockImplementation(() => Promise.resolve());

        renameSceneClassnameStub = sinon.stub(SceneHelper, 'renameSceneClassname');
    });

    afterEach(() => {
        SceneHelper.renameSceneClassname.restore();
    });

    describe('create', () => {

        it('should call FileHelper.createFolder', async () => {
            await SceneHelper.create('/fake/destination', 'sceneName');
            expect(FileHelper.createFolder).toHaveBeenCalledTimes(1);
        });

        it('should call Downloader.downloadFileToPath with the right url and path', async () => {
            await SceneHelper.create('/fake/destination', 'sceneName');
            expect(Downloader.downloadFileToPath).toHaveBeenCalledTimes(1);
        });

        it('should call Zipper.unzip with the right path', async () => {
            await SceneHelper.create('/fake/destination', 'sceneName');
            expect(Zipper.unzip).toHaveBeenCalledTimes(1);
        });

        it('should call SceneHelper.renameSceneClassname with the right params', async () => {
            await SceneHelper.create('/fake/destination', 'sceneName');
            expect(SceneHelper.renameSceneClassname.called).toEqual(true);
        });

    });

    describe('rename', () => {

        it('should call renameSync on fs', () => {
            SceneHelper.rename('destination', 'old', 'new');

            expect(fs.renameSync).toHaveBeenCalledTimes(1);
        });

        it('should call renameSync on fs with right parameters', () => {
            SceneHelper.rename('destination', 'old', 'new');

            expect(fs.renameSync).toHaveBeenCalledWith('destination/old', 'destination/new');
        });
    });

    describe('readSceneData', () => {

        it('should return an empty object if provided scene does not exist', () => {
            const toJSONStub = sinon.stub().returns({ content: 'fake' });
            FileHelper.fileFromPath.mockImplementation(() => {
                toJSON: toJSONStub
            });

            const stub = sinon.stub(SceneHelper, 'exists').returns(false);

            const content = SceneHelper.readSceneData('i do not exist');

            expect(content).toEqual({});

            stub.restore();
        });

        it('should get a scene from FileHelper', () => {
            FileHelper.fileFromPath.mockImplementation(() => new Scene());

            const stub = sinon.stub(SceneHelper, 'exists').returns(true);

            const content = SceneHelper.readSceneData('i do exist');

            expect(content).toEqual(fakeSceneData);

            stub.restore();
        });
    });

    describe('exists', () => {

        it('should call existsSync on fs', () => {
            const sceneName = 'test';

            SceneHelper.exists(sceneName);

            expect(fs.existsSync).toHaveBeenCalledTimes(1);
        });

        it('should return false if provided name is falsy', () => {
            const sceneName = undefined;

            expect(SceneHelper.exists(sceneName)).toBe(false);
        });
    })

});
