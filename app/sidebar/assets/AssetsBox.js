import React from 'react';
import { Icon } from 'antd';
import AssetsTree from './AssetsTree';

const SceneSettings = () => (
    <div className="box">
        <p className="title">
            <Icon className="icon" type="hdd" />
            <span>Assets</span>
        </p>
        <div className="content">
            <AssetsTree />
        </div>
    </div>
);

export default SceneSettings;
