import React from 'react';
import { Col } from 'antd';
import SceneSettings from './scene/SceneSettings';
import AssetsBox from './assets/AssetsBox';
import './sidebar.scss';

const Sidebar = () => (
    <Col
        span={4}
        className="sidebar">
        <SceneSettings />
        <AssetsBox />
    </Col>
)

export default Sidebar;
