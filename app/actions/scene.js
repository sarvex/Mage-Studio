import {
    SCENE_SAVE_REQUEST,
    SCENE_SAVE_LOADING,
    SCENE_SAVE_SUCCESS,
    SCENE_SAVE_FAILURE,
    PROJECT_RUNNING,
    PROJECT_STOPPED,
    PROJECT_PLAYER_VISIBLE,
    PROJECT_PLAYER_HIDDEN
} from './types';
import {
    getProjectsUrl,
    getScenesUrl,
    MIMETYPES
} from '../lib/constants';
import { getOrCreateApp } from '../scene/AppProxy';
import axios from 'axios';

export const CUBE = 'cube';
export const SPHERE = 'sphere';
export const CYLINDER = 'cylinder';
export const AMBIENT = 'ambient';
export const SUN = 'sun';

export const requestSceneJson = () => ({
    type: SCENE_SAVE_REQUEST,
});

export const sceneSaveLoading = () => ({
    type: SCENE_SAVE_LOADING
});

export const sceneSaveSuccess = () => ({
    type: SCENE_SAVE_SUCCESS
});

export const sceneSaveFailure = () => ({
    type: SCENE_SAVE_FAILURE
});

export const projectRunning = (url) => ({
    type: PROJECT_RUNNING,
    url
});

export const projectStopped = () => ({
    type: PROJECT_STOPPED
});

export const projectPlayerVisible = (visible) => (dispatch) => {
    dispatch({
        type: visible ? PROJECT_PLAYER_VISIBLE : PROJECT_PLAYER_HIDDEN
    })
};

export const addLight = (type) => {
    getOrCreateApp()
        .then(app => {
           switch(type) {
               case AMBIENT:
                   app.addAmbientLight();
                   break;
               case SUN:
                   app.addSunLight();
                   break;
               default:
                   break;
           }
        });
};

export const addMesh = (type) => {
    getOrCreateApp()
        .then((app) => {
            switch(type) {
                case CUBE:
                    app.addCube();
                    break;
                case SPHERE:
                    app.addSphere();
                    break;
                case CYLINDER:
                    app.addCylinder();
                    break;
                default:
                    break;
            }
        })
};

export const saveScene = (name, scene) => (dispatch) => {
    dispatch(sceneSaveLoading());

    const blobParts = [JSON.stringify({ ...scene })];
    const blobOptions = { type: MIMETYPES.APPLICATION_JSON };
    const blob = new Blob(blobParts, blobOptions);
    const formData = new FormData();

    formData.append('data', blob, name+'.json');

    axios
        .post(getScenesUrl(name), formData)
        .then(() => dispatch(sceneSaveSuccess()))
        .catch(() => dispatch(sceneSaveFailure()));
};

export const loadScene = (name) => () => {
    const url = getScenesUrl(name);

    const sceneOptions = {
        scriptEnabled: false,
        useHelper: true
    };
    // should dispatch an action here and show some loading screen when
    // loading the scene from BE.
    getOrCreateApp()
        .then(app => {
            axios
                .get(url)
                .then(({ data }) => app.parseScene(data, sceneOptions));
        })
};

export const startProject = project => dispatch => {
    const url = `${getProjectsUrl(project)}/start`;

    // dispatch something here about starting the app

    axios
        .post(url)
        .then(({ data }) => {
            // dispatch something that will cause the editor to show the iframe
            dispatch(projectRunning(data.url));
            dispatch(projectPlayerVisible(true));
        })
        .catch(e => {
            // handling the failure of starting the project
        })
};

export const stopProject = project => dispatch => {
    const url = `${getProjectsUrl(project)}/stop`;

    // dispatch something here about starting the app
    axios
        .post(url)
        .then(({ data }) => {
            // dispatch something that will cause the editor to show the iframe
            dispatch(projectStopped());
            dispatch(projectPlayerVisible(false));
        })
        .catch(e => {
            // handling the failure of starting the project
        })
};
