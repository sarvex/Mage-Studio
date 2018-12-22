import React from 'react';
import './scene.scss';

export default class Scene extends React.Component {

    constructor(props) {
        super(props);

        this.app = {};
    }

    async componentDidMount() {
        const { Router } = await import('mage-engine');
        const config = await import('./config');

        this.app = Router.start(config.default, '#gameContainer');
    }

    render() {
        return <div id="gameContainer" tabIndex={0}></div>
    }
}
