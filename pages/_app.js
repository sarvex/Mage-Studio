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

    static async getInitialProps({ reduxStore }) {
        return reduxStore;
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
