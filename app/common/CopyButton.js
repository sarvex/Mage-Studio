import React from 'react';
import { Tooltip, Icon } from 'antd';

const CopyButton = () => (
    <Tooltip title="tooltip">
        <Icon className="assets-action" type="copy" />
    </Tooltip>
);

export default CopyButton;
