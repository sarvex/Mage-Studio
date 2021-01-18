import React from 'react';
import classnames from 'classnames';
import { Input, Switch } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import style from '../toolbar.module.scss';

const SnapControlsGroup = () => {
    const snapSettingsContainerClassname = classnames(style['controls-settings-group'], style['snap-settings-group']);
    const snapSettingsInputClassname = classnames(style['snap-settings-group-item'], style['snap-settings-group-item-text-input']);

    return (
        <div className={snapSettingsContainerClassname}>
            <label className={style['snap-settings-group-item']}>Snap:</label>
            <Switch  className={style['snap-settings-group-item']} size="small" defaultChecked />
            <Input
                size="small"
                placeholder="1"
                className={snapSettingsInputClassname}
                prefix={<MinusOutlined/>}
                suffix={<PlusOutlined/>}/>
        </div>
    );
};

export default SnapControlsGroup;