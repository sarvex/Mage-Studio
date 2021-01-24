import { getOrCreateApp } from '../editor/scene/AppProxy';
import {
    SCENE_CONTROLS_CHANGED,
    SCENE_CONTROLS_SPACE_CHANGED,
    SCENE_SNAP_CHANGED,
    SCENE_SNAP_ENABLED
} from './types';

export const transformControlChanged = (control) => dispatch => {
    getOrCreateApp()
        .then(app => {
            app.changeTransformControl(control);

            dispatch({
                type: SCENE_CONTROLS_CHANGED,
                control
            })
        });
};

export const transformSpaceChanged = () => dispatch => {
    getOrCreateApp()
        .then(app => {
            app.toggleTransformSpace();

            dispatch({
                type: SCENE_CONTROLS_SPACE_CHANGED
            });
        });
};

export const transformSnapChanged = (snapEnabled, value) => dispatch => {
    getOrCreateApp()
        .then(app => {
            app.changeTransformSnap(snapEnabled, value);

            dispatch({
                type: SCENE_SNAP_CHANGED,
                value,
                snapEnabled
            });
        });
};
