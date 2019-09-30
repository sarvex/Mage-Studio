import React from 'react';
import { Menu, Dropdown, message, Divider } from 'antd';

import HelpMenu from './menu/HelpMenu';
import ViewMenu from './menu/ViewMenu';
import FileMenu from './menu/FileMenu';

import Logo from './Logo';
import './header.scss';

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const Header = ({ isCodeEditor, onNewScript, onSaveScene }) => (
    <div className="header">
        <Logo />
        <FileMenu
            isCodeEditor={isCodeEditor}
            onNewScript={onNewScript}
            onSaveScene={onSaveScene}
        />
        <ViewMenu />
        <HelpMenu />
    </div>
);

export default Header;
