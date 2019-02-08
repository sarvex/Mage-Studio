import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Upload, Icon, Button } from 'antd';

import { createNewProject } from '../actions/projectModal';

import Footer from './footer';
import Divider from './content/Divider';
import ModelsSelector from './content/ModelsSelector';

import './modals.scss';
import '../style.scss';

class ModelUploadModal extends React.Component {

    constructor(props) {
        super(props);
    }

    getFooter = () => (
        <Footer
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            canCancel
        />
    )

    handleCancel = () => {}

    handleConfirm = () => {}

    getContent = () => {
        return (
            <div className='box row'>
                <ModelsSelector />
                <Divider />
                <div className='content'>
                    <Upload.Dragger>
                        <p>
                            <Icon type="inbox" />
                        </p>
                        <p>Click or drag file to this area to upload</p>
                    </Upload.Dragger>
                </div>
            </div>
        );
    }

    render() {
        const { loading, error, visible } = this.props;

        return (
            <Modal
                className='modal'
                title="Project setup"
                visible={visible}
                footer={this.getFooter()}>
                { this.getContent() }
            </Modal>
        )
    }
}

const mapStateToProps = (state = {}) => {
    const { modelModal, config } = state;
    const { visible, loading = false, error = false } = modelModal;

    return {
        visible,
        loading,
        error,
    }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModelUploadModal);
