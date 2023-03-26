import React from "react";

import HelpMenu from "./menu/HelpMenu";
import ViewMenu from "./menu/ViewMenu";
import FileMenu from "./menu/FileMenu";

import Logo from "./Logo";
import style from "./header.module.scss";

export const Header = ({}) => {
    return (
        <div className={style.header}>
            <Logo />
            <FileMenu />
            <ViewMenu />
            <HelpMenu />
        </div>
    );
};

export default Header;
