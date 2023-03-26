import React from "react";
import classnames from "classnames";

import style from "./assets.module.scss";

export class AssetsPanel extends React.Component {
    render() {
        return (
            <div className={classnames(style.panel, style.assets)}>
                <h3 className={style.title}>Assets</h3>
                <div className={style.content}></div>
            </div>
        );
    }
}

export default AssetsPanel;
