import React from 'react';
import {Row} from 'antd';

import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';
import CodeEditor from './CodeEditor';
import NewFileModal from '../app/modals/NewFileModal';

import '../lib/style.scss';
import './editor.scss';

export default () => {
    return (
        <div className="app">
            <Header isCodeEditor/>
            <Row className="main-container code-editor">
                <CodeEditor />
            </Row>
            <Footer />
            <NewFileModal />
        </div>
    );
};
