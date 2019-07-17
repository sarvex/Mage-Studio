import React from 'react';
import {Row} from 'antd';

import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';
import CodeEditor from './CodeEditor';

import '../lib/style.scss';
import './editor.scss';

export default () => {
    return (
        <div className="app">
            <Header />
            <Row className="main-container code-editor">
                <CodeEditor />
            </Row>
            <Footer />
        </div>
    );
};
