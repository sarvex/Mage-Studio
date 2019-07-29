import React from 'react';
import Layout from '../app/Layout';
import { version, Button } from 'antd';
import axios from 'axios';

import "antd/dist/antd.min.css";

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Layout { ...this.props } />;
    }
}

export default Index;
