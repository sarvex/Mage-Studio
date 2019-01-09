import React from 'react';
import {
    connect
} from 'react-redux';
import { Icon } from 'antd';
import Fog from './Fog';
import Shadows from './Shadows';
import Controls from './Controls';
import Space from './Space';
import Snap from './Snap';

import {
    controlsChanged,
    snapValueChange,
    snapEnabledChange
} from '../../../actions/controls';

import {
    fogColorChanged,
    fogDensityChanged,
    fogEnabled
} from '../../../actions/fog';

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

    handleSnapValueChange = (value) => {
        const { onSnapValueChange } = this.props;

        onSnapValueChange(value);
    }

    handleSnapEnabledChange = (flag) => {
        const { onSnapEnabledChange } = this.props;

        onSnapEnabledChange(flag);
    }

    render() {
        return (
            <div className="box fixed-height">
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
                    <Snap
                        value={this.props.snapValue}
                        enabled={this.props.snapEnabled}
                        onSnapEnabledChange={this.handleSnapEnabledChange}
                        onSnapValueChange={this.handleSnapValueChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { fog = {}, snap = {} } = state;
    const {
        density = 0,
        enabled = true,
        color = '#000' } = fog;

    const { snapValue = 100, snapEnabled = false } = snap;

    return {
        fogColor: color,
        fogDensity: density,
        fogEnabled: enabled,
        snapValue,
        snapEnabled
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFogColorChange: (color) => dispatch(fogColorChanged(color)),
        onFogEnabledChange: (flag) => dispatch(fogEnabled(flag)),
        onFogDensityChange: (density) => dispatch(fogDensityChanged(density)),
        onControlsChange: (control) => dispatch(controlsChanged(control)),
        onSnapValueChange: (value) => dispatch(snapValueChange(value)),
        onSnapEnabledChange: (flag) => dispatch(snapEnabledChange(flag))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneSettings);
