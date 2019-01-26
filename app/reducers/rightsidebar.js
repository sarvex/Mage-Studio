import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from '../actions/types';

const DEFAULT = {
    empty: true,
    element: undefined,
    type: '',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0, y: 0, z: 0 }
}

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case MESH_ATTACHED:
        case MESH_CHANGED:
            return {
                ...state,
                empty: false,
                type: 'mesh',
                element: action.element,
                position: { ...action.position },
                rotation: { ...action.rotation },
                scale: { ...action.scale }
            };
            break;
        case MESH_DETACHED:
            return {
                ...state,
                ...DEFAULT
            };
            break;
        default:
            return state;
            break;
    }
}
