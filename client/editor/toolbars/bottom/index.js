import React, { useState } from 'react';
import { Drawer } from 'antd';
import { FolderOpenOutlined, PartitionOutlined, SettingOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { upperCaseFirst } from '../../../lib/util';
import { Hierarchy } from './panels/hierarchy/HierarchyPanel';
import AssetsPanel from './panels/assets/AssetsPanel';

import style from './bottom.module.scss';

const HIERARCHY = 'hierarchy';
const ASSETS = 'assets';
const SETTINGS = 'settings';

const hierarchyListItem = (
    <div>
        <PartitionOutlined
            className={style['bottom-toolbar-list-item-icon']}
            style={{ fontSize: '12px' }} />
        Hierarchy
    </div>
);

const assetsListItem = (
    <div>
        <FolderOpenOutlined
            className={style['bottom-toolbar-list-item-icon']}
            style={{ fontSize: '12px' }} />
        Assets
    </div>
);

const settingsListItem = (
    <div>
        <SettingOutlined
            className={style['bottom-toolbar-list-item-icon']}
            style={{ fontSize: '12px' }} />
        Settings
    </div>
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
            const className = classnames(style['bottom-toolbar-list-item'], {
                [style.selected]: selected === item
            });
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
    const [selected, changeSelected] = useState(null);
    const [drawerVisible, toggleDrawer] = useState(false);
    
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
        <div className={style['bottom-toolbar']}>
            <ul className={style['bottom-toolbar-list']}>
                { mapListItems(selected, handleClick) }
            </ul>
            <Drawer
                className={style['bottom-toolbar-drawer']}
                title={drawerTitle}
                placement={'bottom'}
                closable
                height={'60vh'}
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
