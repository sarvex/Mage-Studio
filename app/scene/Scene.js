import React from 'react';
import {
    connect
} from 'react-redux';

import { meshChanged } from '../actions/currentMesh';

import './scene.scss';

export class Scene extends React.Component {

    constructor(props) {
        super(props);

        this.app = {};
    }

    async componentDidMount() {
        const { Router } = await import('mage-engine');
        const config = await import('./config');

        const { onMeshChanged } = this.props;

        this.app = Router.start(config.default, '#gameContainer');
        this.app.addEventListener('meshChanged', onMeshChanged);
    }

    render() {
        return <div id="gameContainer" tabIndex={0}></div>
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    onMeshChanged: ({position, rotation, scale}) => dispatch(meshChanged(position, rotation, scale))
});

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
