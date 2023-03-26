import React from "react";
import { Tooltip, Button } from "antd";
import style from "../toolbar.module.scss";

const TOOLTIP_LABEL = "Local/global space setting";

const SpaceSettingsButton = ({ space = "global", onTransformSpaceChange = f => f }) => (
    <Tooltip title={TOOLTIP_LABEL}>
        <Button className={style["space-settings-button"]} onClick={onTransformSpaceChange}>
            {space}
        </Button>
    </Tooltip>
);

export default SpaceSettingsButton;
