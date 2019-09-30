import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Divider } from 'antd';

const { SubMenu, Item } = Menu;

const NEW = 'new';
const SAVE = 'save';
const OPEN = 'open';

export class FileMenu extends Component {

    onClick = ({ key }) => {
        switch(key) {
            case SAVE:
                break;
            default:
                break;

        }
    }

    getNewMenuContent = () => {
        const {
            isCodeEditor,
            onNewScript
        } = this.props;

        return (
            <SubMenu title="New">
                <Item
                    className="option"
                    key="1">Project</Item>
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
    )


    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            { this.getNewMenuContent() }
            { this.getOpenMenuContent() }
            <Divider/>
            <Item className="option" key="save_scene">Save scene</Item>
            <Item className="option" key="save_file">Save file</Item>
            <Item className="option" key="save_all">Save all</Item>
            <Divider/>
            { this.getImportMenuContent() }
            { this.getExportMenuContent() }
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className="main-menu-item">
                    File
                </span>
            </Dropdown>
        );
    }
}


export default FileMenu;
