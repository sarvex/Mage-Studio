import React from 'react';
import { Row, Col, Layout } from 'antd';
//const { Header, Footer, Sider, Content } = Layout;
import Header from './header/Header';
import Footer from './footer/Footer';

import './style.scss';

export default (props) => (
    <div className="app">
        <Header />
        <Row className="main">
            <Col span={8}>col-8</Col>
            <Col span={16}>{props.children}</Col>
        </Row>
        <Footer />
    </div>
);
