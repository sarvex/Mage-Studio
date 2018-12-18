import React from 'react';
import './scene.scss';

export default class Scene extends React.Component {

    constructor(props) {
        super(props);

        this.gameContainer = React.createRef();
    }

    async componentDidMount() {
        const { Router } = await import('mage-engine');
        const config = await import('./config');

        console.log(this.gameContainer.current.offsetHeight, this.gameContainer.current.offsetWidth);

        Router.start(config.default, '#gameContainer');
    }

    render() {
        return <div id="gameContainer" ref={this.gameContainer}></div>
    }
}
