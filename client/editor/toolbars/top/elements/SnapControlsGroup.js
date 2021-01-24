import React from 'react';
import classnames from 'classnames';
import { Input, Switch } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import style from '../toolbar.module.scss';

const SnapControlsGroup = ({ enabled, snap, onSnapIncrease, onSnapDecrease, onSnapEnabledChange }) => {
    const snapSettingsContainerClassname = classnames(
        style['controls-settings-group'],
        style['snap-settings-group'], {
            [style.enabled]: enabled
        });
    const snapSettingsInputClassname = classnames(style['snap-settings-group-item'], style['snap-settings-group-item-text-input']);

    return (
        <div className={snapSettingsContainerClassname}>
            <label className={style['snap-settings-group-item']}>Snap:</label>
            <Switch
                onChange={onSnapEnabledChange}
                className={style['snap-settings-group-item']}
                size="small"
                checked={enabled} />
            <Input
                size="small"
                placeholder="1"
                value={snap}
                className={snapSettingsInputClassname}
                prefix={<MinusOutlined onClick={onSnapDecrease} />}
                suffix={<PlusOutlined onClick={onSnapIncrease} />}/>
        </div>
    );
};

export default SnapControlsGroup;