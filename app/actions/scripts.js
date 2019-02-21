import {
    SCRIPTS_FETCH_FAILED,
    SCRIPTS_FETCH_STARTED,
    SCRIPTS_FETCH_COMPLETED
} from './types';

import axios from 'axios';

// fetch scripts
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

export const fetchAllScripts = (project) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/scripts`;

    dispatch(scriptsFetchStarted());

    axios(url)
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

export const fetchSingleScript = (project, scriptid) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/scripts/${scriptid}`;

    dispatch(scriptsFetchStarted());

    getOrCreateApp()
        .then((app) => {
            axios(url)
                .then(({ data }) => {
                    // do something with the script that we received
                    //app.loadModel(data.content);
                })
                .catch((e) => {
                    dispatch(scriptsFetchFailed())
                });
        })
}

// fetch single script
