import React from 'react';
import { Tooltip, Icon } from 'antd';

const AddButton = () => (
    <Tooltip title="tooltip">
        <Icon className="assets-action" type="plus-square" />
    </Tooltip>
);

export default AddButton;
