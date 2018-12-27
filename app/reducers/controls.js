import {
    SCENE_CONTROLS_CHANGED,
    SCENE_FOG_ENABLED,
    SCENE_FOG_COLOR_CHANGED,
    SCENE_FOG_DENSITY_CHANGED,
    SCENE_SHADOWS_CHANGED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case SCENE_CONTROLS_CHANGED:
            return {
                ...state,
                control: action.control || 'translate'
            };
            break;
        case SCENE_SHADOWS_CHANGED:
            const { shadowEnabled, shadowType } = action;
            return {
                ...state,
                shadowEnabled,
                shadowType
            };
            break;
        default:
            return state;
            break;
    }
}
