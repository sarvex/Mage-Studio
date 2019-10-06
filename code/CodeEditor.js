import React from 'react';
import './theme.scss';

import ProjectTree from './ProjectTree';
import { Col } from 'antd';
import { connect } from 'react-redux';
import NewFileModal from '../app/modals/NewFileModal';
import Skeleton from '../lib/shared/Skeleton';

import {
    getScripts,
    getScriptContent,
    newScript,
    editorReady,
    editorScriptLoaded,
    editorScriptChanged
} from '../app/actions/scripts';

let CodeMirror;

export class CodeEditor extends React.Component {

    componentDidMount() {
        const { config, getScripts = f => f, onEditorReady } = this.props;
        const { project } = config;

        getScripts(project);

        Promise.all([
            require('react-codemirror2'),
            require('codemirror/mode/javascript/javascript')
        ]).then(([{ Controlled }]) => {
            CodeMirror = Controlled;

            onEditorReady();
        })
    }

    handleOnBeforeChange = (_editor, _data, code) => {
        const { onCodeChange, scripts } = this.props;
        const { editor: { filename } } = scripts;

        onCodeChange(filename, code);
    };

    handleScriptSelect = ([ scriptName ]) => {
        const { config, onScriptLoaded } = this.props;
        const { project } = config;

        getScriptContent(project, scriptName)
            .then(({ data }) => {
                const { content } = data;

                onScriptLoaded(scriptName, content);
            })
    };

    handleNewFile = (filename) => {
        const { onNewFile = f => f, onModalDismiss = f => f, config } = this.props;
        const { project } = config;

        onModalDismiss();
        onNewFile(project, filename);
    }

    render() {
        const { scripts, config, modalVisible, onModalDismiss } = this.props;
        const { editor: { loaded, code } } = scripts;
        console.log(loaded);
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
                    { loaded ?
                        <CodeMirror
                            className='code-content'
                            value={code}
                            onBeforeChange={this.handleOnBeforeChange}
                            options={options} /> :
                        <Skeleton active />
                    }
                </Col>
                <NewFileModal
                    visible={modalVisible}
                    onDismiss={onModalDismiss}
                    onConfirm={this.handleNewFile}
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
    getScripts: (project) => dispatch(getScripts(project)),
    onNewFile: (project, filename) => dispatch(newScript(project, filename)),
    onEditorReady: () => dispatch(editorReady()),
    onScriptLoaded: (filename, code) => dispatch(editorScriptLoaded(filename, code)),
    onCodeChange: (filename, code) => dispatch(editorScriptChanged(filename, code))
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
