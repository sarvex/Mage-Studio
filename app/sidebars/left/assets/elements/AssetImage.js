import React from 'react';
import { Tooltip } from 'antd';
import { getImageUrl } from '../../../../lib/constants';

import '../assets.scss';

const AssetImage = ({ name, type = 'file', project }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className="asset-item image">
                <img src={getImageUrl(project, name)} />
                <span className="name">{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default AssetImage;
