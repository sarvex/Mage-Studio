import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from '../actions/types';

const DEFAULT = {
    empty: true,
    element: undefined,
    type: '',
    position: {},
    rotation: {},
    scale: {}
}

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case MESH_ATTACHED:
        case MESH_CHANGED:
            console.log('reducing', action.type);
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
            console.log('reducing mesh detached');
            return {
                ...state,
                empty: true,
                type: '',
                element: undefined,
                position: {},
                rotation: {},
                scale: {}
            };
            break;
        default:
            return state;
            break;
    }
}
