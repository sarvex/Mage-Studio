import React from "react";

import Header from "../shared/header/Header";
import Footer from "../shared/footer/Footer";
import Inspector from "./panels/inspector/Inspector";
import Hierarchy from "./panels/hierarchy/HierarchyPanel";
import Assets from "./panels/assets/AssetsPanel";
import Scene from "./scene/Scene";

export default props => {
    return (
        <div className="app">
            <Header />
            <div className="main-container">
                <div className="left-container">
                    <Scene store={props.store} />
                    <Assets />
                </div>
                <div className="right-container">
                    <Hierarchy />
                    <Inspector />
                </div>
            </div>
            <Footer />
        </div>
    );
};
