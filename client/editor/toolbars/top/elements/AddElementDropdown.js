import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import style from '../toolbar.module.scss';
const { Item, SubMenu } = Menu;

const getAddMenu = (onItemSelect) => (
    <Menu onClick={onItemSelect}>
        <Item title='model'>
            model
        </Item>
        <SubMenu title="mesh">
            <Item key='cube' title='cube'>cube</Item>
            <Item key='sphere' title='sphere'>sphere</Item>
            <Item key='cylinder' title='cylinder'>cylinder</Item>
        </SubMenu>
        <SubMenu title="sound">
            <Item>sorry</Item>
        </SubMenu>
        <SubMenu title="light">
            <Item key='ambient' title='ambient'>ambient light</Item>
            <Item key='sun' title='sun'>sun light</Item>
        </SubMenu>
    </Menu>
);

const AddElementDropdown = ({ onElementSelection = f => f }) => {
    const onItemSelect = ({ key }) => {
        onElementSelection(key);
    };

    return (
        <div className={style['controls-settings-group']}>
            <Dropdown
                overlay={getAddMenu(onItemSelect)}
                trigger={['click']}
                placement={'topLeft'}>
                <Button className={style['space-settings-button']}>
                    <PlusOutlined/>Add
                </Button>
            </Dropdown>
        </div>
    )
};

export default AddElementDropdown;