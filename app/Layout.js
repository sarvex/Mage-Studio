import React from 'react';
import { Row, Col, Layout } from 'antd';

import ProjectModal from './modals/ProjectModal';

import Header from './header/Header';
import Footer from './footer/Footer';
import Scene from './scene/Scene';
import LeftSidebar from './sidebars/left/LeftSidebar';
import RightSidebar from './sidebars/right/RightSidebar';

import './style.scss';

export default (props) => {
    return (
        <div className="app">
            <Header />
            <Row className="main-container">
                <LeftSidebar />
                <div className="canvas-container">
                    <Scene />
                </div>
                <RightSidebar />
            </Row>
            <Footer />
            <ProjectModal project={props.project}/>

        </div>
    );
};
