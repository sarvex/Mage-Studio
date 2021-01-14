import React from 'react';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { getImageUrl } from '../../../../../lib/constants';

import style from '../assets.module.scss';

const AssetImage = ({ name, type = 'file', project }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className={classnames(style['asset-item'], style.image)}>
                <img src={getImageUrl(project, name)} />
                <span className={style.name}>{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default AssetImage;
