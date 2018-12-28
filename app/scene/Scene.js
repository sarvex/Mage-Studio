import React from 'react';
import {
    connect
} from 'react-redux';

import {
    meshChanged,
    meshAttached,
    meshDetached
} from '../actions/currentMesh';

import './scene.scss';

export class Scene extends React.Component {

    constructor(props) {
        super(props);

        this.app = {};
    }

    async componentDidMount() {
        const { Router } = await import('mage-engine');
        const config = await import('./config');

        const { onMeshChanged, onMeshAttached, onMeshDetached } = this.props;

        this.app = Router.start(config.default, '#gameContainer');

        this.app.addEventListener('meshChanged', onMeshChanged);
        this.app.addEventListener('meshAttached', onMeshAttached);
        this.app.addEventListener('meshDetached', onMeshDetached);
    }

    isReceivingSameProps = (prevProps) => {
        return Object.keys(prevProps).filter(k => (
            prevProps[k] !== this.props[k]
        )) === 0;
    }

    componentDidUpdate(prevProps) {
        if (this.app && !this.isReceivingSameProps(prevProps)) {
            const { controls, fog } = this.props;

            this.app.changeTransformControl(controls);
            this.app.changeFog(fog);
        }
    }

    render() {
        return <div id="gameContainer" tabIndex={0}></div>
    }
}

const mapStateToProps = (state) => {
    const { controls = {}, fog = {} } = state;

    return {
        controls,
        fog
    };
}
const mapDispatchToProps = (dispatch) => ({
    onMeshChanged: ({position, rotation, scale}) => dispatch(meshChanged(position, rotation, scale)),
    onMeshAttached: ({element}) => dispatch(meshAttached(element)),
    onMeshDetached: () => dispatch(meshDetached())
});

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
