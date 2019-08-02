import React from 'react';
import { Dropdown, Menu, Divider } from 'antd';

const { SubMenu, Item } = Menu;

export default class ProjectMenu extends React.Component {

    onClick = (e) => {}

    getNewMenuContent = () => {
        const { isCodeEditor } = this.props;

        return (
            <SubMenu title="New">
                <Item
                    className="option"
                    key="1">Project</Item>
                <Item
                    disabled={!isCodeEditor}
                    className="option"
                    key="2">File</Item>
            </SubMenu>
        );
    }

    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            { this.getNewMenuContent() }
            <Item className="option" key="2">Open</Item>
            <Divider/>
            <Item className="option" key="3">Save</Item>
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
