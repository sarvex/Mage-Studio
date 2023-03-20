import React from "react";
import { Tree, Input } from "antd";
import classnames from "classnames";
import {
    GatewayOutlined,
    VideoCameraOutlined,
    FolderViewOutlined,
    BulbOutlined,
} from "@ant-design/icons";

import style from "./hierarchypanel.module.scss";
import { connect } from "react-redux";
import _ from "lodash";

const { TreeNode } = Tree;

const ENTITY_TYPES = {
    SCENE: "SCENE",
    CAMERA: "CAMERA",
    MESH: "MESH",
    LABEL: "LABEL",
    LIGHT: {
        DEFAULT: "LIGHT.DEFAULT",
        AMBIENT: "LIGHT.AMBIENT",
        SUN: "LIGHT.SUN",
        HEMISPHERE: "LIGHT.HEMISPHERE",
        POINT: "LIGHT.POINT",
        SPOT: "LIGHT.SPOT",
    },
    AUDIO: {
        DEFAULT: "AUDIO.DEFAULT",
        DIRECTIONAL: "AUDIO.DIRECTIONAL",
        AMBIENT: "AUDIO.AMBIENT",
    },
    MODEL: "MODEL",
    SPRITE: "SPRITE",
    PARTICLE: "PARTICLE",
    EFFECT: {
        PARTICLE: "EFFECT.PARTICLE",
        SCENERY: "EFFECT.SCENERY",
    },
    HELPER: {
        GRID: "HELPER.GRID",
        AXES: "HELPER.AXES",
    },
    UNKNOWN: "UNKNOWN",
};

const DEFAULT_EXPANDED_KEY = "Level";

export class Hierarchy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedKeys: [DEFAULT_EXPANDED_KEY],
            autoExpandParent: true,
        };
    }

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys: [...expandedKeys, DEFAULT_EXPANDED_KEY],
            autoExpandParent: false,
        });
    };

    getIcon(entityType) {
        const EntityIconComponent =
            {
                [ENTITY_TYPES.MESH]: GatewayOutlined,
                [ENTITY_TYPES.CAMERA]: VideoCameraOutlined,
                [ENTITY_TYPES.LIGHT.AMBIENT]: BulbOutlined,
                [ENTITY_TYPES.LIGHT.DEFAULT]: BulbOutlined,
                [ENTITY_TYPES.LIGHT.HEMISPHERE]: BulbOutlined,
                [ENTITY_TYPES.LIGHT.POINT]: BulbOutlined,
                [ENTITY_TYPES.LIGHT.SPOT]: BulbOutlined,
                [ENTITY_TYPES.LIGHT.SUN]: BulbOutlined,
            }[entityType] || FolderViewOutlined;

        return <EntityIconComponent height="4px" width="4px" className={style["label-icon"]} />;
    }

    render() {
        const { expandedKeys, autoExpandParent } = this.state;
        const { graph = [] } = this.props;
        const loop = data => {
            return data.map(({ element, children }) => {
                const name = element.name || "Level";

                if (children) {
                    return (
                        <TreeNode icon={this.getIcon(element.entityType)} key={name} title={name}>
                            {loop(children)}
                        </TreeNode>
                    );
                }
                return <TreeNode icon={this.getIcon(element.entityType)} key={name} title={name} />;
            });
        };

        return (
            <div className={classnames(style.panel, style.hierarchy)}>
                <h3 className={style.title}>Hierarchy</h3>
                <div className={style.content}>
                    <Tree
                        className={style.hierarchy}
                        showIcon
                        showLine
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                    >
                        {loop(graph)}
                    </Tree>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    graph: state.hierarchy.graph,
});

export default connect(mapStateToProps)(Hierarchy);
