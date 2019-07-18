/* @flow */
/* global require */
/* eslint-disable import/no-commonjs */

import React from 'react';
// import Editor from 'react-simple-code-editor';
// import dedent from 'dedent';
//import { Controlled as CodeMirror } from 'react-codemirror2';

// import { highlight, languages } from 'prismjs';
// import 'prismjs/themes/prism-dark.css';
import 'codemirror/lib/codemirror.css';
//import 'codemirror/theme/monokai.css';
import './theme.scss';


import ProjectTree from './ProjectTree';
import { Col, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { getScripts, getScriptContent } from '../app/actions/scripts';

let CodeMirror;

class CodeEditor extends React.Component {
    state = {
        code: '',
        loaded: false
    };

    componentDidMount() {
        const { config, getScripts } = this.props;
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
        const { scripts, config } = this.props;
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
