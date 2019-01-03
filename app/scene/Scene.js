import React from 'react';
import {
    connect
} from 'react-redux';

import {
    meshChanged,
    meshAttached,
    meshDetached
} from '../actions/currentMesh';

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

        const { onMeshChanged, onMeshAttached, onMeshDetached } = this.props;

        this.app = Router.start(config.default, '#gameContainer');

        this.app.addEventListener('meshChanged', debounce(onMeshChanged, 15));
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
            const {
                controls,
                fog,
                element,
                position,
                rotation,
                scale
            } = this.props;

            this.app.changeTransformControl(controls);
            this.app.changeFog(fog);
            //if (element && position && rotation && scale) {
                console.log('[marco] updating currentMesh');
                this.app.updateCurrentMesh(element, position, rotation, scale);
            //}
        }
    }

    render() {
        return <div id="gameContainer" tabIndex={0}></div>
    }
}

const mapStateToProps = (state) => {
    const { controls = {}, fog = {}, rightsidebar } = state;
    const { element, position, rotation, scale } = rightsidebar;
    return {
        controls,
        fog,
        element,
        position,
        rotation,
        scale
    };
}
const mapDispatchToProps = (dispatch) => ({
    onMeshChanged: ({element}) => {
        const position = element.position();
        const rotation = element.rotation();
        const scale = element.scale();

        return dispatch(meshChanged(element, position, rotation, scale))
    },
    onMeshAttached: ({element}) => {
        const position = element.position();
        const rotation = element.rotation();
        const scale = element.scale();

        return dispatch(meshAttached(element, position, rotation, scale))
    },
    onMeshDetached: () => dispatch(meshDetached())
});

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
