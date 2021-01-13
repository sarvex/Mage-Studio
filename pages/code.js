import React from 'react';
import CodePage from '../code';

class Code extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <CodePage { ...this.props } />;
    }
}

export default Code;
