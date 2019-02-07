import {
    SCENE_MODEL_MODAL_HIDE,
    SCENE_MODEL_MODAL_SHOW
} from './types';

export const showModelUploadModal = () => ({
    type: SCENE_MODEL_MODAL_SHOW
});

export const hideModelUploadModal = () => ({
    type: SCENE_MODEL_MODAL_HIDE
});
