import React from 'react';
import { Radio } from 'antd';
import classnames from 'classnames';
import { DragOutlined, RedoOutlined, ArrowsAltOutlined } from '@ant-design/icons';

import style from '../toolbar.module.scss';
import {
    AVAILABLE_CONTROLS,
    ROTATE_CONTROL,
    SCALE_CONTROL,
    TRANSLATE_CONTROL
} from '../../../../lib/constants';

const CONTROLS_TO_BUTTON_MAP = {
    [TRANSLATE_CONTROL]: <DragOutlined height={12} width={12} />,
    [ROTATE_CONTROL]: <RedoOutlined height={12} width={12}/>,
    [SCALE_CONTROL]: <ArrowsAltOutlined height={12} width={12}/>
};

const mapControlsToRadioButtons = (selection) => (
    AVAILABLE_CONTROLS.map(control => {
        const buttonClassName = classnames(style['controls-settings-radio-group-button'], {
            [style['selected']]: selection === control
        });

        return (
            <Radio.Button className={buttonClassName} value={control}>
                { CONTROLS_TO_BUTTON_MAP[control] }
            </Radio.Button>
        );
    })
);

const ControlsRadioGroup = ({ control = TRANSLATE_CONTROL, onTransformControlChange = f => f }) => (
    <Radio.Group className={style['controls-settings-radio-group']} onChange={onTransformControlChange}>
        { mapControlsToRadioButtons(control) }
    </Radio.Group>
);

export default ControlsRadioGroup;