import React from 'react';
import { Row } from 'antd';

import ProjectModal from './modals/ProjectModal';

import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';
import SceneContainer from './scene/SceneContainer';
import LeftSidebar from './sidebars/left/LeftSidebar';
import RightSidebar from './sidebars/right/RightSidebar';

import '../lib/style.scss';

export default ({ store }) => (
    <div className="app">
        <Header />
        <Row className="main-container">
            <LeftSidebar />
            <div className="canvas-container">
                <SceneContainer store={store}/>
            </div>
            <RightSidebar />
        </Row>
        <Footer />
        <ProjectModal/>
    </div>
);
