import React from 'react';
import { Dropdown, Menu } from 'antd';
import { HddOutlined, PlusSquareOutlined } from '@ant-design/icons';
import CopyButton from '../../../../../shared/buttons/CopyButton';
import DeleteButton from '../../../../../shared/buttons/DeleteButton';
import SearchButton from '../../../../../shared/buttons/SearchButton';
import {ASSETS_TYPES} from '../../../../../lib/constants';

const getMenu = (onAssetsMenuClick) => {
    return (
        <Menu onClick={onAssetsMenuClick}>
            { ASSETS_TYPES.map(asset => (
                <Menu.Item key={asset.code}>{asset.display}</Menu.Item>
            ))}
        </Menu>
    )
};

const AssetsMenu = ({ onAssetsMenuClick = f => f }) => (
    <div>
        <HddOutlined className="icon" type="hdd" />
        <span>Assets</span>
        <DeleteButton />
        <CopyButton />
        <Dropdown
            className='assets-action'
            overlay={getMenu(onAssetsMenuClick)}
            trigger={['click']}
            placement={'bottomLeft'}>
            <PlusSquareOutlined/>
        </Dropdown>
        <SearchButton />
    </div>
);

export default AssetsMenu;
