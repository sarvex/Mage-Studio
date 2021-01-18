import React from 'react';
import { Tooltip, Button } from 'antd';
import style from '../toolbar.module.scss';

const TOOLTIP_LABEL = 'Local/global space setting';

const SpaceSettingsButton = ({ onClick = f => f }) => (
    <Tooltip title={TOOLTIP_LABEL}>
        <Button
            className={style['space-settings-button']}
            onClick={onClick}>
            Global
        </Button>
    </Tooltip>
);

export default SpaceSettingsButton;