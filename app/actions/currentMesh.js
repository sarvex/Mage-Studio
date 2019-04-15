import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from './types';

import { getOrCreateApp } from '../scene/AppProxy';
import { getImageUrl } from '../lib/constants';

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

export const textureChanged = (project, name) => (dispatch) => {
    const url = getImageUrl(project, name);

    getOrCreateApp()
        .then((app) => {
            app.changeTexture(name, url);
        });
};

export const materialChanged = (name) => (dispatch) => {
    getOrCreateApp()
        .then(app => {
            app.changeMaterial(name);
        });
};

export const meshDetached = () => ({
    type: MESH_DETACHED
});
