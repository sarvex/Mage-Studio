import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Divider } from 'antd';

const { SubMenu, Item } = Menu;

const NEW = 'new';
const SAVE = 'save';
const OPEN = 'open';

export class HelpMenu extends Component {

    onClick = ({ key }) => {
        switch(key) {
            case SAVE:
                break;
            default:
                break;

        }
    }

    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            <Item className="option" key="save_scene">Documentation</Item>
            <Item className="option" key="save_file">Terms and conditions</Item>
            <Item className="option" key="faq">Frequently asked questions</Item>
            <Divider/>
            <Item className="option" key="report_issue">Report issue</Item>
            <Divider/>
            <Item className="option" key="welcome">Welcome</Item>
            <Item className="option" key="about">About Mage Studio</Item>
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className="main-menu-item">
                    Help
                </span>
            </Dropdown>
        );
    }
}

export default HelpMenu;
