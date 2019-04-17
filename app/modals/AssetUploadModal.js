import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import Footer from './footer';
import FileUploaderBox from './content/FileUploaderBox';

import './modals.scss';
import '../style.scss';

class AssetUploadModal extends React.Component {

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

    handleCancel = () => {
        // const { hideModelUploadModal } = this.props;
        //
        // hideModelUploadModal();
    }

    handleConfirm = () => {}

    handleBeforeUpload = (file) => {
        // const { uploadModel, config } = this.props;
        // const { project } = config;
        //
        // uploadModel(project, file);
        //
        // return false;
    }

    render() {
        const { visible, loading } = this.props;

        return (
            <Modal
                className='modal'
                title="Models"
                visible={visible}
                onCancel={this.handleCancel}
                footer={this.getFooter(loading)}>
                <div className='box row'>
                    <FileUploaderBox
                        onBeforeUpload={this.handleBeforeUpload}
                        name={"data"} />
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state = {}) => {
    // const { modelModal, config } = state;
    // const {
    //     visible,
    //     loading = false,
    //     error = false,
    //     completed = false,
    //     data = false,
    //     list = []
    // } = modelModal;
    //
    // return {
    //     config,
    //     visible,
    //     loading,
    //     completed,
    //     data,
    //     list,
    //     error,
    // }
};

const mapDispatchToProps = (dispatch) => ({
    // getModels: (project) => dispatch(getModels(project)),
    // uploadModel: (project, payload) => dispatch(uploadModel(project, payload)),
    // hideModelUploadModal: () => dispatch(hideModelUploadModal()),
    // loadSingleModel: (project, name) => dispatch(loadSingleModel(project, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetUploadModal);
