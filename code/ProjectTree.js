import React from 'react';
import { Col, Tree, Icon } from 'antd';

const { TreeNode, DirectoryTree } = Tree;

// import '../sidebar.scss';

const ProjectTree = ({ scripts, onScriptSelect = f => f }) => {

    const { list = [] } = scripts;

    return (
        <Col
            span={6}
            className="sidebar">
            <DirectoryTree defaultExpandAll onSelect={onScriptSelect}>
                <TreeNode title="scripts">
                    { list.map((s, i) => <TreeNode icon={<Icon type="file-text" />} title={s.name} key={s.name} isLeaf />)}
                </TreeNode>
            </DirectoryTree>
        </Col>
    );
};

export default ProjectTree;
