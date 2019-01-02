import React from 'react';
import { Row, Col, Layout } from 'antd';
//const { Header, Footer, Sider, Content } = Layout;
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';
import Scene from './scene/Scene';

import RightSidebar from './RightSidebar/RightSidebar';

import './style.scss';

export default (props) => (
    <div className="app">
        <Header />
        <Row className="main-container">
            <Sidebar />
            <div className="canvas-container">
                <Scene />
            </div>
            <RightSidebar />
        </Row>
        <Footer />
    </div>
);
