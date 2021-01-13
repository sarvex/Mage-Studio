import React from 'react';
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddButton = () => (
    <Tooltip title="tooltip">
        <PlusOutlined className="assets-action" />
    </Tooltip>
);

export default AddButton;
