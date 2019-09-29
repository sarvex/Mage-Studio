import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Divider } from 'antd';

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

    getMenuContent = () => (
        <Menu onClick={this.onClick}>
            <Menu.Item className="option" key={NEW}>New</Menu.Item>
            <Menu.Item className="option" key={OPEN}>Open</Menu.Item>
            <Divider/>
            <Menu.Item className="option" key={SAVE}>Save</Menu.Item>
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className="main-menu-item" href="#">
                    File
                </span>
            </Dropdown>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(FileMenu);
