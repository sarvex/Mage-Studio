import React from 'react';
import { Icon, Select } from 'antd';

const Material = () => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='pushpin' theme='outlined' height='8px' width='8px' className='label-icon'/>
                <span className='label-text'>MATERIAL</span>
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

export default Material;

// change material type,
// wireframe true/false
// color
// texture
// normal map ?
