import React from 'react';
import { Dropdown, Menu, Divider } from 'antd';

const { Item } = Menu;

const getMenuContent = () => (
    <Menu>
        <Item
            className="option"
            key="documentation">
            Documentation
        </Item>
        <Item
            className="option"
            key="terms_and_conditions">
            Terms and conditions
        </Item>
        <Item
            className="option"
            key="faq">
            Frequently asked questions
        </Item>
        <Divider/>
        <Item
            className="option"
            key="report_issue">
            Report issue
        </Item>
        <Divider/>
        <Item
            className="option"
            key="welcome">
            Welcome
        </Item>
        <Item
            className="option"
            key="about">
            About Mage Studio
        </Item>
    </Menu>
);

export const HelpMenu = () => (
    <Dropdown overlay={getMenuContent()}>
        <span className="main-menu-item">
            Help
        </span>
    </Dropdown>
)

export default HelpMenu;
