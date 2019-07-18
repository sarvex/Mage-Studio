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
            className="sidebar">
            <p className="title">
                <Icon className="icon" type="project" />
                <span>Project</span>
            </p>
            <div className='content'>
                <DirectoryTree
                    defaultExpandAll
                    onSelect={onScriptSelect}>
                    <TreeNode
                        icon={<Icon type="book" />}
                        title={project}>
                        { list.map((s, i) => (
                            <TreeNode
                                icon={<Icon type="file-text" />}
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
