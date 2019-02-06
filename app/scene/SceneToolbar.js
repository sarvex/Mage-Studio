import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { doSomething } from './AppProxy';

export class SceneToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.defaultState = {
            add: false,
            play: false,
            fullscreen: false
        };

        this.state = this.defaultState;

        this.allowed = ['add', 'play', 'fullscreen'];
    }

    getMenu() {
        return (
            <Menu>
                <Menu.Item>model</Menu.Item>
                    <Menu.SubMenu title="mesh">
                        <Menu.Item onClick={this.handleMenuClick('cube')}>cube</Menu.Item>
                        <Menu.Item onClick={this.handleMenuClick('sphere')}>sphere</Menu.Item>
                        <Menu.Item onClick={this.handleMenuClick('cylinder')}>cylinder</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu title="sound">
                        <Menu.Item>sorry</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu title="light">
                        <Menu.Item>sorry</Menu.Item>
                    </Menu.SubMenu>

            </Menu>
        )
    }

    handleMenuClick = (which) => () => {
        console.log('handling', which);
        this.setState({ ...this.defaultState });
        doSomething();
    }

    handleClick = (option) => () => {
        if (this.allowed.includes(option)) {
            this.setState({
                ...this.defaultState,
                [option]: true
            });
        }
    }

    render() {
        const addClassName = `scene-toolbar-action ${this.state.add ? 'active' : '' }`;
        const playClassName = `scene-toolbar-action ${this.state.play ? 'active' : '' }`;
        const fullscreenClassName = `scene-toolbar-action ${this.state.fullscreen ? 'active' : '' }`;

        return (
            <div className='scene-toolbar'>
                <Dropdown
                    overlay={this.getMenu()}
                    trigger={['click']}
                    onClick={this.handleClick('add')}
                    placement={'topLeft'}>
                    <p className={addClassName}>
                        <Icon type="plus" />
                    </p>
                </Dropdown>
                <p
                    className={playClassName}
                    onClick={this.handleClick('play')}>
                    <Icon type="caret-right" />
                </p>
                <p
                    className={fullscreenClassName}
                    onClick={this.handleClick('fullscreen')}>
                    <Icon type="fullscreen" />
                </p>
            </div>
        )
    }
}

export default SceneToolbar;
