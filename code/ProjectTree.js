import React from 'react';
import { Col, Tree, Icon } from 'antd';

const { TreeNode, DirectoryTree } = Tree;

import '../app/sidebars/sidebar.scss';

const ProjectTree = ({ scripts, onScriptSelect = f => f, config }) => {

    const { list = [] } = scripts;
    const { project } = config;

    return (
        <Col
            span={4}
            className="sidebar code-sidebar">
            <p className="title">
                <Icon className="icon" type="project" />
                <span>Project</span>
            </p>
            <div className='content'>
                <DirectoryTree
                    defaultExpandAll
                    onSelect={onScriptSelect}>
                    <TreeNode
                        className={"project-file"}
                        icon={<Icon
                            type="book"
                            className={"code-icon"}/>}
                        title={project}>
                        { list.map(s => (
                            <TreeNode
                                className={"project-file"}
                                icon={<Icon
                                    className="code-icon"
                                    type="file-text" />}
                                title={s.name}
                                key={s.name}
                                isLeaf />
                        ))}
                    </TreeNode>
                </DirectoryTree>
            </div>
        </Col>
    );
};

export default ProjectTree;
