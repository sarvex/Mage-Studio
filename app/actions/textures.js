import {
    ASSETS_TEXTURE_MODAL_SHOW,
    ASSETS_TEXTURE_MODAL_HIDE,
    ASSETS_TEXTURE_MODAL_LOADING,
    ASSETS_TEXTURE_MODAL_COMPLETED,
    ASSETS_TEXTURE_MODAL_FAILED
} from './types';
import { getImagesUrl } from '../lib/constants';
import axios from 'axios';
import {getAllAssets} from './assets';

const TEXTURE_MODAL_TIMEOUT = 1500;

export const showTextureModal = () => ({
    type: ASSETS_TEXTURE_MODAL_SHOW
});

export const hideTextureModal = () => ({
    type: ASSETS_TEXTURE_MODAL_HIDE
});

export const textureUploadStarted = () => ({
    type: ASSETS_TEXTURE_MODAL_LOADING
});

export const textureUploadCompleted = () => ({
    type: ASSETS_TEXTURE_MODAL_COMPLETED
});

export const textureUploadFailed = () => ({
    type: ASSETS_TEXTURE_MODAL_FAILED
});

export const uploadTexture = (project, file) => (dispatch) => {
    dispatch(textureUploadStarted());

    const url = getImagesUrl(project);
    const formData = new FormData();
    formData.append('data', file);

    axios
        .post(url, formData)
        .then((response) => {
            if (!response) {
                console.log('failure');
                dispatch(textureUploadFailed());
            } else {
                dispatch(textureUploadCompleted());
                dispatch(getAllAssets(project));

                setTimeout(() => dispatch(hideTextureModal()), TEXTURE_MODAL_TIMEOUT);
            }
        })
        .catch((e) => {
            console.log('failure', e);
            dispatch(textureUploadFailed());
        });
};