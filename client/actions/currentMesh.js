import {
    MESH_CHANGED,
    MESH_ATTACHED,
    MESH_DETACHED
} from './types';

import { getOrCreateApp } from '../editor/scene/AppProxy';
import { getImageUrl } from '../lib/constants';

export const meshChanged = (name, position, rotation, scale) => ({
    type: MESH_CHANGED,
    name,
    position,
    rotation,
    scale
});

export const meshAttached = (name, position, rotation, scale) => ({
    type: MESH_ATTACHED,
    name,
    position,
    rotation,
    scale
});

export const textureChanged = (project, name) => () => {
    const url = getImageUrl(project, name);

    getOrCreateApp()
        .then((app) => app.changeTexture(name, url));
};

export const materialChanged = (name) => () => {
    getOrCreateApp()
        .then(app => app.changeMaterial(name));
};

export const meshDetached = () => ({
    type: MESH_DETACHED
});
