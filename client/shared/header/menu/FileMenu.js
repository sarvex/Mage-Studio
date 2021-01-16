import React, { Component } from 'react';
import { Dropdown, Menu, Divider } from 'antd';
import style from '../header.module.scss';

const { SubMenu, Item } = Menu;

export class FileMenu extends Component {

    getNewMenuContent = () => {
        const {
            isCodeEditor,
            onNewScript
        } = this.props;

        return (
            <SubMenu title="New">
                <Item
                    className="option"
                    key="1">
                    Project
                    </Item>
                <Item
                    className="option"
                    key="2">Scene</Item>
                <Item
                    disabled={!isCodeEditor}
                    onClick={onNewScript}
                    className="option"
                    key="3">Script</Item>
            </SubMenu>
        );
    }

    getOpenMenuContent = () => (
        <SubMenu title="Open">
            <Item
                className="option"
                key="1">Project</Item>
            <Item
                className="option"
                key="2">Scene</Item>
        </SubMenu>
    )

    getImportMenuContent = () => (
        <SubMenu title="Import">
            <Item
                className="option"
                key="1">Project</Item>
            <Item
                className="option"
                key="2">Scene</Item>
        </SubMenu>
    )

    getExportMenuContent = () => (
        <SubMenu title="Export">
            <Item
                className="option"
                key="1">Project</Item>
            <Item
                className="option"
                key="2">Scene</Item>
        </SubMenu>
    );

    getSaveMenuContent = () => {
        const {
            onSaveScene,
            isCodeEditor,
            onSaveScript
        } = this.props;

        return (
            <SubMenu title="Save">
                <Item
                    className="option"
                    onClick={onSaveScene}
                    disabled={isCodeEditor}
                    key="1">
                    Save Scene
                </Item>
                <Item
                    className="option"
                    disabled={!isCodeEditor}
                    onClick={onSaveScript}
                    key="save_file">
                    Save file
                </Item>
            </SubMenu>
        );
    }

    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            { this.getNewMenuContent() }
            { this.getOpenMenuContent() }
            <Divider/>
            { this.getSaveMenuContent() }
            <Divider/>
            { this.getImportMenuContent() }
            { this.getExportMenuContent() }
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className={style['main-menu-item']}>
                    File
                </span>
            </Dropdown>
        );
    }
}


export default FileMenu;
