import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

export class SceneToolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    getMenu() {
        return (
            <Menu>
                <Menu.Item>1st menu item</Menu.Item>
                <Menu.Item>2nd menu item</Menu.Item>
                    <Menu.SubMenu title="sub menu">
                        <Menu.Item>3rd menu item</Menu.Item>
                        <Menu.Item>4th menu item</Menu.Item>
                        </Menu.SubMenu>
                    <Menu.SubMenu title="disabled sub menu" disabled>
                        <Menu.Item>5d menu item</Menu.Item>
                        <Menu.Item>6th menu item</Menu.Item>
                    </Menu.SubMenu>
            </Menu>
        )
    }

    render() {
        return (
            <div className='scene-toolbar'>
                <Dropdown overlay={this.getMenu()} trigger={['click']} placement={'topLeft'}>
                    <p className="scene-toolbar-action">
                        <a href="#">
                            <Icon type="plus-square" />
                        </a>
                    </p>
                </Dropdown>
                <p className="scene-toolbar-action">
                    <a className="scene-toolbar-action" href="#">
                        <Icon type="caret-right" />
                    </a>
                </p>
                <p className="scene-toolbar-action">
                    <a className="scene-toolbar-action" href="#">
                        <Icon type="fullscreen" />
                    </a>
                </p>
            </div>
        )
    }
}

export default SceneToolbar;
