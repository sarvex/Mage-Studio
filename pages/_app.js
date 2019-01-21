import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from './lib/withReduxStore';
import { Provider } from 'react-redux';
import axios from 'axios';
import {
    CONFIG_URL,
    PROJECTS_URL,
    buildUrl
} from '../app/lib/constants';

class MageStudio extends App {

    static async getInitialProps({ req }) {
        if (req) {
            const baseUrl = req.headers.host;
            const userconfig = await axios(buildUrl(baseUrl, CONFIG_URL));  // this call will have the auth cookie inside
            let projectConfig = {};

            if (userconfig.data.project) {
                const url = buildUrl(baseUrl, `${PROJECTS_URL}/${userconfig.project}`);
                const _project = await axios(url);
                projectConfig = _project.data;
            }

            return {
                ...userconfig.data,
                projectConfig
            };
        }

        return {};
    }

    render () {
        const { Component, pageProps, reduxStore, ...rest} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} {...rest} store={reduxStore}/>
                </Provider>
            </Container>
        )
    }
}

export default withReduxStore(MageStudio);
