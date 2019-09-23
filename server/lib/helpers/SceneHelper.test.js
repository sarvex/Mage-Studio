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
    });

    describe('create', () => {

        let renameStub,
            renameSceneClassnameStub;

        beforeEach(() => {
            renameStub = sinon.stub(SceneHelper, 'rename');
            renameSceneClassnameStub = sinon.stub(SceneHelper, 'renameSceneClassname');
        });

        afterEach(() => {
            SceneHelper.rename.restore();
            SceneHelper.renameSceneClassname.restore();
        });

        it('should copy scene files from template to destination', async () => {
            renameStub.returns(true);
            renameSceneClassnameStub.returns(true);

            ncp.mockImplementation((s, d, cb) => cb());

            await SceneHelper.create('destination', 'sceneName');

            expect(ncp).toHaveBeenCalledTimes(1);
        });

        it('should copy scene files from right template path to right destination', async () => {
            renameStub.returns(true);
            renameSceneClassnameStub.returns(true);

            ncp.mockImplementation((s, d, cb) => cb());

            await SceneHelper.create('destination', 'sceneName');
            const expectedSrc = 'server/templates/scene';
            const expectedDestination = 'destination/src';

            expect(ncp).toHaveBeenCalledWith(expectedSrc, expectedDestination, expect.any(Function));
        });

        it('should call SceneHelper rename after done copying', async () => {
            renameStub.callsFake(_ => true);
            renameSceneClassnameStub.callsFake(_ => true);

            ncp.mockImplementation((s, d, cb) => cb());

            await SceneHelper.create('destination', 'test');

            expect(renameStub.calledWith('destination/src', 'BaseScene', 'test')).toBe(true);
        });

        it('should call sceneHelper renameSceneClassname after done copying', async () => {
            renameStub.callsFake(_ => true);
            renameSceneClassnameStub.callsFake(_ => true);

            ncp.mockImplementation((s, d, cb) => cb());

            await SceneHelper.create('destination', 'test');

            expect(renameSceneClassnameStub.calledWith('destination/src', 'test')).toBe(true);
        });

        it('should return a rejected promise if it fails copying files over', () => {
            ncp.mockImplementation((a, b, c) => c('error'));

            expect(SceneHelper.create('destination', 'test')).rejects.toEqual('error');
        });

        it('should return a resolved promise if everything goes according to plan', () => {
            renameStub.callsFake(_ => true);
            renameSceneClassnameStub.callsFake(_ => true);

            ncp.mockImplementation((s, d, cb) => cb());

            expect(SceneHelper.create('destination', 'test')).resolves.toEqual([ true, true ]);
        });

        it('should return a rejected promise if it fails renaming', () => {
            renameStub.callsFake(_ => new Error('error'));
            renameSceneClassnameStub.callsFake(_ => true);
            ncp.mockImplementation((s, d, cb) => cb());

            expect(SceneHelper.create('destination', 'test')).rejects.toEqual('error');
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
