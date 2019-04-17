import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import CopyButton from '../../../../common/CopyButton';
import DeleteButton from '../../../../common/DeleteButton';
import AddButton from '../../../../common/AddButton';
import SearchButton from '../../../../common/SearchButton';

const getMenu = () => {
    return (
        <Menu>
            <Menu.Item>
                Texture
            </Menu.Item>
            <Menu.Item>
                Model
            </Menu.Item>
            <Menu.Item>
                Audio
            </Menu.Item>
            <Menu.Item>
                Video
            </Menu.Item>
            <Menu.Item>
                Script
            </Menu.Item>
        </Menu>
    )
}

const AssetsMenu = () => (
    <div>
        <Icon className="icon" type="hdd" />
        <span>Assets</span>
        <DeleteButton />
        <CopyButton />
        <Dropdown
            className='assets-action'
            overlay={getMenu()}
            trigger={['click']}
            placement={'bottomLeft'}>
            <Icon type="plus-square" />
        </Dropdown>
        <SearchButton />
    </div>
);

export default AssetsMenu;
