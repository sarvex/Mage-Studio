import React from 'react';
import { Dropdown, Menu, Divider } from 'antd';
import style from '../header.module.scss';

const { Item } = Menu;

const getMenuContent = () => (
    <Menu>
        <Item
            className="option"
            key="documentation">
            <a href='https://www.mage.studio/docs' target='_blank'>Documentation</a>
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
        <span className={style['main-menu-item']}>
            Help
        </span>
    </Dropdown>
)

export default HelpMenu;
