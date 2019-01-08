import {
    SCENE_CONTROLS_CHANGED,
    SCENE_SNAP_CHANGED,
    SCENE_SNAP_ENABLED
} from './types';

export const controlsChanged = (control) => ({
    type: SCENE_CONTROLS_CHANGED,
    control
});

export const snapValueChange = (value) => ({
    type: SCENE_SNAP_CHANGED,
    value
});

export const snapEnabledChange = (enabled) => ({
    type: SCENE_SNAP_ENABLED,
    enabled
});
