import React from 'react';
import debounce from '../lib/debounce';
import './scene.scss';

export class Scene extends React.Component {

    constructor(props) {
        super(props);

        this.app = {};
    }

    async componentDidMount() {
        const { Router } = await import('mage-engine');
        const appConfig = await import('./config');

        const { store, onMeshChanged, onMeshAttached, onMeshDetached, onSceneExported, config } = this.props;

        this.app = Router.start(appConfig.default, '#gameContainer');

        this.app.setStore(store);

        this.app.addEventListener('meshChanged', debounce(onMeshChanged, 15));
        this.app.addEventListener('meshAttached', onMeshAttached);
        this.app.addEventListener('meshDetached', onMeshDetached);
        this.app.addEventListener('sceneExported', onSceneExported(config.scene));
    }

    render() {
        return <div id="gameContainer" tabIndex={0}></div>
    }
}

export default Scene;
