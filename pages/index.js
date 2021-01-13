import React from 'react';
import App from '../app';

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <App { ...this.props } />;
    }
}

export default Index;
