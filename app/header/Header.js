import Link from 'next/link'
import React from 'react';
import { Menu, Dropdown, Icon, message, Col, Row, Divider } from 'antd';

import ProjectMenu from './menu/ProjectMenu';
import SceneMenu from './menu/SceneMenu';

import Logo from './Logo';
import './header.scss';

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const menu = (
    <Menu onClick={onClick}>
        <Menu.Item className="option" key="1">1st menu item</Menu.Item>
        <Menu.Item className="option" key="2">2nd memu item</Menu.Item>
        <Divider/>
        <Menu.Item className="option" key="3">3rd menu item</Menu.Item>
    </Menu>
);

const Header = () => (
    <Row className="header">
        <Col span={12}>
            <Logo />
            <ProjectMenu />
            <SceneMenu />
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" className="main-menu-item" href="#">
                    View
                </a>
            </Dropdown>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" className="main-menu-item" href="#">
                    Help
                </a>
            </Dropdown>
        </Col>
    </Row>
);

export default Header;
