import React from 'react';
import Code from '../code';

class Code extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Code { ...this.props } />;
    }
}

export default Code;
