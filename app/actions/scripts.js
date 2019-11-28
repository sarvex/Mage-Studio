import {
    SCRIPTS_FETCH_FAILED,
    SCRIPTS_FETCH_STARTED,
    SCRIPTS_FETCH_COMPLETED,
    SCRIPTS_SINGLE_FETCH_COMPLETED,
    SCRIPTS_NEW_FILE_MODAL,
    SCRIPTS_EDITOR_FINISHED_LOADING,
    SCRIPTS_EDITOR_SCRIPT_LOADED,
    SCRIPTS_EDITOR_SCRIPT_CHANGED
} from './types';

import { PROJECTS_URL } from '../lib/constants';
import { getOrCreateApp } from '../scene/AppProxy';
import axios from 'axios';

export const scriptsFetchStarted = () => ({
    type: SCRIPTS_FETCH_STARTED
});

export const scriptsFetchCompleted = ({ data = [] }) => ({
    type: SCRIPTS_FETCH_COMPLETED,
    list: data
});

export const scriptsFetchFailed = () => ({
    type: SCRIPTS_FETCH_FAILED
});

export const singleScriptFetchCompleted = (data) => ({
    type: SCRIPTS_SINGLE_FETCH_COMPLETED,
    data
});

export const displayNewScriptModal = (visible) => ({
    type: SCRIPTS_NEW_FILE_MODAL,
    visible
});

export const editorReady = () => ({
    type: SCRIPTS_EDITOR_FINISHED_LOADING,
});

export const editorScriptLoaded = (filename, code, scriptType) => ({
    type: SCRIPTS_EDITOR_SCRIPT_LOADED,
    filename,
    code,
    scriptType
});

export const editorScriptChanged = (filename, code, scriptType) => ({
    type: SCRIPTS_EDITOR_SCRIPT_CHANGED,
    filename,
    code,
    scriptType
})

export const getScripts = (project) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/scripts`;

    dispatch(scriptsFetchStarted());

    axios
        .get(url)
        .then((response) => {
            if (!response) {
                dispatch(scriptsFetchFailed());
            } else {
                dispatch(scriptsFetchCompleted(response));
            }
        })
        .catch(() => {
            dispatch(scriptsFetchFailed());
        });
};

export const newScript = (project, filename) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/scripts`;
    const formData = new FormData();
    formData.append('filename', filename);

    axios
        .post(url, formData)
        .then((response) => {
            if (!response) {
                dispatch(scriptsFetchFailed());
            } else {
                dispatch(scriptsFetchCompleted(response));
            }
        })
        .catch(() => {
            dispatch(scriptsFetchFailed());
        });
}

export const getScriptContent = (project, scriptid, type) => {
    const url = `${PROJECTS_URL}/${project}/scripts/${scriptid}?type=${type}`;

    return axios.get(url);
};

export const loadSingleScript = (project, scriptid, type) => (dispatch) => {
    dispatch(scriptsFetchStarted());

    getOrCreateApp()
        .then((app) => {
            getScriptContent(project, scriptid, type)
                .then(({ data }) => {
                    dispatch(singleScriptFetchCompleted(data));
                    app.loadScript(data.content);
                })
                .catch(dispatch(scriptsFetchFailed()));
        });
};

export const saveScript = (project, filename, content, type) => () => {
    const url = `${PROJECTS_URL}/${project}/scripts/${filename}`;

    const formData = new FormData();
    formData.append('content', content);
    formData.append('type', type);

    axios.put(url, formData)
}
