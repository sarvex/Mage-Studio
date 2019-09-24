import React, { useState } from 'react';
import { Row } from 'antd';

import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';
import CodeEditor from './CodeEditor';

import '../lib/style.scss';
import './editor.scss';

export default () => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleNewScript = () => {
        if (!modalVisible) {
            setModalVisible(true);
        }
    };

    return (
        <div className="app">
            <Header
                onNewScript={handleNewScript}
                isCodeEditor/>
            <Row className="main-container code-editor">
                <CodeEditor
                    modalVisible={modalVisible}
                    onModalDismiss={() => setModalVisible(false)}/>
            </Row>
            <Footer />
        </div>
    );
};
