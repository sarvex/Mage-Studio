import React from 'react';
import { Icon, Select } from 'antd';

const Fog = (props) => (
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
                    className='setting-input'
                    size={'small'}
                    defaultValue='traslate'>
                    <Select.Option key='0'>traslate</Select.Option>
                    <Select.Option key='1'>rotate</Select.Option>
                    <Select.Option key='2'>scale</Select.Option>
                </Select>
            </div>
        </div>
    </div>
);

export default Fog;

/*
<Radio.Group defaultValue="translate" size='small' className='setting-input'>
    <Radio.Button value="translate">
        <Icon type='reload' theme='outlined' height='12px' width='12px' className='control-icon' />
        TRASLATE
    </Radio.Button>
    <Radio.Button value="rotate">ROTATE</Radio.Button>
    <Radio.Button value="scale">SCALE</Radio.Button>
</Radio.Group>

*/
