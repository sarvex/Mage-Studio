import {
    SCENE_FOG_ENABLED,
    SCENE_FOG_COLOR_CHANGED,
    SCENE_FOG_DENSITY_CHANGED,
} from '../actions/types';

const DEFAULT = {
    enabled: false,
    color: '#ffffff',
    density: 0.05
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case SCENE_FOG_ENABLED:
            const { enabled } = action;
            return {
                ...state,
                enabled
            };
            break;
        case SCENE_FOG_COLOR_CHANGED:
            const { color } = action;
            return {
                ...state,
                color
            };
            break;
        case SCENE_FOG_DENSITY_CHANGED:
            const { density } = action;
            return {
                ...state,
                density
            };
            break;
        default:
            return state;
            break;
    }
}
