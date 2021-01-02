import React from 'react';
import {Row} from 'antd';

import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';
import TopToolbar from './toolbars/top';
import LeftToolbar from './toolbars/left';
import SceneContainer from './scene/SceneContainer';

export default (props) => {
    return (
        <div className="app">
            <Header />
            <TopToolbar/>
            <Row className="main-container">
                <LeftToolbar />
                <div className="canvas-container">
                    <SceneContainer store={props.store}/>
                </div>
                {/* <RightSidebar /> */}
            </Row>
            <Footer />
            {/* <ProjectModal/> */}
        </div>
    );
};
