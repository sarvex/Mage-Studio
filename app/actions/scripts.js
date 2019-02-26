import {
    SCRIPTS_FETCH_FAILED,
    SCRIPTS_FETCH_STARTED,
    SCRIPTS_FETCH_COMPLETED,
    SCRIPTS_SINGLE_FETCH_COMPLETED
} from './types';

import { PROJECTS_URL } from '../lib/constants';
import { getOrCreateApp } from '../scene/AppProxy';
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

export const singleScriptFetchCompleted = (data) => ({
    type: SCRIPTS_SINGLE_FETCH_COMPLETED,
    data
});

export const getScripts = (project) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/scripts`;

    dispatch(scriptsFetchStarted());

    axios(url)
        .then((response) => {
            if (!response) {
                dispatch(scriptsFetchFailed());
            } else {
                console.log(response);
                dispatch(scriptsFetchCompleted(response));
            }
        })
        .catch(() => {
            dispatch(scriptsFetchFailed());
        });
}

export const getSingleScript = (project, scriptid) => (dispatch) => {
    const url = `${PROJECTS_URL}/${project}/scripts/${scriptid}`;

    dispatch(scriptsFetchStarted());

    getOrCreateApp()
        .then((app) => {
            axios(url)
                .then(({ data }) => {
                    // do something with the script that we received
                    dispatch(singleScriptFetchCompleted(data));
                    app.loadScript(data.content);
                })
                .catch((e) => {
                    console.log(e);
                    dispatch(scriptsFetchFailed())
                });
        })
}

// fetch single script
