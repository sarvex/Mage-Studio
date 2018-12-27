import React from 'react';
import { Switch, Icon, InputNumber, Input } from 'antd';

import { isValidHexColor } from './color';

class Fog extends React.Component {

    constructor(props) {
        super(props);
    }

    onSwitchChange = (flag) => {
        const { onFogEnabledChange } = this.props;

        onFogEnabledChange(flag);
    }

    onFogColorChange = (event) => {
        const { onFogColorChange } = this.props;
        const { value } = event.target;

        if (isValidHexColor(value)) {
            onFogColorChange(value);
        }
    }

    onFogDensityChange = (density) => {
        const { onFogDensityChange } = this.props;

        onFogDensityChange(density);
    }

    render() {

        const { onFogColorChange, onFogDensityChange, enabled } = this.props;
        const enabledClassName = enabled ? 'enabled' : 'disabled';
        const inputClassName = `setting-input ${enabledClassName}`;

        return (
            <div>
                <div className='scene-property'>
                    <div className='label'>
                        <Icon type='cloud' theme='outlined' height='8px' width='8px' className='label-icon'/>
                        <span className='label-text'>FOG</span>
                    </div>
                    <div className='enabled-toggle'>
                        <span>active</span>
                        <Switch
                            onChange={this.onSwitchChange}
                            size={"small"}
                            defaultChecked />
                    </div>
                </div>
                <div className='scene-setting'>
                    <div className='setting-row'>
                        <label className='setting-label'>
                            Color
                        </label>
                        <div className={inputClassName}>
                            <Input
                                onChange={this.onFogColorChange}
                                size="small"
                                disabled={!enabled}
                                placeholder="#ffffff" />
                        </div>
                    </div>
                    <div className='setting-row'>
                        <label className='setting-label'>
                            Density
                        </label>
                        <div className={inputClassName}>
                            <InputNumber
                                onChange={this.onFogDensityChange}
                                size="small"
                                min={0}
                                max={100}
                                defaultValue={this.props.density}
                                step={0.1}
                                placeholder="0"
                                disabled={!enabled} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Fog;
