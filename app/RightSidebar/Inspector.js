import React from 'react';

import EmptyInspector from './elements/EmptyInspector';

class Inspector extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { empty, element } = this.props;

        //if (empty) {
            return <EmptyInspector />;
        //}
    }
}

export default Inspector;
