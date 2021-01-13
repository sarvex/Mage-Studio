import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Divider } from 'antd';

import { requestSceneJson } from '../../../app/actions/scene';

const NEW = 'new';
const SAVE = 'save';
const OPEN = 'open';
const IMPORT = 'import';
const EXPORT = 'export';

export class SceneMenu extends React.Component {

    onClick = ({ key }) => {
        const { requestSceneJson } = this.props;
        switch(key) {
            case SAVE:
                requestSceneJson();
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
            <Divider/>
            <Menu.Item className="option" key={IMPORT}>Import..</Menu.Item>
            <Menu.Item className="option" key={EXPORT}>Export..</Menu.Item>
        </Menu>
    )

    render() {
        return (
            <Dropdown overlay={this.getMenuContent()}>
                <span className="main-menu-item" href="#">
                    Scene
                </span>
            </Dropdown>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestSceneJson: () => dispatch(requestSceneJson())
});

export default connect(null, mapDispatchToProps)(SceneMenu);

// add -> Cube, Sphere, .... , Model
// lights -> directional, pointlight, ambient
// sounds -> same as before
// postprocessing
