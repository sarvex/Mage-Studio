import {
    MESH_CHANGED
} from './types';

export const meshChanged = (position, rotation, scale) => ({
    type: MESH_CHANGED,
    position,
    rotation,
    scale
})
