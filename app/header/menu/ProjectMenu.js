import React from 'react';
import { Dropdown, Menu, Divider } from 'antd';

export default class ProjectMenu extends React.Component {

    onClick = (e) => {}

    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            <Menu.Item className="option" key="1">New</Menu.Item>
            <Menu.Item className="option" key="2">Open</Menu.Item>
            <Divider/>
            <Menu.Item className="option" key="3">Save</Menu.Item>
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className="main-menu-item" href="#">
                    Project
                </span>
            </Dropdown>
        );
    }
}
