import React from 'react';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { FileFilled } from '@ant-design/icons';

import style from '../assets.module.scss';

const AssetItem = ({ name, type = 'file' }) => (
    <div>
        <Tooltip title={name} placement="bottom">
            <div className={classnames(styles['asset-item'], styles.folder)}>
                <FileFilled className={style.icon}/>
                <span className={style.name}>{name}</span>
            </div>
        </Tooltip>
    </div>
);

export default AssetItem;
