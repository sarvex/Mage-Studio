import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import CopyButton from '../../../../common/CopyButton';
import DeleteButton from '../../../../common/DeleteButton';
import SearchButton from '../../../../common/SearchButton';
import {ASSETS_TYPES} from '../../../../lib/constants';

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
        <Icon className="icon" type="hdd" />
        <span>Assets</span>
        <DeleteButton />
        <CopyButton />
        <Dropdown
            className='assets-action'
            overlay={getMenu(onAssetsMenuClick)}
            trigger={['click']}
            placement={'bottomLeft'}>
            <Icon type="plus-square" />
        </Dropdown>
        <SearchButton />
    </div>
);

export default AssetsMenu;
