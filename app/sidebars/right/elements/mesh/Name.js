import React from 'react';
import { Input } from 'antd';

export default ({name = '', onNameChange = f => f }) => (
    <div className='setting-row'>
        <label className='setting-label'>
            Name
        </label>
        <div className={"setting-input right"}>
            <Input
                onChange={onNameChange}
                value={name}
                size="small"
                placeholder="name"/>
        </div>
    </div>
)
