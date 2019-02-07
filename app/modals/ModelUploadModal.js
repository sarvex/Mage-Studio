import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Upload, Button } from 'antd';

import { createNewProject } from '../actions/projectModal';

import Footer from './footer';

import './modals.scss';

class ProjectModal extends React.Component {

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
            <div>
                <Upload.Dragger />
            </div>
        );
    }

    render() {
        const { loading, error, visible, project = false } = this.props;
        let isVisible = visible;

        if (isVisible === undefined) {
            isVisible = !project || String(project).length === 0;
        }


        return (
            <Modal
                className='modal'
                title="Project setup"
                visible={isVisible}
                footer={this.getFooter()}>
                <div className='box'>
                    <div className='content'>
                        { this.getContent() }
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
