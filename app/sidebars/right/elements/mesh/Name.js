import React from 'react';
import { Input } from 'antd';

export default ({name = ''}) => (
    <div className='setting-row'>
        <label className='setting-label'>
            Name
        </label>
        <div className={"setting-input right"}>
            <Input
                size="small"
                placeholder="name"/>
        </div>
    </div>
)
