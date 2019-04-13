import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import {
    CONFIG_URL,
    PROJECTS_URL,
    buildUrl,
    getAssetsUrl
} from '../../app/lib/constants';
import reducers from '../../app/reducers';

export async function initializeStore(initialState = {}, request) {
    let state = {
        ...initialState
    };

    if (request) {
        const baseUrl = request.headers.host;
        const config = await axios(buildUrl(baseUrl, CONFIG_URL));  // this call will have the auth cookie inside
        let project = {};
        let assets = {};

        const projectid = config.data.project;

        if (projectid) {
            project = await axios(buildUrl(baseUrl, `${PROJECTS_URL}/${projectid}`));
            assets = await axios(buildUrl(baseUrl, getAssetsUrl(projectid)));
        }

        state = {
            ...state,
            config: config.data,
            project: project.data,
            assets: assets.data
        };
    }

    return createStore(reducers, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export function syncInitializeStore(state = {}) {
    return createStore(reducers, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
