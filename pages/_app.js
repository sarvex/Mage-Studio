import App from 'next/app';
import React from 'react';
import withReduxStore from '../client/lib/withReduxStore';
import { Provider } from 'react-redux';

import "antd/dist/antd.min.css";
import "../client/shared/overrides.scss";
import '../client/shared/style.scss';

class MageStudio extends App {

    static async getInitialProps({ reduxStore }) {
        return reduxStore;
    }

    render () {
        const { Component, pageProps, reduxStore, ...rest} = this.props;

        return (
            <Provider store={reduxStore}>
                <Component {...pageProps} {...rest} store={reduxStore}/>
            </Provider>
        )
    }
}

export default withReduxStore(MageStudio);
