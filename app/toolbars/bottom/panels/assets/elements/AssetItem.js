import React from 'react';
import { Tooltip } from 'antd';
import { FileFilled } from '@ant-design/icons';

const AssetItem = ({ name, type = 'file' }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className="asset-item folder">
                <FileFilled className="icon"/>
                <span className="name">{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default AssetItem;
