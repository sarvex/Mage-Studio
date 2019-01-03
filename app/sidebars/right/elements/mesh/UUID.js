import React from 'react';
import {
    Icon
} from 'antd';

const UUID = ({ uuid = '' }) => (
    <div className='setting-row'>
        <label className='setting-label'>
            UUID:
        </label>
        <label className='setting-static-value'>
            { uuid }
            <Icon type='copy' theme='outlined' height='8px' width='8px' className='setting-value-action'/>
        </label>
    </div>
);

export default UUID;
