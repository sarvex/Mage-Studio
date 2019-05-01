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
    loadScene,
    startProject,
    stopProject
} from '../actions/scene';

import Scene from './Scene';
import SceneToolbar from './SceneToolbar';
import Player from './Player';
import ModelModal from '../modals/ModelUploadModal';

import './scene.scss';
import { showModelUploadModal } from '../actions/models';

class SceneContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            scene,
            store,
            config,
            loadScene,
            onMeshChanged,
            onMeshAttached,
            onMeshDetached,
            onSceneExported,
            startProject,
            showModelModal,
            stopProject
        } = this.props;

        const { projectPlayerVisible, projectUrl } = scene;

        console.log(projectPlayerVisible);

        return (
            <div className='scene-container'>
                <Player
                    url={projectUrl}
                    visible={projectPlayerVisible} />
                <Scene
                    config={config}
                    store={store}
                    onSceneLoad={loadScene}
                    onMeshChanged={onMeshChanged}
                    onMeshAttached={onMeshAttached}
                    onMeshDetached={onMeshDetached}
                    onSceneExported={onSceneExported} />
                <SceneToolbar
                    playerVisible={projectPlayerVisible}
                    stopProject={stopProject}
                    config={config}
                    showModelModal={showModelModal}
                    startProject={startProject} />
                <ModelModal />
            </div>
        );
    }
}

const mapStateToProps = ({ config, scene }) => ({
    config,
    scene
});

const mapDispatchToProps = (dispatch) => ({

    startProject: project => dispatch(startProject(project)),
    showModelModal: () => dispatch(showModelUploadModal()),
    onMeshChanged: ({element, position, rotation, scale}) => {
        return dispatch(meshChanged(element, position, rotation, scale))
    },
    onMeshAttached: ({element, position, rotation, scale}) => {
        return dispatch(meshAttached(element, position, rotation, scale))
    },
    onMeshDetached: () => dispatch(meshDetached()),
    onSceneExported: (name) => ({ data }) => dispatch(saveScene(name, data)),
    loadScene: (name) => dispatch(loadScene(name)),
    stopProject: (project) => dispatch(stopProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer);
