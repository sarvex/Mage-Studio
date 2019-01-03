import React from 'react';
import { Icon, Select } from 'antd';

const Controls = ({ onControlsChange = f => f, value }) => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='tool' theme='outlined' height='8px' width='8px' className='label-icon'/>
                <span className='label-text'>CONTROLS</span>
            </div>
        </div>
        <div className='scene-setting'>
            <div className='setting-row'>
                <label className='setting-label'>
                    Type
                </label>
                <Select
                    onChange={onControlsChange}
                    className='setting-input right'
                    size={'small'}
                    defaultValue={value}>
                    <Select.Option key='translate'>translate</Select.Option>
                    <Select.Option key='rotate'>rotate</Select.Option>
                    <Select.Option key='scale'>scale</Select.Option>
                </Select>
            </div>
        </div>
    </div>
);

export default Controls;
