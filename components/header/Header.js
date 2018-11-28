import Link from 'next/link'
import React from 'react';
import { Menu, Dropdown, Icon, message, Col, Row, Divider } from 'antd';
import './header.scss';

const style = {
    marginRight: 24
};

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const menu = (
    <Menu onClick={onClick} theme={"dark"}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd memu item</Menu.Item>
        <Divider/>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

const Header = () => (
    <Row className="header">
        <Col span={12}>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" className="main-menu-item" href="#">
                    Project
                </a>
            </Dropdown>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" className="main-menu-item" href="#">
                    Scene
                </a>
            </Dropdown>
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
