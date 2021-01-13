import React from 'react';
import { initializeStore, syncInitializeStore } from './store';
import axios from 'axios';

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

async function getOrCreateStore (initialState, request) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        const store = await initializeStore(initialState, request);
        return store;
    }
    // Create store if unavailable on the client and set it on the window object
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = await initializeStore(state);
    }
    return window[__NEXT_REDUX_STORE__];
}

function syncGetStore(state) {
    return syncInitializeStore(state);
}

const withReduxStore = (App) => {
    return class AppWithRedux extends React.Component {
        static async getInitialProps (appContext) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const reduxStore = await getOrCreateStore({}, appContext.ctx.req);

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {}
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext.ctx);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState(),
            };
        }

        constructor (props) {
            super(props);
            this.reduxStore = syncGetStore(props.initialReduxState);
        }

        render () {
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
}

export default withReduxStore;
