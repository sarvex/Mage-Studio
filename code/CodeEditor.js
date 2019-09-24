import React from 'react';
import './theme.scss';

import ProjectTree from './ProjectTree';
import { Col, Skeleton } from 'antd';
import { connect } from 'react-redux';
import NewFileModal from '../app/modals/NewFileModal';
import {
    getScripts,
    getScriptContent,
    displayNewScriptModal
} from '../app/actions/scripts';

let CodeMirror;

export class CodeEditor extends React.Component {
    state = {
        code: '',
        loaded: false
    };

    componentDidMount() {
        const { config, getScripts = f => f } = this.props;
        const { project } = config;

        getScripts(project);

        Promise.all([
            require('react-codemirror2'),
            require('codemirror/mode/javascript/javascript')
        ]).then(([{ Controlled }]) => {
            CodeMirror = Controlled;
            this.setState({ loaded: true });
        })
    }

    handleOnBeforeChange = (editor, data, code) => {
        this.setState({ code });
    };

    handleScriptSelect = ([ scriptName ]) => {
        const { config } = this.props;
        const { project } = config;

        getScriptContent(project, scriptName)
            .then(({ data }) => {
                const { content } = data;
                this.setState({ code: content });
            })
    };

    handleModalDismiss = () => {
        const { onModalDismiss = f => f } = this.props;

        onModalDismiss();
    };

    render() {
        const { scripts, config, modalVisible } = this.props;
        const options = {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'magestudio'
        };

        return (
            <div className="code-container">
                <ProjectTree
                    config={config}
                    scripts={scripts}
                    onScriptSelect={this.handleScriptSelect}
                />
                <Col
                    span={20}
                    className="code-column">
                    { this.state.loaded ?
                        <CodeMirror
                            className='code-content'
                            value={this.state.code}
                            onBeforeChange={this.handleOnBeforeChange}
                            options={options} /> :
                        <Skeleton active />
                    }
                </Col>
                <NewFileModal
                    visible={modalVisible}
                    onDismiss={this.handleModalDismiss}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ config, scripts }) => ({
    config,
    scripts
});

const mapDispatchToProps = (dispatch) => ({
    getScripts: (project) => dispatch(getScripts(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
