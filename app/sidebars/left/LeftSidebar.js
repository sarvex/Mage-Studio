import React from 'react';
import { Col } from 'antd';
// import SceneSettings from './scene/SceneSettings';
import AssetsBox from './assets/AssetsBox';
import '../sidebar.scss';

const LeftSidebar = () => (
    <Col
        span={4}
        className="sidebar">
        {/* <SceneSettings /> */}
        <AssetsBox />
    </Col>
)

export default LeftSidebar;
