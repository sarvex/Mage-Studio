import React from 'react';
import { Dropdown, Menu } from 'antd';
import { HddOutlined, PlusSquareOutlined } from '@ant-design/icons';
import CopyButton from '../../../../../shared/buttons/CopyButton';
import DeleteButton from '../../../../../shared/buttons/DeleteButton';
import SearchButton from '../../../../../shared/buttons/SearchButton';
import { ASSETS_TYPES } from '../../../../../lib/constants';

import style from '../assets.module.scss';

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
        <HddOutlined className={style.icon} type="hdd" />
        <span>Assets</span>
        <DeleteButton />
        <CopyButton />
        <Dropdown
            className={style['assets-action']}
            overlay={getMenu(onAssetsMenuClick)}
            trigger={['click']}
            placement={'bottomLeft'}>
            <PlusSquareOutlined/>
        </Dropdown>
        <SearchButton />
    </div>
);

export default AssetsMenu;
