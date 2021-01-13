import React, { Component } from 'react';
import { Dropdown, Menu, Divider } from 'antd';

const { SubMenu, Item } = Menu;

const getSidebarMenuContent = () => (
    <SubMenu title="Sidebars">
        <Item
            className="option"
            key="1">option 1</Item>
        <Item
            className="option"
            key="2">option 2</Item>
    </SubMenu>
);

const getMenuContent = () => (
    <Menu>
        <Item
            className="option"
            key="save_scene">
            <a
                href='/code'
                target='_blank'>
                Code Editor
            </a>
            </Item>
        <Item
            className="option"
            key="save_file">
            <a
                href='/'
                target='_blank'>
                Scene Editor
            </a>
        </Item>
        <Divider/>
        <Item
            className="option"
            key="toggle_fullscreen">
            Toggle Full Screen
        </Item>
        { getSidebarMenuContent() }
    </Menu>
)

export const ViewMenu = () => (
    <Dropdown overlay={getMenuContent()}>
        <span className="main-menu-item">
            View
        </span>
    </Dropdown>
);




export default ViewMenu;
