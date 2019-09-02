import sinon from 'sinon';
import { ncp } from 'ncp';
import path from 'path';
import fs from 'fs';

import SceneHelper from './SceneHelper';
import FileHelper from './files/FileHelper';
import Scene from './files/Scene';

jest.mock('ncp');
jest.mock('path');
jest.mock('fs');
jest.mock('./files/FileHelper');
jest.mock('./files/Scene');

describe('SceneHelper', () => {

    const fakeSceneData = {
        data: 'fake data'
    };

    beforeEach(() => {
        ncp.mockClear();

        FileHelper.fileFromPath.mockClear();

        Scene.mockClear();
        Scene.mockImplementation(() => (
            { setContent: sinon.spy(), type: 'scene', read: sinon.spy(), toJSON: () => fakeSceneData }
        ));

        path.join.mockClear();
        path.resolve.mockClear();
        path.join.mockImplementation((...bits) => bits.join('/'));
        path.resolve.mockImplementation(p => p);

        fs.existsSync.mockClear();
        fs.existsSync.mockImplementation(() => true);
    });

    describe('create', () => {

        it('should copy scene files from template to destination', () => {
            SceneHelper.create('destination', 'sceneName');

            expect(ncp).toHaveBeenCalledTimes(1);
        });

        it('should copy scene files from right template path to right destination', () => {
            SceneHelper.create('destination', 'sceneName');
            const expectedSrc = 'server/templates/scene';
            const expectedDestination = 'destination/src';

            expect(ncp).toHaveBeenCalledWith(expectedSrc, expectedDestination, expect.any(Function));
        });

        it('should call SceneHelper rename after done copying', () => {
            ncp.mockImplementation((a, b, c) => c());
            const stub = sinon.stub(SceneHelper, 'rename');

            SceneHelper.create('destination', 'test');

            expect(stub.calledWith('destination/src', 'BaseScene', 'test')).toBe(true);

            stub.restore();
        });

        it('should return a rejected promise if it fails copying files over', () => {
            ncp.mockImplementation((a, b, c) => c('error'));

            expect(SceneHelper.create('destination', 'test')).rejects.toEqual('error');
            
        });

        it('should return a resolved promise if everything goes according to plan', () => {
            ncp.mockImplementation((a, b, c) => c());
            const stub = sinon.stub(SceneHelper, 'rename').returns(true);

            expect(SceneHelper.create('destination', 'test')).resolves.toEqual(undefined);

            stub.restore();
        });

        it('should return a rejected promise if it fails renaming', () => {
            ncp.mockImplementation((a, b, c) => c());
            const stub = sinon.stub(SceneHelper, 'rename').returns(false);

            expect(SceneHelper.create('destination', 'test')).rejects.toEqual(undefined);

            stub.restore();
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