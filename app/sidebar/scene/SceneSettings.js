import React from 'react';
import {
    connect
} from 'react-redux';
import { Icon } from 'antd';
import Fog from './Fog';
import Shadows from './Shadows';
import Controls from './Controls';
import Space from './Space';

import {
    controlsChanged
} from '../../actions/controls';

import {
    fogColorChanged,
    fogDensityChanged,
    fogEnabled
} from '../../actions/fog';

class SceneSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    handleControlsChange = (event) => {
        const { onControlsChange } = this.props;

        onControlsChange(event);
    }

    handleFogDensityChange = (density) => {
        const { onFogDensityChange } = this.props;

        onFogDensityChange(density);
    }

    handleFogColorChange = (color) => {
        const { onFogColorChange } = this.props;

        onFogColorChange(color);
    }

    handleFogEnabledChange = (flag) => {
        const { onFogEnabledChange } = this.props;

        onFogEnabledChange(flag);
    }

    render() {
        return (
            <div className="box">
                <p className="title">
                    <Icon className="icon" type="setting" />
                    <span>Scene settings</span>
                </p>
                <div className="content">
                    <Fog
                        color={this.props.fogColor}
                        density={this.props.fogDensity}
                        enabled={this.props.fogEnabled}
                        onFogEnabledChange={this.handleFogEnabledChange}
                        onFogColorChange={this.handleFogColorChange}
                        onFogDensityChange={this.handleFogDensityChange}
                    />
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

    const { fog = {} } = state;
    const {
        density = 0,
        enabled = true,
        color = '#000' } = fog;

    return {
        fogColor: color,
        fogDensity: density,
        fogEnabled: enabled
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFogColorChange: (color) => dispatch(fogColorChanged(color)),
        onFogEnabledChange: (flag) => dispatch(fogEnabled(flag)),
        onFogDensityChange: (density) => dispatch(fogDensityChanged(density)),
        onControlsChange: (control) => dispatch(controlsChanged(control))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneSettings);
