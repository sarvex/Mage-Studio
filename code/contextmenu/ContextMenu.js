import React, { Component } from 'react';
import { Dropdown, Menu, Divider } from 'antd';

const getMenu = (onOptionClick) => (
    <Menu onClick={onOptionClick}>
        <Menu.Item key={'new_file'}>new file</Menu.Item>
        <Menu.Item key={'new_folder'}>new folder</Menu.Item>
        <Divider/>
        <Menu.Item key={'rename'}>rename</Menu.Item>
    </Menu>
);

const ContextMenu = ({ children, onOptionClick = f => f }) => (
    <Dropdown
        overlay={getMenu(onOptionClick)}
        trigger={['contextMenu']}>
        { children }
    </Dropdown>
);

export default ContextMenu;
