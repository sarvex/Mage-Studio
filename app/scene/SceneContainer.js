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

// import Scene from './Scene';
// import SceneToolbar from './SceneToolbar';
import Player from './Player';
// import ModelModal from '../modals/ModelUploadModal';

import style from './scene.module.scss';
import { showModelUploadModal } from '../actions/models';

export class SceneContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fullscreen: false
        };
    }

    handleFullScreen = (fullscreen) => {
        this.setState({ fullscreen });
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

        const { fullscreen } = this.state;

        const { projectPlayerVisible, projectUrl } = scene;
        const fullScreenClassName = fullscreen ? 'fullscreen' : '';
        const className = `scene-container ${fullScreenClassName}`;

        return (
            <div className={style['scene-container']}>
                <Player
                    url={projectUrl}
                    visible={projectPlayerVisible} />
                {/*
                <Scene
                    fullscreen={fullscreen}
                    config={config}
                    store={store}
                    onSceneLoad={loadScene}
                    onMeshChanged={onMeshChanged}
                    onMeshAttached={onMeshAttached}
                    onMeshDetached={onMeshDetached}
                    onSceneExported={onSceneExported} />
                */}
                
                {/* <SceneToolbar
                    playerVisible={projectPlayerVisible}
                    stopProject={stopProject}
                    config={config}
                    showModelModal={showModelModal}
                    startProject={startProject}
                    fullscreen={fullscreen}
                    onFullScreen={this.handleFullScreen}/> */}
                {/* <ModelModal /> */}
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
    onMeshChanged: ({name, position, rotation, scale}) => {
        return dispatch(meshChanged(name, position, rotation, scale))
    },
    onMeshAttached: ({name, position, rotation, scale}) => {
        return dispatch(meshAttached(name, position, rotation, scale))
    },
    onMeshDetached: () => dispatch(meshDetached()),
    onSceneExported: (name) => ({ data }) => dispatch(saveScene(name, data)),
    loadScene: (name) => dispatch(loadScene(name)),
    stopProject: (project) => dispatch(stopProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer);
