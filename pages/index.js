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
        return (
            <div>
                <Layout />
            </div>
        )
    }
}

export default Index;
