import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from './types';

export const meshChanged = (mesh, position, rotation, scale) => ({
    type: MESH_CHANGED,
    element: mesh,
    position,
    rotation,
    scale
});

export const meshAttached = (mesh, position, rotation, scale) => ({
    type: MESH_ATTACHED,
    element: mesh,
    position,
    rotation,
    scale
});

export const meshDetached = () => ({
    type: MESH_DETACHED
});
