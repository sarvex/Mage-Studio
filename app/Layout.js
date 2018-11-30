import React from 'react';
import { Row, Col, Layout } from 'antd';
//const { Header, Footer, Sider, Content } = Layout;
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';

import './style.scss';

export default (props) => (
    <div className="app">
        <Header />
        <Row className="main-container">
            <Sidebar />
            <Col span={20}>{props.children}</Col>
        </Row>
        <Footer />
    </div>
);
