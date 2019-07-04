import {
    NEW_PROJECT_COMPLETED,
    NEW_PROJECT_SAVING,
    NEW_PROJECT_SAVED,
    NEW_PROJECT_ERROR,
    NEW_PROJECT_HIDE,
    NEW_PROJECT_SHOW
} from './types';
import { PROJECTS_URL } from '../lib/constants';
import axios from 'axios';

const MODAL_DISMISSED_TIMEOUT = 1500;

export const newProjectShow = () => ({
    type: NEW_PROJECT_SHOW
});

export const newProjectHide = () => ({
    type: NEW_PROJECT_HIDE
});

export const newProjectSaving = () => ({
    type: NEW_PROJECT_SAVING
});

export const newProjectSaved = () => ({
    type: NEW_PROJECT_SAVED
});

export const newProjectError = () => ({
    type: NEW_PROJECT_ERROR
});

export const newProjectCompleted = () => ({
    type: NEW_PROJECT_COMPLETED
});

export const createNewProject = (project, scene) => (dispatch) => {
    const config = { timeout: 60 * 4 * 1000 };

    dispatch(newProjectSaving());

    axios
        .post(PROJECTS_URL, { project, scene }, config)
        .then(() => {
            dispatch(newProjectSaved());
            setTimeout(() => {
                dispatch(newProjectCompleted());
            }, MODAL_DISMISSED_TIMEOUT);
        })
        .catch(() => {
            dispatch(newProjectError());
        });
}
