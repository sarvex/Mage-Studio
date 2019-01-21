import React from 'react';
import {
    connect
} from 'react-redux';

import {
    meshChanged,
    meshAttached,
    meshDetached
} from '../actions/currentMesh';

import debounce from '../lib/debounce';
import Scene from './Scene';
import './scene.scss';

class SceneContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Scene
                store={this.props.store}
                onMeshChanged={this.props.onMeshChanged}
                onMeshAttached={this.props.onMeshAttached}
                onMeshDetached={this.props.onMeshDetached}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({

    onMeshChanged: ({element, position, rotation, scale}) => {
        return dispatch(meshChanged(element, position, rotation, scale))
    },

    onMeshAttached: ({element, position, rotation, scale}) => {
        return dispatch(meshAttached(element, position, rotation, scale))
    },

    onMeshDetached: () => dispatch(meshDetached())
});

export default connect(state => state, mapDispatchToProps)(SceneContainer);
