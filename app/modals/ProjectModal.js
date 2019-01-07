import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'antd';

import { createNewProject } from '../actions/projectModal';

import Footer from './footer';

import './modals.scss';

class ProjectModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    onConfirm = () => {
        const { onConfirm } = this.props;

        onConfirm(this.state.value);
    }

    getFooter = () => (
        <Footer
            loading={this.props.loading}
            onCancel={this.props.onCancel}
            onConfirm={this.onConfirm} />
    )

    render() {
        const { value } = this.state;
        const { loading, error, visible, project = false } = this.props;
        let isVisible = visible;

        if (isVisible === undefined) {
            isVisible = !project || String(project).length === 0;
        }

        return (
            <Modal
                className='modal'
                title="New Project"
                visible={isVisible}
                footer={this.getFooter()}>
                <div className='box'>
                    <div className='content'>
                        <div className='scene-setting'>
                            <div className='setting-row'>
                                <label className='setting-label'>
                                    Project Name
                                </label>
                                <div className='setting-input right'>
                                    <Input
                                        onChange={this.onChange}
                                        value={value}
                                        size="small"
                                        placeholder="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state = {}) => {
    const { projectModal } = state;
    const { visible, loading = false, error = false } = projectModal;

    return {
        visible,
        loading,
        error
    }
}

const mapDispatchToProps = (dispatch) => ({
    onConfirm: (name) => dispatch(createNewProject(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
