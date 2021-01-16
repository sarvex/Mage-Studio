import React from 'react';
import { Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const CopyButton = () => (
    <Tooltip title="tooltip">
        <CopyOutlined className="assets-action" />
    </Tooltip>
);

export default CopyButton;
