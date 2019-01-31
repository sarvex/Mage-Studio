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
                <Dropdown
                    overlay={this.getMenu()}
                    trigger={['click']}
                    onClick={this.handleClick('add')}
                    placement={'topLeft'}>
                    <p className="scene-toolbar-action">
                        add <Icon type="down" />
                    </p>
                </Dropdown>
                <p
                    className="scene-toolbar-action"
                    onClick={this.handleClick('play')}>
                    <Icon type="caret-right" />
                </p>
                <p
                    className="scene-toolbar-action"
                    onClick={this.handleClick('fullscreen')}>
                    <Icon type="fullscreen" />
                </p>
            </div>
        )
    }
}

export default SceneToolbar;
