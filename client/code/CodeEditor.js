import React from "react";
import "./theme.scss";

import ProjectTree from "./ProjectTree";
import { Col } from "antd";
import { connect } from "react-redux";
// import NewFileModal from '../app/modals/NewFileModal';
import Skeleton from "../shared/skeleton/Skeleton";

// import {
//     getScripts,
//     getScriptContent,
//     newScript,
//     editorReady,
//     editorScriptLoaded,
//     editorScriptChanged
// } from '../actions/scripts';

let CodeMirror;

export class CodeEditor extends React.Component {
    componentDidMount() {
        const { config, getScripts = f => f, onEditorReady = {} } = this.props;
        const { project } = config;

        getScripts(project);

        Promise.all([
            require("react-codemirror2"),
            require("codemirror/mode/javascript/javascript"),
        ]).then(([{ Controlled }]) => {
            CodeMirror = Controlled;

            onEditorReady();
        });
    }

    handleOnBeforeChange = (_editor, _data, code) => {
        const { onCodeChange = f => f, scripts = {} } = this.props;
        const { editor: { filename, scriptType } = {} } = scripts;

        onCodeChange(filename, code, scriptType);
    };

    handleScriptSelect = ([scriptName]) => {
        const {
            config,
            onScriptLoaded = _ => {},
            scripts: { list },
        } = this.props;
        const { project } = config;
        const filteredList = list.filter(script => script.name === scriptName);
        const type = filteredList.length ? filteredList[0].type : "script";

        getScriptContent(project, scriptName, type).then(({ data }) => {
            const { content } = data;

            onScriptLoaded(scriptName, content, type);
        });
    };

    handleNewFile = filename => {
        const { onNewFile = f => f, onModalDismiss = f => f, config } = this.props;
        const { project } = config;

        onModalDismiss();
        onNewFile(project, filename);
    };

    render() {
        const { scripts = {}, config, modalVisible, onModalDismiss } = this.props;
        const { editor: { loaded, code } = {} } = scripts;

        const options = {
            lineNumbers: true,
            mode: "javascript",
            theme: "magestudio",
        };

        return (
            <div className="code-container">
                <ProjectTree
                    config={config}
                    scripts={scripts}
                    onScriptSelect={this.handleScriptSelect}
                />
                <Col span={19} className="code-column">
                    {loaded ? (
                        <CodeMirror
                            className="code-content"
                            value={code}
                            onBeforeChange={this.handleOnBeforeChange}
                            options={options}
                        />
                    ) : (
                        <Skeleton active />
                    )}
                </Col>
            </div>
        );
    }
}

const mapStateToProps = ({ config, scripts }) => ({
    config,
    scripts,
});

const mapDispatchToProps = dispatch => ({
    // getScripts: project => dispatch(getScripts(project)),
    // onNewFile: (project, filename) => dispatch(newScript(project, filename)),
    // onEditorReady: () => dispatch(editorReady()),
    // onScriptLoaded: (filename, code, type) => dispatch(editorScriptLoaded(filename, code, type)),
    // onCodeChange: (filename, code, type) => dispatch(editorScriptChanged(filename, code, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
