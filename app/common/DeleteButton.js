import React from 'react';
import { Tooltip, Icon } from 'antd';

const DeleteButton = () => (
    <Tooltip title="tooltip">
        <Icon className="assets-action" type="delete" />
    </Tooltip>
);

export default DeleteButton;
