import React from "react";
import classnames from "classnames";

import style from "./inspector.module.scss";

class Inspector extends React.Component {
    render() {
        const className = classnames(style.inspector, style.panel);
        return (
            <div className={className}>
                <h3 className={style.title}>Inspector</h3>
                <div className={style.content}></div>
            </div>
        );
    }
}

export default Inspector;
