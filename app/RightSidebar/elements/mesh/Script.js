import React from 'react';
import { Icon, Select, Switch } from 'antd';

const Script = ({ onScriptSwitchChange = f => f }) => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='pushpin' theme='outlined' height='8px' width='8px' className='label-icon'/>
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
                    Type
                </label>
                <Select
                    className='setting-input right'
                    size={'small'}
                    defaultValue='global'>
                    <Select.Option key='0'>global</Select.Option>
                    <Select.Option key='1'>local</Select.Option>
                </Select>
            </div>
        </div>
    </div>
);

export default Script;
