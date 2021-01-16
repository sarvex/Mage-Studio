import {
    SCENE_SNAP_CHANGED,
    SCENE_SNAP_ENABLED
} from '../actions/types';

const DEFAULT = {
    snapEnabled: false,
    snapValue: 10
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case SCENE_SNAP_ENABLED:
            return {
                ...state,
                ...DEFAULT,
                snapEnabled: action.enabled
            };
            break;
        case SCENE_SNAP_CHANGED:
            return {
                ...state,
                ...DEFAULT,
                snapValue: action.value
            };
            break;
        default:
            return state;
            break;
    }
}
