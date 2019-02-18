import {
    SCENE_MODEL_MODAL_HIDE,
    SCENE_MODEL_MODAL_SHOW,

    SCENE_MODEL_UPLOAD_STARTED,
    SCENE_MODEL_UPLOAD_COMPLETED,
    SCENE_MODEL_UPLOAD_FAILED,

    SCENE_MODEL_FETCH_STARTED,
    SCENE_MODEL_FETCH_COMPLETED,
    SCENE_MODEL_FETCH_FAILED
} from './types';
import { getOrCreateApp } from '../scene/AppProxy';
import axios from 'axios';
import { PROJECTS_URL } from '../lib/constants';

export const showModelUploadModal = () => ({
    type: SCENE_MODEL_MODAL_SHOW
});

export const hideModelUploadModal = () => ({
    type: SCENE_MODEL_MODAL_HIDE
});

export const sceneModelUploadStarted = () => ({
    type: SCENE_MODEL_UPLOAD_STARTED
});

export const sceneModelUploadCompleted = ({ data = {} }) => ({
    type: SCENE_MODEL_UPLOAD_COMPLETED,
    data
});

export const sceneModelUploadFailed = () => ({
    type: SCENE_MODEL_UPLOAD_FAILED
});

export const sceneModelFetchStarted = () => ({
    type: SCENE_MODEL_FETCH_STARTED
});

export const sceneSingleModelFetchCompleted = () => ({
    type: SCENE_SINGLE_MODEL_FETCH_COMPLETED
});

export const sceneModelFetchCompleted = ({ data = [] }) => ({
    type: SCENE_MODEL_FETCH_COMPLETED,
    list: data
});

export const sceneModelFetchFailed = () => ({
    type: SCENE_MODEL_FETCH_FAILED
});

export const getModels = (project) => (dispatch) => {
    dispatch(sceneModelFetchStarted());

    const url = `${PROJECTS_URL}/${project}/models`;

    axios(url)
        .then((response) => {
            if (!response) {
                dispatch(sceneModelFetchFailed());
            } else {
                dispatch(sceneModelFetchCompleted(response));
            }
        })
        .catch(() => {
            dispatch(sceneModelFetchFailed());
        });
}

export const loadSingleModel = (project, modelid) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/models/${modelid}`;

    dispatch(sceneModelFetchStarted());

    getOrCreateApp()
        .then((app) => {
            axios(url)
                .then(({ data }) => {
                    app.loadModel(data.content);
                    dispatch(hideModelUploadModal())
                })
                .catch((e) => {
                    dispatch(hideModelUploadModal())
                });
        })

}

export const uploadModel = (project, file) => (dispatch) => {
    dispatch(sceneModelUploadStarted());

    const url = `${PROJECTS_URL}/${project}/models`;
    const formData = new FormData();
    formData.append('data', file);

    axios
        .post(url, formData)
        .then((response) => {
            if (!response) {
                dispatch(scemeModelUploadFailed());
            } else {
                dispatch(sceneModelUploadCompleted(response));
            }
        })
        .catch(() => {
            dispatch(sceneModelUploadFailed());
        });
}
