import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { addMesh, addLight } from '../actions/scene';

const PLAY_OPTION = 'play';
const FULLSCREEN_OPTION = 'fullscreen';
const ADD_OPTION = 'add';

export class SceneToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.defaultState = {
            add: false,
            play: false,
            fullscreen: false
        };

        this.state = this.defaultState;

        this.allowed = [ADD_OPTION, PLAY_OPTION, FULLSCREEN_OPTION];
    }

    getMenu() {
        return (
            <Menu>
                <Menu.Item title='model' onClick={this.handleModelClick}>
                    model
                </Menu.Item>
                <Menu.SubMenu title="mesh">
                    <Menu.Item title='cube' onClick={this.handleMeshClick('cube')}>cube</Menu.Item>
                    <Menu.Item title='sphere' onClick={this.handleMeshClick('sphere')}>sphere</Menu.Item>
                    <Menu.Item title='cylinder' onClick={this.handleMeshClick('cylinder')}>cylinder</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="sound">
                    <Menu.Item>sorry</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="light">
                    <Menu.Item title='ambient' onClick={this.handleLightClick('ambient')}>ambient light</Menu.Item>
                    <Menu.Item title='sun' onClick={this.handleLightClick('sun')}>sun light</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        )
    }

    handleModelClick = () => {
        const { showModelModal } = this.props;

        showModelModal();
    }

    restoreButtonHighlight = () => {
        this.setState({ ...this.defaultState });
    }

    handleMeshClick = (which) => () => {
        this.restoreButtonHighlight();
        addMesh(which);
    }

    handleLightClick = (which) => () => {
        this.restoreButtonHighlight();
        addLight(which);
    }

    handleOptionClick = (option) => {
        const { startProject = f => f, stopProject = f => f, config, playerVisible } = this.props;
        const { project } = config;

        switch(option) {
            case PLAY_OPTION:
                playerVisible ? stopProject(project) : startProject(project);
                break;
            case FULLSCREEN_OPTION:
            default:
                break;
        }
    }

    handleClick = (option) => () => {
        if (this.allowed.includes(option)) {
            this.setState({
                ...this.defaultState,
                [option]: true
            });

            this.handleOptionClick(option);
        }
    }

    getPlayIcon = (playerVisible) => (
        playerVisible ? <Icon type="pause" /> : <Icon type="caret-right" />
    )

    render() {
        const { playerVisible } = this.props;

        const addClassName = `scene-toolbar-action ${this.state.add ? 'active' : '' }`;
        const playClassName = `scene-toolbar-action ${this.state.play ? 'active' : '' }`;
        const fullscreenClassName = `scene-toolbar-action ${this.state.fullscreen ? 'active' : '' }`;

        return (
            <div className='scene-toolbar'>
                <Dropdown
                    overlay={this.getMenu()}
                    trigger={['click']}
                    onClick={this.handleClick(ADD_OPTION)}
                    placement={'topLeft'}>
                    <p className={addClassName}>
                        <Icon type="plus" />
                    </p>
                </Dropdown>
                <p
                    className={playClassName}
                    onClick={this.handleClick(PLAY_OPTION)}>
                    { this.getPlayIcon(playerVisible)}
                </p>
                <p
                    className={fullscreenClassName}
                    onClick={this.handleClick(FULLSCREEN_OPTION)}>
                    <Icon type="fullscreen" />
                </p>
            </div>
        )
    }
}

export default SceneToolbar;
