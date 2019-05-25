import sinon from 'sinon';
import { getOrCreateApp } from '../scene/AppProxy';
import axios from 'axios';
import * as actions from './scene';
import * as types from './types';
jest.mock('../scene/AppProxy');
jest.mock('axios');

describe('actions - scene', () => {

    let getOrCreateAppReturnStub,
        addAmbientLight,
        addSunLight,
        addSphere,
        addCube,
        addCylinder,
        parseScene;

    beforeEach(() => {

        addAmbientLight = sinon.spy();
        addSunLight = sinon.spy();
        addSphere = sinon.spy();
        addCube = sinon.spy();
        addCylinder = sinon.spy();
        parseScene = sinon.spy();

        getOrCreateAppReturnStub = Promise.resolve({
            addAmbientLight,
            addSunLight,
            addSphere,
            addCube,
            addCylinder,
            parseScene
        });

        getOrCreateApp.mockClear();
        axios.mockClear();
        axios.get.mockClear();
        axios.post.mockClear();
        getOrCreateApp.mockReturnValue(getOrCreateAppReturnStub);
    });

    it('requestSceneJson should return right type', () => {
        expect(actions.requestSceneJson()).toEqual({ type: types.SCENE_SAVE_REQUEST });
    });

    it('sceneSaveLoading should return right type', () => {
        expect(actions.sceneSaveLoading()).toEqual({ type: types.SCENE_SAVE_LOADING });
    });

    it('sceneSaveSuccess should return right type', () => {
        expect(actions.sceneSaveSuccess()).toEqual({ type: types.SCENE_SAVE_SUCCESS });
    });

    it('sceneSaveFailure should return right type', () => {
        expect(actions.sceneSaveFailure()).toEqual({ type: types.SCENE_SAVE_FAILURE });
    });

    it('projectRunning should return right type', () => {
        const url = 'test';
        expect(actions.projectRunning(url)).toEqual({ type: types.PROJECT_RUNNING, url });
    });

    it('projectStopped should return right type', () => {
        expect(actions.projectStopped()).toEqual({ type: types.PROJECT_STOPPED });
    });

    it('projectPlayerVisible should return right type if flag is true', () => {
        const flag = true;
        let value = {};
        const returnF = f => value = f;

        actions.projectPlayerVisible(flag)(returnF);

        expect(value).toEqual({ type: types.PROJECT_PLAYER_VISIBLE });
    });

    it('projectPlayerVisible should return right type if flag is false', () => {
        const flag = false;
        let value = {};
        const returnF = f => value = f;

        actions.projectPlayerVisible(flag)(returnF);

        expect(value).toEqual({ type: types.PROJECT_PLAYER_HIDDEN });
    });

    describe('addLight', () => {

        it('should call getOrCreateApp', () => {
            actions.addLight('');
            expect(getOrCreateApp).toHaveBeenCalledTimes(1);
        });

        it('should call addAmbientLight if type is AMBIENT', (done) => {
            actions.addLight(actions.AMBIENT);

            setTimeout(() => {
                expect(addAmbientLight.called).toBe(true);
                done();
            }, 50);
        });

        it('should call addSunLight of type is SUN', (done) => {
            actions.addLight(actions.SUN);

            setTimeout(() => {
                expect(addSunLight.called).toBe(true);
                done();
            }, 50);
        });
    });

    describe('addMesh',() => {

        it('should call getOrCreateApp', () => {
            actions.addMesh('');

            expect(getOrCreateApp).toHaveBeenCalledTimes(1);
        });

        it('should call addCube if type is CUBE', (done) => {
            actions.addMesh(actions.CUBE);

            setTimeout(() => {
                expect(addCube.called).toBe(true);
                done();
            }, 150);
        });

        it('should call addSphere if type is SPHERE', (done) => {
            actions.addMesh(actions.SPHERE);

            setTimeout(() => {
                expect(addSphere.called).toBe(true);
                done();
            }, 150);
        });

        it('should call addCylinder if type is CYLINDER', (done) => {
            actions.addMesh(actions.CYLINDER);

            setTimeout(() => {
                expect(addCylinder.called).toBe(true);
                done();
            }, 150);
        });
    });

    describe('saveScene', () => {

        it('should make a POST to right url with right payload', () => {
            axios.post.mockReturnValue(Promise.resolve());
            actions.saveScene('scene', { "value": "test" })(f => f);

            expect(axios.post).toHaveBeenCalledWith('api/scenes/scene', { scene: "{\"value\":\"test\"}" });
        });
    });

    describe('loadScene', () => {

        it('should call getOrCreateApp', (done) => {
            axios.get.mockReturnValue(Promise.resolve({ data: {} }));
            actions.loadScene('scene')(f => f);
            setTimeout(() => {
                expect(getOrCreateApp).toHaveBeenCalledTimes(1);
                done();
            }, 50);
        });

        it('should make a GET to right url', (done) => {
            axios.get.mockReturnValue(Promise.resolve({ data: {} }));
            actions.loadScene('scene')(f => f);

            setTimeout(() => {
                expect(axios.get).toHaveBeenCalledWith('api/scenes/scene');
                done();
            });
        }, 50);

        it('should call parseScene', (done) => {
            axios.get.mockReturnValue(Promise.resolve({ data: {} }));
            actions.loadScene('scene')(f => f);

            setTimeout(() => {
                expect(parseScene.called).toBe(true);
                done();
            }, 50);
        });
    });

    describe('startProject', () => {

        it('should make a POST to right url', (done) => {
            axios.post.mockReturnValue(Promise.resolve('http://localhost:4000'));

            actions.startProject('project')(f => f);

            setTimeout(() => {
                expect(axios.post).toHaveBeenCalledWith('api/projects/project/start');
                done();
            }, 50);
        });
    });
    //
    describe('stopProject', () => {

        it('should make a POST to right url', (done) => {
            axios.post.mockReturnValue(Promise.resolve('http://localhost:4000'));

            actions.stopProject('project')(f => f);

            setTimeout(() => {
                expect(axios.post).toHaveBeenCalledWith('api/projects/project/stop');
                done();
            }, 50);
        });
    })
});