import {
    SCENE_MODEL_MODAL_SHOW,
    SCENE_MODEL_MODAL_HIDE,
    SCENE_MODEL_UPLOAD_STARTED,
    SCENE_MODEL_UPLOAD_FAILED,
    SCENE_MODEL_UPLOAD_COMPLETED,
    SCENE_MODEL_FETCH_STARTED,
    SCENE_MODEL_FETCH_FAILED,
    SCENE_MODEL_FETCH_COMPLETED
} from '../actions/types';

const DEFAULT = {
    loading: false,
    error: false,
    visible: false,
    completed: false,
    data: null,
    list: []
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
        case SCENE_MODEL_FETCH_STARTED:
        case SCENE_MODEL_UPLOAD_STARTED:
            return {
                ...DEFAULT,
                ...state,
                visible: true,
                loading: true
            };
            break;
        case SCENE_MODEL_FETCH_FAILED:
        case SCENE_MODEL_UPLOAD_FAILED:
            return {
                ...DEFAULT,
                ...state,
                visible: true,
                error: true
            };
            break;
        case SCENE_MODEL_UPLOAD_COMPLETED:
            return {
                ...DEFAULT,
                ...state,
                loading: false,
                visible: true,
                completed: true,
                data: action.data
            };
            break;
        case SCENE_MODEL_FETCH_COMPLETED:
            return {
                ...DEFAULT,
                ...state,
                list: action.list,
                visible: true,
                completed: true
            }
        default:
            return state;
            break;
    }
}
