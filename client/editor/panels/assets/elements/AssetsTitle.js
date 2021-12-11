import React from 'react';
import { Dropdown, Menu } from 'antd';
import { HddOutlined, PlusSquareOutlined } from '@ant-design/icons';
import CopyButton from '../../../shared/buttons/CopyButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SearchButton from '../../../shared/buttons/SearchButton';
import { ASSETS_TYPES } from '../../../../lib/constants';

import style from '../assets.module.scss';

const getMenu = (onAssetsTitleClick) => {
    return (
        <Menu onClick={onAssetsTitleClick}>
            { ASSETS_TYPES.map(asset => (
                <Menu.Item key={asset.code}>{asset.display}</Menu.Item>
            ))}
        </Menu>
    )
};

const AssetsTitle = ({ onAssetsTitleClick = f => f }) => (
    <div>
        <h3 className={style.title}>Assets</h3>
        <DeleteButton />
        <CopyButton />
        <Dropdown
            className={style['assets-action']}
            overlay={getMenu(onAssetsTitleClick)}
            trigger={['click']}
            placement={'bottomLeft'}>
            <PlusSquareOutlined/>
        </Dropdown>
        <SearchButton />
    </div>
);

export default AssetsTitle;
