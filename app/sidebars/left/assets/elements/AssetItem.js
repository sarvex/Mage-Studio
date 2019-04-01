import React from 'react';
import { Tooltip, Icon } from 'antd';

import '../assets.scss';

const AssetItem = ({ name, type = 'file' }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className="asset-item folder">
                <Icon theme="filled" className="icon" type={type} />
                <span className="name">{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default AssetItem;
