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
            const userconfig = await axios(buildUrl(baseUrl, CONFIG_URL)); // this call will have the auth cookie inside
            let project = {};

            if (userconfig.project) {
                const url = buildUrl(baseUrl, `${PROJECTS_URL}/${userconfig.project}`);
                project = await axios(url).data;
            }

            return {
                ...userconfig.data,
                project
            };
        }

        return {};
    }

    render () {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withReduxStore(MageStudio);
