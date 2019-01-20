import React from 'react';
import {
    connect,
    ReactReduxContext
} from 'react-redux';

import {
    meshChanged,
    meshAttached,
    meshDetached
} from '../actions/currentMesh';

import debounce from '../lib/debounce';
import Scene from './Scene';
import './scene.scss';

const { Consumer } = ReactReduxContext;

export const SceneContainer = (props) => (
    <Consumer>
        { ({store}) => (
            <Scene
                store={store}
                onMeshChanged={props.onMeshChanged}
                onMeshAttached={props.onMeshAttached}
                onMeshDetached={props.onMeshDetached}
            />
        )}
    </Consumer>
)

const mapDispatchToProps = (dispatch) => ({

    onMeshChanged: ({element}) => {
        const position = element.position();
        const rotation = element.rotation();
        const scale = element.scale();

        return dispatch(meshChanged(element, position, rotation, scale))
    },

    onMeshAttached: ({element, position, rotation, scale}) => {
        console.log(element)

        return dispatch(meshAttached(element, position, rotation, scale))
    },

    onMeshDetached: () => dispatch(meshDetached())
});

export default connect(() => ({}), mapDispatchToProps)(SceneContainer);
