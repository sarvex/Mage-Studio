import React from 'react';
import { Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchButton = () => (
    <Tooltip title="tooltip">
        <SearchOutlined className="assets-action" />
    </Tooltip>
);

export default SearchButton;
