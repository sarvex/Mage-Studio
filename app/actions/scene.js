import {
    SCENE_SAVE_REQUEST,
    SCENE_SAVE_LOADING,
    SCENE_SAVE_SUCCESS,
    SCENE_SAVE_FAILURE
} from './types';

import { SCENES_URL } from '../lib/constants';

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

export const saveScene = (name, scene) => (dispatch) => {
    console.log(name, scene);
    dispatch(sceneSaveLoading());

    axios
        .post(`${SCENES_URL}/${name}`, { scene })
        .then(() => {
            dispatch(sceneSaveSuccess());
        })
        .catch(() => {
            dispatch(sceneSaveFailure());
        });
};
