import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Steps, Button } from 'antd';

import { createNewProject } from '../actions/projectModal';

import FooterSteps from './FooterSteps';

import './modals.scss';

class ProjectModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            current: 0
        };

        this.titles = ['Project', 'Scene', 'almost done'];
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
        <FooterSteps
            loading={this.props.loading}
            current={this.state.current}
            length={this.titles.length}
            onNext={this.next}
            onPrevious={this.prev}
            onCancel={this.props.onCancel}
            onConfirm={this.onConfirm} />
    )

    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    getStep() {
        const { value } = this.state;

        return (
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
        )
    }

    getContent = () => {
        const { current } = this.state;

        return (
            <div>
                <Steps current={current} size='small'>
                    {this.titles.map(title => <Steps.Step key={title} title={title} />)}
                </Steps>
                <div className="current-step">
                    { this.getStep() }
                </div>
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
