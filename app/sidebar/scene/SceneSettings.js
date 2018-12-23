import React from 'react';
import {
    connect
} from 'react-redux';
import { Icon } from 'antd';

const SceneSettings = ({ position, }) => (
    <div className="box">
        <p className="title">
            <Icon className="icon" type="setting" />
            <span>Scene settings</span>
        </p>
        <div className="content">
            {position.x}
            <br/>
            {position.y}
            <br/>
            {position.z}
        </div>
    </div>
);

const mapStateToProps = (state) => {

    const { currentMesh = {} } = state;
    const {
        position = {x: 0, y: 0, z: 0},
        rotation = {x: 0, y: 0, z: 0},
        scale = {x: 0, y: 0, z: 0} } = currentMesh;

    return {
        position,
        rotation,
        scale
    };
};

export default connect(mapStateToProps)(SceneSettings);
