import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button } from 'antd';

import { uploadModel } from '../actions/modelModal';

import Footer from './footer';
import Divider from './content/Divider';
import ModelsSelector from './content/ModelsSelector';
import ModelUploader from './content/ModelUploader';

import { PROJECTS_URL } from '../lib/constants';

import './modals.scss';
import '../style.scss';

class ModelUploadModal extends React.Component {

    constructor(props) {
        super(props);
    }

    getFooter = (loading) => (
        <Footer
            loading={loading}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            canCancel
        />
    )

    handleCancel = () => {}

    handleConfirm = () => {}

    handleBeforeUpload = (file) => {
        const { uploadModel, config } = this.props;
        const { project } = config;

        uploadModel(project, file);

        return false;
    }

    getContent = () => {
        return (
            <div className='box row'>
                <ModelsSelector />
                <ModelUploader
                    onBeforeUpload={this.handleBeforeUpload}
                    name={"data"} />
            </div>
        );
    }

    render() {
        const { visible, loading } = this.props;

        return (
            <Modal
                className='modal big'
                title="Models"
                visible={visible}
                footer={this.getFooter(loading)}>
                { this.getContent() }
            </Modal>
        )
    }
}

const mapStateToProps = (state = {}) => {
    const { modelModal, config } = state;
    const { visible, loading = false, error = false, completed = false, data = false } = modelModal;

    return {
        config,
        visible,
        loading,
        completed,
        data,
        error,
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadModel: (project, payload) => dispatch(uploadModel(project, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelUploadModal);
