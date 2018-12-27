import React from 'react';
import {
    connect
} from 'react-redux';
import { Icon } from 'antd';
import Fog from './Fog';
import Shadows from './Shadows';
import Controls from './Controls';
import Space from './Space';

import { controlsChanged } from '../../actions/scenesettings';

class SceneSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    handleControlsChange = (event) => {
        const { onControlsChange } = this.props;

        onControlsChange(event);
    }

    render() {
        return (
            <div className="box">
                <p className="title">
                    <Icon className="icon" type="setting" />
                    <span>Scene settings</span>
                </p>
                <div className="content">
                    <Fog />
                    <Shadows />
                    <Controls
                        value='translate'
                        onControlsChange={this.handleControlsChange}/>
                    <Space />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { currentMesh = {} } = state;
    const {
        position = {x: 0, y: 0, z: 0},
        rotation = {x: 0, y: 0, z: 0},
        scale = {x: 0, y: 0, z: 0} } = currentMesh;

    return {
        position,
        rotation,
        scale
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onControlsChange: (control) => dispatch(controlsChanged(control))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneSettings);
