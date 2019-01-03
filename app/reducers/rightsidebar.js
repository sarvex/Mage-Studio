import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case MESH_ATTACHED:
        case MESH_CHANGED:
            return {
                ...state,
                empty: false,
                element: action.element,
                position: action.position,
                rotation: action.rotation,
                scale: action.scale
            };
            break;
        case MESH_DETACHED:
            return {
                ...state,
                empty: true,
                element: undefined,
            };
            break;
        default:
            return state;
            break;
    }
}
