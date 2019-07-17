import React from 'react';
import Layout from '../code/Layout';

import "antd/dist/antd.min.css";

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout { ...this.props } />
            </div>
        )
    }
}

export default Index;
