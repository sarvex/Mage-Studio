/* @flow */
/* global require */
/* eslint-disable import/no-commonjs */

import React from 'react';
// import Editor from 'react-simple-code-editor';
// import dedent from 'dedent';
import CodeMirror from 'react-codemirror';
// import { highlight, languages } from 'prismjs';
// import 'prismjs/themes/prism-dark.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import ProjectTree from './ProjectTree';
import { Col } from 'antd';
import { connect } from 'react-redux';
import { getScripts, getScriptContent } from '../app/actions/scripts';

class CodeEditor extends React.Component {
    state = {
        code: '',
    };

    componentDidMount() {
        const { config, getScripts } = this.props;
        const { project } = config;

        getScripts(project);
    }

    highlight = (code) => highlight(code, languages.javascript, 'javascript');

    handleOnChange = (code) => {
        this.setState({ code });
    };

    handleScriptSelect = (selection) => {
        const { config } = this.props;
        const { project } = config;
        const scriptName = selection[0];

        getScriptContent(project, scriptName)
            .then(({ data }) => {
                const { content } = data;
                this.setState({ code: content });
            })
    };

    render() {
        const { scripts } = this.props;
        var options = {
            lineNumbers: true,
            mode: 'javascript'
        };

        return (
            <div className="code-container">
                <ProjectTree
                    scripts={scripts}
                    onScriptSelect={this.handleScriptSelect}
                />
                <Col
                    span={18}
                    className="code-column">
                    <CodeMirror value={this.state.code} onChange={this.handleOnChange} options={options} />
                    {/*<Editor*/}
                        {/*placeholder="Type some code…"*/}
                        {/*value={this.state.code}*/}
                        {/*onValueChange={this.handleOnChange}*/}
                        {/*highlight={this.highlight}*/}
                        {/*padding={10}*/}
                        {/*className="code-content"*/}
                        {/*style={{*/}
                            {/*fontFamily: '"Fira code", "Fira Mono", monospace',*/}
                            {/*fontSize: 13*/}
                        {/*}}*/}
                    {/*/>*/}
                </Col>

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