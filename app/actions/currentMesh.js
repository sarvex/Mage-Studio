import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from './types';

export const meshChanged = (position, rotation, scale) => ({
    type: MESH_CHANGED,
    position,
    rotation,
    scale
});

export const meshAttached = (mesh) => {
    console.log(mesh);
    return {
        type: MESH_ATTACHED,
        element: mesh
    }
};

export const meshDetached = () => ({
    type: MESH_DETACHED
});
