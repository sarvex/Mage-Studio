import React from 'react';
import Layout from '../code/Layout';

import "antd/dist/antd.min.css";

class Code extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Layout { ...this.props } />;
    }
}

export default Code;
