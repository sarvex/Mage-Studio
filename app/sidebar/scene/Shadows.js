import React from 'react';
import { Switch, Icon, Checkbox, Select } from 'antd';

const Fog = (props) => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='bulb' theme='outlined' height='8px' width='8px' className='label-icon'/>
                <span className='label-text'>SHADOWS</span>
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
                    Type
                </label>
                <Select
                    className='setting-input'
                    size={'small'}
                    defaultValue='Basic'>
                    <Select.Option key='0'>Basic</Select.Option>
                    <Select.Option key='1'>PCFShadow</Select.Option>
                    <Select.Option key='2'>PCFSoftShadow</Select.Option>
                </Select>
            </div>
        </div>
    </div>
);

export default Fog;
