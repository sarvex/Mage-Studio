import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { hierarchyChange } from "../../actions/hierarchy";
import debounce from "../../lib/debounce";
import { getOrCreateApp } from "./AppProxy";

import TopToolbar from "../toolbars/top";

import style from "./scene.module.scss";

const getContainerSize = element => {
    const { height, width } = element.getBoundingClientRect();

    return { height, width };
};

export class Scene extends React.Component {
    constructor(props) {
        super(props);

        this.app = {};
        this.levelRef = null;
    }

    componentDidMount() {
        const { onHierarchyChange } = this.props;

        getOrCreateApp().then(app => {
            if (app) {
                this.app = app;

                this.app.addEventListener("hierarchyChange", onHierarchyChange);

                this.app.resize(this.levelRef.offsetWidth, this.levelRef.offsetHeight);
                this.app.dispatchUpdatedHierarchy();
            }
        });
    }

    storeLevelRef = el => (this.levelRef = el);

    async componentDidUpdate(prevProps) {
        if (prevProps.fullscreen !== this.props.fullscreen && this.app) {
            const { width, height } = getContainerSize(this.levelRef);
            this.app.resize(width, height);
        }
    }

    render() {
        const sceneContainerClassnames = classnames(style["scene-container"], style.panel);
        return (
            <div className={sceneContainerClassnames}>
                <TopToolbar />
                <div
                    id="gameContainer"
                    ref={this.storeLevelRef}
                    className={style.gameContainer}
                    tabIndex={0}
                ></div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onHierarchyChange: ({ graph }) => dispatch(hierarchyChange(graph)),
});

export default connect(null, mapDispatchToProps)(Scene);
