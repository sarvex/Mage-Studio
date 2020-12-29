import React from 'react';
import Code from '../code';

import "antd/dist/antd.min.css";

class Code extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Code { ...this.props } />;
    }
}

export default Code;
