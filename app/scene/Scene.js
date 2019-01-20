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
        const config = await import('./config');

        const { store, onMeshChanged, onMeshAttached, onMeshDetached } = this.props;

        this.app = Router.start(config.default, '#gameContainer');

        this.app.setStore(store);

        this.app.addEventListener('meshChanged', debounce(onMeshChanged, 15));
        this.app.addEventListener('meshAttached', onMeshAttached);
        this.app.addEventListener('meshDetached', onMeshDetached);
    }

    render() {
        return <div id="gameContainer" tabIndex={0}></div>
    }
}

export default Scene;
