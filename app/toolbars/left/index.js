import React, { useState } from 'react';
import { Drawer } from 'antd';
import { FolderOutlined, HddOutlined, FolderOpenOutlined, PartitionOutlined, SettingOutlined } from '@ant-design/icons';
import './lefttoolbar.scss';
import { upperCaseFirst } from '../../lib/util';
import HierarchyPanel from './panels/hierarchy/HierarchyPanel';

const HIERARCHY = 'hierarchy';
const ASSETS = 'assets';
const SETTINGS = 'settings';

const hierarchyListItem = (
    <>
        <PartitionOutlined
            className='left-toolbar-list-item-icon'
            style={{ fontSize: '12px' }} />
        Hierarchy
    </>
);

const assetsListItem = (
    <>
        <FolderOpenOutlined
            className='left-toolbar-list-item-icon'
            style={{ fontSize: '12px' }} />
        Assets
    </>
);

const settingsListItem = (
    <>
        <SettingOutlined
            className='left-toolbar-list-item-icon'
            style={{ fontSize: '12px' }} />
        Settings
    </>
)

const TOOLBAR_ITEMS = {
    [HIERARCHY]: hierarchyListItem,
    [ASSETS]: assetsListItem,
    [SETTINGS]: settingsListItem
};

const getDrawerPanel = selection => ({
    [HIERARCHY]: HierarchyPanel,
    [ASSETS]: HierarchyPanel,
    [SETTINGS]: HierarchyPanel
}[selection]);

const mapListItems = (selected, onClick) => (
    Object
        .keys(TOOLBAR_ITEMS)
        .map(item => {
            const className = `left-toolbar-list-item ${selected === item ? 'selected' : ''}`;
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
    const [selected, changeSelected] = useState('');
    const [drawerVisible, toggleDrawer] = useState(false);
    
    const handleClick = (selection) => {
        changeSelected(selection);
        toggleDrawer(!!selection);
    };

    const handleDrawerClose = () => {
        changeSelected('');
        toggleDrawer(false);
    };

    return (
        <div className='left-toolbar'>
            <ul className='left-toolbar-list'>
                { mapListItems(selected, handleClick) }
            </ul>
            <Drawer
                className='left-toolbar-drawer'
                title={upperCaseFirst(selected)}
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
                { getDrawerPanel('hierarchy') }
            </Drawer>
        </div>
    );
};