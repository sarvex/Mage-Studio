import {
    SCENE_CONTROLS_CHANGED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case SCENE_CONTROLS_CHANGED:
            return {
                ...state,
                control: action.control || 'translate'
            };
            break;
        default:
            return state;
            break;
    }
}
