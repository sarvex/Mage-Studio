import {
    SCENE_SAVE_REQUEST,
    SCENE_SAVE_LOADING,
    SCENE_SAVE_SUCCESS,
    SCENE_SAVE_FAILURE
} from './types';
import { SCENES_URL } from '../lib/constants';
import { getOrCreateApp } from '../scene/AppProxy';
import axios from 'axios';

const CUBE = 'cube';
const SPHERE = 'sphere';
const CYLINDER = 'cylinder';

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
        .post(`${SCENES_URL}/${name}`, { scene: JSON.stringify(scene) })
        .then(() => {
            dispatch(sceneSaveSuccess());
        })
        .catch(() => {
            dispatch(sceneSaveFailure());
        });
};

export const loadScene = (name) => (dispatch) => {
    const url = `${SCENES_URL}/${name}`;

    getOrCreateApp()
        .then(app => {
            axios(url).then(({ data }) => app.parseScene(data))
        })
}
