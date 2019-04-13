import {
    NEW_PROJECT_COMPLETED,
    NEW_PROJECT_SAVED,
    NEW_PROJECT_ERROR,
    NEW_PROJECT_SAVING,
    NEW_PROJECT_HIDE,
    NEW_PROJECT_SHOW
} from '../actions/types';

const DEFAULT = {
    loading: false,
    error: false,
    visible: undefined
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case NEW_PROJECT_HIDE:
            return {
                ...state,
                ...DEFAULT,
                visible: false
            }
            break;
        case NEW_PROJECT_SHOW:
            return {
                ...state,
                ...DEFAULT,
                visible: true
            }
            break;
        case NEW_PROJECT_SAVING:
            return {
                ...state,
                ...DEFAULT,
                loading: true,
                visible: true
            };
            break;
        case NEW_PROJECT_ERROR:
            return {
                ...state,
                ...DEFAULT,
                error: true,
                visible: true
            };
            break;
        case NEW_PROJECT_SAVED:
            return {
                ...state,
                ...DEFAULT,
                loading: true,
                visible: true
            };
            break;
        case NEW_PROJECT_COMPLETED:
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
