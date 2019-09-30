import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Divider } from 'antd';

const { SubMenu, Item } = Menu;

const NEW = 'new';
const SAVE = 'save';
const OPEN = 'open';

export class ViewMenu extends Component {

    onClick = ({ key }) => {
        switch(key) {
            case SAVE:
                break;
            default:
                break;

        }
    }

    getSidebarMenuContent = () => (
        <SubMenu title="Sidebars">
            <Item
                className="option"
                key="1">option 1</Item>
            <Item
                className="option"
                key="2">option 2</Item>
        </SubMenu>
    )

    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            <Item className="option" key="save_scene">Code Editor</Item>
            <Item className="option" key="save_file">Scene Editor</Item>
            <Divider/>
            <Item className="option" key="save_scene">Toggle Full Screen</Item>
            { this.getSidebarMenuContent() }
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className="main-menu-item">
                    View
                </span>
            </Dropdown>
        );
    }
}


export default ViewMenu;
