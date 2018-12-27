import {
    SCENE_SHADOWS_CHANGED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
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
