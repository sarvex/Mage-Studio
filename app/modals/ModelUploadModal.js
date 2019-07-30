import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import {
    uploadModel,
    getModels,
    hideModelUploadModal,
    loadSingleModel
} from '../actions/models';

import Footer from './footer';
import ModelsSelector from './content/ModelsSelector';
import FileUploaderBox from './content/FileUploaderBox';

import './modals.scss';
import '../../lib/style.scss';

export class ModelUploadModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: false,
            selection: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible && this.props.visible) {
            this.fetchModels();
            this.setState({ file: false, selection: false });
        }
    }

    componentDidMount() {
        this.fetchModels();
    }

    fetchModels = () => {
        const { getModels = f => f, config } = this.props;
        const { project } = config;

        getModels(project);
    };

    getFooter = (loading) => (
        <Footer
            loading={loading}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            canCancel
        />
    );

    handleCancel = () => {
        const { onDismiss } = this.props;

        onDismiss();
    };

    handleConfirm = () => {
        const { loadSingleModel, config, uploadModel } = this.props;
        const { selection, file } = this.state;
        const { project } = config;

        if (file) {
            uploadModel(project, file);
        } else if (selection) {
            loadSingleModel(project, selection);
        }
    }

    handleOnSelect = (selection) => {
        this.setState({ selection });
    }

    handleBeforeUpload = (file) => {
        this.setState({ file });

        return false;
    }

    getContent = () => {
        const { list } = this.props;
        const { selection } = this.state;

        return (
            <div className='box row'>
                <ModelsSelector
                    onSelect={this.handleOnSelect}
                    selection={selection}
                    list={list}
                />
                <FileUploaderBox
                    className={'models'}
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
    const { models, config } = state;
    const {
        visible,
        loading = false,
        error = false,
        completed = false,
        data = false,
        list = []
    } = models;

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
    onDismiss: () => dispatch(hideModelUploadModal()),
    loadSingleModel: (project, name) => dispatch(loadSingleModel(project, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelUploadModal);
