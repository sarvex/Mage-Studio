import {
    ASSETS_COMPLETED,
    ASSETS_FAILURE,
    ASSETS_LOADING
} from "../actions/types";

const DEFAULT = {
    loading: false,
    completed: false,
    models: [],
    images: [],
    textures: [],
    scripts: [],
    audio: [],
    video: [],
    error: false
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case ASSETS_LOADING:
            return {
                ...state,
                ...DEFAULT,
                loading: true
            };
            break;
        case ASSETS_FAILURE:
            return {
                ...state,
                ...DEFAULT,
                error: true
            };
            break;
        case ASSETS_COMPLETED:
            return {
                ...state,
                ...DEFAULT,
                ...action.data,
                completed: true
            };
            break;
        default:
            return state;
            break;
    }
}
