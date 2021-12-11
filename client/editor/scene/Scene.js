import React from 'react';
import debounce from '../../lib/debounce';
import { getOrCreateApp } from './AppProxy';

import style from './scene.module.scss';

const getContainerSize = element => {
    const { height, width } = element.getBoundingClientRect();

    return { height, width };
}

export class Scene extends React.Component {

    constructor(props) {
        super(props);

        this.app = {};
        this.levelRef = null;
    }

    componentDidMount() {
        const { store, onMeshChanged, onElementAttached, onElementDetached, onSceneExported, config, onSceneLoad } = this.props;

        getOrCreateApp()
            .then(app => {
                this.app = app;
                // this.app.addEventListener('elementChanged', debounce(onMeshChanged, 15));
                this.app.addEventListener('elementAttached', onElementAttached);
                this.app.addEventListener('elementDetached', onElementDetached);

                this.app.resize(this.levelRef.offsetWidth, this.levelRef.offsetHeight);
            });

    }

    storeLevelRef = el => this.levelRef = el;

    async componentDidUpdate(prevProps) {
        if (prevProps.fullscreen !== this.props.fullscreen && this.app) {
            const { width, height } = getContainerSize(this.levelRef);
            this.app.resize(width, height);
        }
    }

    render() {
        return <div
            id="gameContainer"
            ref={this.storeLevelRef}
            className={style.gameContainer}
            tabIndex={0}></div>
    }
}

export default Scene;
