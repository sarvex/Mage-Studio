import React from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

const DeleteButton = () => (
    <Tooltip title="tooltip">
        <DeleteOutlined className="assets-action" />
    </Tooltip>
);

export default DeleteButton;
