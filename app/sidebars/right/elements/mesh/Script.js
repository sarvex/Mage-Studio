import React from 'react';
import { Icon, Select, Switch } from 'antd';

const Script = ({ onScriptSwitchChange = f => f }) => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='code' theme='outlined' height='8px' width='8px' className='label-icon'/>
                <span className='label-text'>SCRIPT</span>
            </div>
            <div className='enabled-toggle'>
                <span>active</span>
                <Switch
                    onChange={onScriptSwitchChange}
                    size={"small"}
                    defaultChecked />
            </div>
        </div>
        <div className='scene-setting'>
            <div className='setting-row'>
                <label className='setting-label'>
                    Name
                </label>
                <Select
                    className='setting-input right'
                    size={'small'}>
                </Select>
            </div>
        </div>
    </div>
);

export default Script;
