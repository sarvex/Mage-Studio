import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from './types';

export const meshChanged = (mesh) => ({
    type: MESH_CHANGED,
    element: mesh
});

export const meshAttached = (mesh) => ({
    type: MESH_ATTACHED,
    element: mesh
});

export const meshDetached = () => ({
    type: MESH_DETACHED
});
