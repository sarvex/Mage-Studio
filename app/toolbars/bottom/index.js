import React, { useState } from 'react';
import { Drawer } from 'antd';
import { FolderOpenOutlined, PartitionOutlined, SettingOutlined } from '@ant-design/icons';
import './bottom.scss';
import { upperCaseFirst } from '../../lib/util';
import { Hierarchy } from './panels/hierarchy/HierarchyPanel';
import AssetsPanel from './panels/assets/AssetsPanel';

const HIERARCHY = 'hierarchy';
const ASSETS = 'assets';
const SETTINGS = 'settings';

const hierarchyListItem = (
    <>
        <PartitionOutlined
            className='bottom-toolbar-list-item-icon'
            style={{ fontSize: '12px' }} />
        Hierarchy
    </>
);

const assetsListItem = (
    <>
        <FolderOpenOutlined
            className='bottom-toolbar-list-item-icon'
            style={{ fontSize: '12px' }} />
        Assets
    </>
);

const settingsListItem = (
    <>
        <SettingOutlined
            className='bottom-toolbar-list-item-icon'
            style={{ fontSize: '12px' }} />
        Settings
    </>
)

const TOOLBAR_ITEMS = {
    [HIERARCHY]: hierarchyListItem,
    [ASSETS]: assetsListItem,
    [SETTINGS]: settingsListItem
};

const DRAWER_PANELS = {
    [HIERARCHY]: <Hierarchy/>,
    [ASSETS]: <AssetsPanel/>,
    [SETTINGS]: <Hierarchy/>
};

const mapListItems = (selected, onClick) => (
    Object
        .keys(TOOLBAR_ITEMS)
        .map(item => {
            const className = `bottom-toolbar-list-item ${selected === item ? 'selected' : ''}`;
            const handleClick = () => selected === item ? onClick(false) : onClick(item);

            return (
                <li
                     key={item}
                     className={className}
                     onClick={handleClick}>
                    { TOOLBAR_ITEMS[item] }
                </li>
            )
        })
);

export default props => {
    const [selected, changeSelected] = useState(HIERARCHY);
    const [drawerVisible, toggleDrawer] = useState(true);
    
    const handleClick = (selection) => {
        changeSelected(selection);
        toggleDrawer(!!selection);
    };

    const handleDrawerClose = () => {
        changeSelected('');
        toggleDrawer(false);
    };

    const panel = selected && DRAWER_PANELS[selected];
    const drawerTitle = selected && upperCaseFirst(selected);

    return (
        <div className='bottom-toolbar'>
            <ul className='bottom-toolbar-list'>
                { mapListItems(selected, handleClick) }
            </ul>
            <Drawer
                className='bottom-toolbar-drawer'
                title={drawerTitle}
                placement={'bottom'}
                closable
                height={640}
                width={320}
                mask={false}
                onClose={handleDrawerClose}
                visible={drawerVisible}
                getContainer={false}
                style={{
                    position: 'absolute',
                    bottom: '42px' }}>
                { panel }
            </Drawer>
        </div>
    );
};