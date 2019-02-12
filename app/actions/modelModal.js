import {
    SCENE_MODEL_MODAL_HIDE,
    SCENE_MODEL_MODAL_SHOW,
    SCENE_MODEL_UPLOAD_STARTED,
    SCENE_MODEL_UPLOAD_COMPLETED,
    SCENE_MODEL_UPLOAD_FAILED
} from './types';

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

export const sceneModelUploadCompleted = (response) => ({
    type: SCENE_MODEL_UPLOAD_COMPLETED,
    response
});

export const sceneModelUploadFailed = () => ({
    type: SCENE_MODEL_UPLOAD_FAILED
});

export const uploadModel = (project, file) => (dispatch) => {
    dispatch(sceneModelUploadStarted());

    const url = `${PROJECTS_URL}/${project}/models`;
    const formData = new FormData();
    formData.append('data', file);

    axios
        .post(url, formData)
        .then((response) => {
            dispatch(sceneModelUploadCompleted(response));
        })
        .catch(() => {
            dispatch(sceneModelUploadFailed());
        });
}
