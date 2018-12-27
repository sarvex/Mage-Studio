import {
    SCENE_FOG_ENABLED,
    SCENE_FOG_COLOR_CHANGED,
    SCENE_FOG_DENSITY_CHANGED
} from './types';

export const fogEnabled = (enabled) => ({
    type: SCENE_FOG_ENABLED,
    enabled,
});

export const fogColorChanged = (color) => ({
    type: SCENE_FOG_COLOR_CHANGED,
    color
});

export const fogDensityChanged = (density) => ({
    type: SCENE_FOG_DENSITY_CHANGED,
    density
});
