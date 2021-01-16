import {
    SCENE_SHADOWS_CHANGED
} from './types';

export const shadowChanged = (type, enabled) => ({
    type: SCENE_SHADOWS_CHANGED,
    enabled,
    type
});
