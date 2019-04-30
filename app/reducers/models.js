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
                ...DEFAULT,
                ...state,
                visible: true,
                loading: false
            };
            break;
        case SCENE_MODEL_MODAL_HIDE:
            return {
                ...DEFAULT,
                ...state,
                visible: false,
                loading: false
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
                loading: false,
                error: true
            };
            break;
        // case SCENE_MODEL_UPLOAD_COMPLETED:
        //     return {
        //         ...DEFAULT,
        //         ...state,
        //         loading: false,
        //         visible: false,
        //         completed: true,
        //         data: action.data
        //     };
        //     break;
        case SCENE_MODEL_FETCH_COMPLETED:
            return {
                ...state,
                list: action.list,
                loading: false,
                completed: true
            };
            break;
        default:
            return state;
            break;
    }
}
