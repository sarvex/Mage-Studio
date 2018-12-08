import React from 'react';
import { Tooltip, Icon } from 'antd';

import './assets.scss';

const Folder = ({ name }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className="asset-item folder">
                <Icon theme="twoTone" twoToneColor="#3A3D49" className="icon" type="folder" />
                <span className="name">{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default Folder;
