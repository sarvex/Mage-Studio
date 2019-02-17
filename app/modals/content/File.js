import React from 'react';
import { Tooltip, Icon } from 'antd';

const File = ({ name }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className="model-item folder">
                <Icon theme="filled" className="icon" type="file" />
                <span className="name">{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default File;
