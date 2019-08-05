import React from 'react';
import { Col, Tree, Icon } from 'antd';
import ContextMenu from './contextmenu/ContextMenu';
const { TreeNode, DirectoryTree } = Tree;

import '../app/sidebars/sidebar.scss';

const projectIcon = () => (
    <Icon
        type="book"
        className={"code-icon"}/>
);

const fileIcon = () => (
    <Icon
        className="code-icon"
        type="file-text" />
);

const mapFilesToTreeNodes = list => (
    list.map(s => (
        <TreeNode
            className={"project-file"}
            icon={fileIcon()}
            title={getTiteLabel(s.name)}
            key={s.name}
            isLeaf />
    ))
);

const getTiteLabel = title => (
    <ContextMenu>
        <span>
            { title }
        </span>
    </ContextMenu>
);

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
                        icon={projectIcon()}
                        title={getTiteLabel(project)}>
                        { mapFilesToTreeNodes(list) }
                    </TreeNode>
                </DirectoryTree>
            </div>
        </Col>
    );
};

export default ProjectTree;
