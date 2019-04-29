import {
    SCENE_SAVE_REQUEST,
    SCENE_SAVE_LOADING,
    SCENE_SAVE_SUCCESS,
    SCENE_SAVE_FAILURE, PROJECT_PLAYER_VISIBLE, PROJECT_PLAYER_HIDDEN
} from '../actions/types';

const DEFAULT = {
    requested: false,
    saving: false,
    error: false,
    saved: false,
    projectRunning: false,
    projectPlayerVisible: false
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case SCENE_SAVE_REQUEST:
            return {
                ...state,
                ...DEFAULT,
                requested: true
            };
            break;
        case SCENE_SAVE_LOADING:
            return {
                ...state,
                ...DEFAULT,
                saving: true
            };
            break;
        case SCENE_SAVE_SUCCESS:
            return {
                ...state,
                ...DEFAULT,
                saved: true
            };
            break;
        case SCENE_SAVE_FAILURE:
            return {
                ...state,
                ...DEFAULT,
                error: true
            };
            break;
        case PROJECT_PLAYER_VISIBLE:
            return {
                ...state,
                projectPlayerVisible: true
            };
            break;
        case PROJECT_PLAYER_HIDDEN:
            return {
                ...state,
                projectPlayerVisible: false
            };
            break;
        default:
            return state;
            break;
    }
}
