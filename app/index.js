import React from 'react';
import {Row} from 'antd';

// import ProjectModal from './modals/ProjectModal';

import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';
import EditorSettingsBar from './editor/EditorSettingsBar';
// import SceneContainer from './scene/SceneContainer';
import LeftSidebar from './sidebars/left/LeftSidebar';
// import RightSidebar from './sidebars/right/RightSidebar';

import '../lib/style.scss';

export default (props) => {
    return (
        <div className="app">
            <Header />
            <EditorSettingsBar/>
            <Row className="main-container">
                {/* <LeftSidebar /> */}
                <div className="canvas-container">
                    {/* <SceneContainer store={props.store}/> */}
                </div>
                {/* <RightSidebar /> */}
            </Row>
            <Footer />
            {/* <ProjectModal/> */}
        </div>
    );
};
