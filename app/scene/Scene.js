import React from 'react';
import './scene.scss';

export default class Scene extends React.Component {
    
    async componentDidMount() {
        const { Router } = await import('mage-engine');
        const config = await import('./config');

        Router.start(config.default, '#gameContainer');
    }

    render() {
        return <div id="gameContainer"></div>
    }
}
