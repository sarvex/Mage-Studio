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
import { getProjectsUrl, getScenesUrl } from '../lib/constants';
import { getOrCreateApp } from '../scene/AppProxy';
import axios from 'axios';

const CUBE = 'cube';
const SPHERE = 'sphere';
const CYLINDER = 'cylinder';
const AMBIENT = 'ambient';
const SUN = 'sun';

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

    axios
        .post(getScenesUrl(name), { scene: JSON.stringify(scene) })
        .then(() => {
            dispatch(sceneSaveSuccess());
        })
        .catch(() => {
            dispatch(sceneSaveFailure());
        });
};

export const loadScene = (name) => (dispatch) => {
    const url = getScenesUrl(name);

    // should dispatch an action here and show some loading screen when
    // loading the scene from BE.

    getOrCreateApp()
        .then(app => {
            axios(url)
                .then(({ data }) => app.parseScene(data))
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
