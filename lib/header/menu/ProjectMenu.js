import React from 'react';
import { Dropdown, Menu, Divider } from 'antd';
import style from '../header.module.scss';

const { SubMenu, Item } = Menu;

export default class ProjectMenu extends React.Component {

    onClick = (e) => {}

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
                    disabled={!isCodeEditor}
                    onClick={onNewScript}
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
                <span className={style['main-menu-item']}>
                    Project
                </span>
            </Dropdown>
        );
    }
}
