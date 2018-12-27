import {
    SCENE_CONTROLS_CHANGED
} from './types';

export const controlsChanged = (control) => ({
    type: SCENE_CONTROLS_CHANGED,
    control
});
