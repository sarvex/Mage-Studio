import {
    NEW_PROJECT_COMPLETED,
    NEW_PROJECT_SAVED,
    NEW_PROJECT_ERROR,
    NEW_PROJECT_SAVING
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case NEW_PROJECT_SAVING:
            return {
                ...state,
                loading: true,
                error: false,
                visible: true
            };
            break;
        case NEW_PROJECT_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                visible: true
            };
            break;
        case NEW_PROJECT_SAVED:
            return {
                ...state,
                loading: true,
                error: false,
                visible: true
            };
            break;
        case NEW_PROJECT_COMPLETED:
            return {
                ...state,
                loading: false,
                error: false,
                visible: false
            }
        default:
            return state;
            break;
    }
}
