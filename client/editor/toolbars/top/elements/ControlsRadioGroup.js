import React from 'react';
import { Radio } from 'antd';
import { DragOutlined, RedoOutlined, ArrowsAltOutlined } from '@ant-design/icons';

import style from '../toolbar.module.scss';

const ControlsRadioGroup = () => (
    <Radio.Group className={style['controls-settings-radio-group']}>
        <Radio.Button className={style['controls-settings-radio-group-button']} value="move">
            <DragOutlined height={12} width={12} />
        </Radio.Button>
        <Radio.Button className={style['controls-settings-radio-group-button']} value="rotate">
            <RedoOutlined height={12} width={12}/>
        </Radio.Button>
        <Radio.Button className={style['controls-settings-radio-group-button']} value="scale">
            <ArrowsAltOutlined height={12} width={12}/>
        </Radio.Button>
    </Radio.Group>
);

export default ControlsRadioGroup;