import {
    MESH_ATTACHED,
    MESH_DETACHED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case MESH_ATTACHED:
            return {
                ...state,
                empty: false,
                element: action.element
            };
            break;
        case MESH_DETACHED:
            return {
                ...state,
                empty: true
            };
            break;
        default:
            return state;
            break;
    }
}
