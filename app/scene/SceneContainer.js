import React from 'react';
import {
    connect
} from 'react-redux';

import {
    meshChanged,
    meshAttached,
    meshDetached
} from '../actions/currentMesh';

import {
    saveScene
} from '../actions/scene';

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
                config={this.props.config}
                store={this.props.store}
                onMeshChanged={this.props.onMeshChanged}
                onMeshAttached={this.props.onMeshAttached}
                onMeshDetached={this.props.onMeshDetached}
                onSceneExported={this.props.onSceneExported}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { config } = state;

    return {
        ...config
    };
}

const mapDispatchToProps = (dispatch) => ({

    onMeshChanged: ({element, position, rotation, scale}) => {
        return dispatch(meshChanged(element, position, rotation, scale))
    },

    onMeshAttached: ({element, position, rotation, scale}) => {
        return dispatch(meshAttached(element, position, rotation, scale))
    },

    onMeshDetached: () => dispatch(meshDetached()),

    onSceneExported: (name) => ({ data }) => dispatch(saveScene(name, data))
});

export default connect(state => state, mapDispatchToProps)(SceneContainer);
