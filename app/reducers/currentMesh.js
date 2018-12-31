import {
    MESH_CHANGED,
    MESH_SELECTED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case MESH_CHANGED:
            return {
                ...state,
                element: action.element
            };
            break;
        default:
            return state;
            break;
    }
}
