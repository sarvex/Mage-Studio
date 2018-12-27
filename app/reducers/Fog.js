import React from 'react';
import { Switch, Icon, InputNumber, Input } from 'antd';

const Fog = (props) => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='cloud' theme='outlined' height='8px' width='8px' className='label-icon'/>
                <span className='label-text'>FOG</span>
            </div>
            <div className='enabled-toggle'>
                <span>active</span>
                <Switch
                    size={"small"}
                    defaultChecked />
            </div>
        </div>
        <div className='scene-setting'>
            <div className='setting-row'>
                <label className='setting-label'>
                    Color
                </label>
                <div className='setting-input'>
                    <Input
                        size="small"
                        placeholder="#ffffff" />
                </div>
            </div>
            <div className='setting-row'>
                <label className='setting-label'>
                    Density
                </label>
                <div className='setting-input'>
                    <InputNumber
                        size="small"
                        min={0}
                        max={100}
                        defaultValue={0}
                        step={0.1}
                        placeholder="0" />
                </div>
            </div>
        </div>
    </div>
);

export default Fog;
