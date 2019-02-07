import {
    SCENE_MODEL_MODAL_SHOW,
    SCENE_MODEL_MODAL_HIDE
} from '../actions/types';

const DEFAULT = {
    loading: false,
    error: false,
    visible: false
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case SCENE_MODEL_MODAL_SHOW:
            return {
                ...state,
                ...DEFAULT,
                visible: true
            };
            break;
        case SCENE_MODEL_MODAL_HIDE:
            return {
                ...state,
                ...DEFAULT,
                visible: false
            };
            break;
        default:
            return state;
            break;
    }
}
