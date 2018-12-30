import React from 'react';
import { Tooltip, Icon } from 'antd';

const SearchButton = () => (
    <Tooltip title="tooltip">
        <Icon className="assets-action" type="search" />
    </Tooltip>
);

export default SearchButton;
