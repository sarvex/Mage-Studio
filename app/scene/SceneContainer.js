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
    saveScene,
    loadScene
} from '../actions/scene';

import debounce from '../lib/debounce';

import Scene from './Scene';
import SceneToolbar from './SceneToolbar';
import ModelModal from '../modals/ModelUploadModal';

import './scene.scss';

class SceneContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='scene-container'>
                <Scene
                    config={this.props.config}
                    store={this.props.store}
                    onSceneLoad={this.props.loadScene}
                    onMeshChanged={this.props.onMeshChanged}
                    onMeshAttached={this.props.onMeshAttached}
                    onMeshDetached={this.props.onMeshDetached}
                    onSceneExported={this.props.onSceneExported}
                />
                <SceneToolbar />
                <ModelModal />
            </div>
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

    onSceneExported: (name) => ({ data }) => dispatch(saveScene(name, data)),

    loadScene: (name) => dispatch(loadScene(name))
});

export default connect(state => state, mapDispatchToProps)(SceneContainer);
