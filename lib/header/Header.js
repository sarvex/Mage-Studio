import React from 'react';
import { Menu, Dropdown, message, Divider } from 'antd';
import { connect } from 'react-redux';

import HelpMenu from './menu/HelpMenu';
import ViewMenu from './menu/ViewMenu';
import FileMenu from './menu/FileMenu';

import Logo from './Logo';
import './header.scss';

export const Header = ({ isCodeEditor, onNewScript, onSaveScene }) => (
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

const mapDispatchToProps = (dispatch) => ({
    onSaveScene: () => dispatch(requestSceneJson())
});

export default connect(null, mapDispatchToProps)(Header);
