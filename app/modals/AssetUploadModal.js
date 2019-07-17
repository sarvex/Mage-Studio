import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import Footer from './footer';
import FileUploaderBox from './content/FileUploaderBox';

import './modals.scss';
import '../../lib/style.scss';

class AssetUploadModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    getFooter = (loading) => (
        <Footer
            loading={loading}
            onConfirm={this.handleConfirm}
        />
    )

    handleCancel = () => {
        const { hideModal = f => f } = this.props;

        hideModal();
    }

    handleConfirm = () => {
       const { file } = this.state;
       const { onUpload } = this.props;

       if (file) {
           onUpload(file);
       }
    }

    handleBeforeUpload = (file) => {
        this.setState({ file });

        return false;
    }

    render() {
        const { visible, loading, type } = this.props;

        return (
            <Modal
                className='modal'
                title={type}
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

export default AssetUploadModal;
