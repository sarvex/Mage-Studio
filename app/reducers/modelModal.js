import {
    SCENE_MODEL_MODAL_SHOW,
    SCENE_MODEL_MODAL_HIDE,
    SCENE_MODEL_UPLOAD_STARTED,
    SCENE_MODEL_UPLOAD_FAILED,
    SCENE_MODEL_UPLOAD_COMPLETED
} from '../actions/types';

const DEFAULT = {
    loading: false,
    error: false,
    visible: false,
    completed: false,
    data: null
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
        case SCENE_MODEL_UPLOAD_STARTED:
            return {
                ...state,
                ...DEFAULT,
                visible: true,
                loading: true
            };
            break;
        case SCENE_MODEL_UPLOAD_FAILED:
            return {
                ...state,
                ...DEFAULT,
                visible: true,
                error: true
            };
            break;
        case SCENE_MODEL_UPLOAD_COMPLETED:
            return {
                ...state,
                ...DEFAULT,
                visible: true,
                completed: true,
                data: action.data
            };
            break;
        default:
            return state;
            break;
    }
}
