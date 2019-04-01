import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button } from 'antd';

import {
    uploadModel,
    getModels,
    hideModelUploadModal,
    loadSingleModel
} from '../actions/modelModal';

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

    componentDidMount() {
        const { getModels = f => f, config, visible } = this.props;
        const { project } = config;

        if (visible) {
            getModels(project);
        }
    }

    getFooter = (loading) => (
        <Footer
            loading={loading}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            canCancel
        />
    )

    handleCancel = () => {
        const { hideModelUploadModal } = this.props;

        hideModelUploadModal();
    }

    handleConfirm = () => {}

    handleOnSelect = (name) => () => {
        const { loadSingleModel, config } = this.props;
        const { project } = config;

        loadSingleModel(project, name);
    }

    handleBeforeUpload = (file) => {
        const { uploadModel, config } = this.props;
        const { project } = config;

        uploadModel(project, file);

        return false;
    }

    getContent = () => {
        const { list, data } = this.props;
        return (
            <div className='box row'>
                <ModelsSelector
                    onSelect={this.handleOnSelect}
                    uploaded={data}
                    list={list}
                />
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
                onCancel={this.handleCancel}
                footer={this.getFooter(loading)}>
                { this.getContent() }
            </Modal>
        )
    }
}

const mapStateToProps = (state = {}) => {
    const { modelModal, config } = state;
    const {
        visible,
        loading = false,
        error = false,
        completed = false,
        data = false,
        list = []
    } = modelModal;

    return {
        config,
        visible,
        loading,
        completed,
        data,
        list,
        error,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getModels: (project) => dispatch(getModels(project)),
    uploadModel: (project, payload) => dispatch(uploadModel(project, payload)),
    hideModelUploadModal: () => dispatch(hideModelUploadModal()),
    loadSingleModel: (project, name) => dispatch(loadSingleModel(project, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelUploadModal);
