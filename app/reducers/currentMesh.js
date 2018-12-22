import {
    MESH_CHANGED,
    MESH_SELECTED
} from '../actions/types';

export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case MESH_CHANGED:
        case MESH_SELECTED:
            return {
                ...state,
                position: action.position,
                rotation: action.rotation,
                scale: action.scale
            };
            break;
        default:
            return state;
            break;
    }
}
