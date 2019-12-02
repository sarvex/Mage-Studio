import React from 'react';
import {
    connect
} from 'react-redux';
import { Col, Icon } from 'antd';

import CopyButton from '../../common/CopyButton';
import DeleteButton from '../../common/DeleteButton';
import AddButton from '../../common/AddButton';
import SearchButton from '../../common/SearchButton';

import Hierarchy from './Hierarchy';
import Inspector from './Inspector';

import {
    meshChanged,
    textureChanged,
    materialChanged
} from '../../actions/currentMesh';

import {
    getScripts,
    loadSingleScript
} from '../../actions/scripts';

export class RightSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleScriptMount = () => {
        const { getScripts, config } = this.props;
        const { project } = config;

        getScripts(project);
    }

    handleScriptChange = (name) => {
        const { getSingleScript, config } = this.props;
        const { project } = config;

        getSingleScript(project, name);
    }

    handleTextureChange = (name) => {
        const { onTextureChange = f => f, config } = this.props;
        const { project } = config;

        onTextureChange(project, name);
    }

    handleMaterialChange = (name) => {
        const { onMaterialChange = f => f } = this.props;

        onMaterialChange(name);
    }

    handleNameChange = (e) => {
        const { onNameChange, position, rotation, scale } = this.props;
        
        onNameChange(e.target.value, position, rotation, scale);
    }

    handlePositionChange = (axis) => (value) => {
        const { onPositionChange, name, position, rotation, scale } = this.props;
        const newPosition = {
            ...position,
            [axis]: value
        };

        onPositionChange(name, newPosition, rotation, scale);
    }

    handleRotationChange = (axis) => (value) => {
        const { onRotationChange, name, position, rotation, scale } = this.props;
        const newRotation = {
            ...rotation,
            [axis]: value
        };

        onRotationChange(name, position, newRotation, scale);
    }

    handleScaleChange = (axis) => (value) => {
        const { onScaleChange, name, position, rotation, scale } = this.props;
        const newScale = {
            ...scale,
            [axis]: value
        };

        onScaleChange(name, position, rotation, newScale);
    }

    render() {
        const {
            empty,
            name,
            position,
            rotation,
            scale,
            type,
            scripts,
            assets
        } = this.props;

        return (
            <Col
                span={4}
                className='sidebar'>

                <div className="box">
                    <p className="title">
                        <Icon className="icon" type="bars" />
                        <span>Hierarchy</span>
                        <DeleteButton />
                        <CopyButton />
                        <AddButton />
                        <SearchButton />
                    </p>
                    <div className="content">
                        <Hierarchy />
                    </div>
                </div>
                <div className='box'>
                    <p className="title">
                        <Icon className="icon" type="search" />
                        <span>Inspector</span>
                    </p>
                    <div className="content">
                        <Inspector
                            onPositionChange={this.handlePositionChange}
                            onRotationChange={this.handleRotationChange}
                            onScaleChange={this.handleScaleChange}
                            onScriptsMount={this.handleScriptMount}
                            onScriptChange={this.handleScriptChange}
                            onTextureChange={this.handleTextureChange}
                            onMaterialChange={this.handleMaterialChange}
                            onNameChange={this.handleNameChange}
                            scripts={scripts}
                            empty={empty}
                            type={type}
                            name={name}
                            position={position}
                            rotation={rotation}
                            scale={scale}
                            assets={assets}
                        />
                    </div>
                </div>
            </Col>
        );
    }
}


const mapStateToProps = (state) => {
    const { rightsidebar, scripts = {}, assets, config } = state;
    const { empty = true, name = '', type = '', position = {}, rotation = {}, scale = {} } = rightsidebar;

    return {
        assets,
        empty,
        name,
        type,
        position,
        rotation,
        scale,
        config,
        scripts
    }
}

const mapDispatchToProps = (dispatch) => ({
    onPositionChange: (name, position, rotation, scale) => dispatch(meshChanged(name, position, rotation, scale)),
    onRotationChange: (name, position, rotation, scale) => dispatch(meshChanged(name, position, rotation, scale)),
    onScaleChange: (name, position, rotation, scale) => dispatch(meshChanged(name, position, rotation, scale)),
    onNameChange: (name, position, rotation, scale) => dispatch(meshChanged(name, position, rotation, scale)),
    onTextureChange: (project, name) => dispatch(textureChanged(project, name)),
    onMaterialChange: (name) => dispatch(materialChanged(name)),
    getScripts: (project) => dispatch(getScripts(project)),
    getSingleScript: (project, name) => dispatch(loadSingleScript(project, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
