import {
    SCENE_SNAP_CHANGED,
    SCENE_SNAP_ENABLED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case SCENE_SNAP_ENABLED:
            return {
                ...state,
                snapEnabled: action.enabled
            };
            break;
        case SCENE_SNAP_CHANGED:
            return {
                ...state,
                snapValue: action.value
            };
            break;
        default:
            return state;
            break;
    }
}
