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

    return createStore(reducers, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export function syncInitializeStore(state = {}) {
    return createStore(reducers, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
