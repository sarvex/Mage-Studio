import React from 'react';
import { Drawer } from 'antd';
import classnames from 'classnames';
import EmptyInspector from './elements/EmptyInspector';
import MeshInspector from './elements/MeshInspector';

import style from './inspector.module.scss';
import { toggleInspectorVisibility } from '../../actions/inspector';
import { connect } from 'react-redux';
import { ENTITY_TYPES } from '../../lib/constants';

import { getOrCreateApp } from '../scene/AppProxy';
import debounce from '../../lib/debounce';

const DEFAULT_STATE = {
    rotation: {},
    position: {},
    scale: {},
    tags: [],
    name: ''
};

class Inspector extends React.Component {

    constructor(props) {
        super(props);

        // this.state = DEFAULT_STATE;
    }

    componentDidUpdate() {
        // updating the state with the new element only if the element has changed.
    }

    componentDidMount() {
        // we get the app from the proxy and attach listener for the elementChanged event
        console.log('trying to get app from inspector');
        getOrCreateApp()
        //     .then(app => app.addEventListener('elementChange', debounce(this.onElementChange.bind(this), 25)))
    }

    componentWillUnmount() {
        // here we remove listner for the elementChange event
    }

    onElementChange() {
        console.log('element change');
    }

    onRotationChange(rotation) {
        // get app from proxy
        // update current element with rotation
        // once that's done, update state here with the rotation.
    }

    onPositionChange(position) {
        // same as rotation
    }

    onScaleChange(scale) {
        // same as rotation and position
    }

    getContent() {
        // we should be reading dynamic values from state not from the element,
        const { element } = this.props;

        if (element) {
            console.log(element);
            switch (element.getEntityType()) {
                case ENTITY_TYPES.MESH:
                    return <MeshInspector
                        onPositionChange={f => f}
                        onRotationChange={f => f}
                        onScaleChange={f => f}
                        onScriptsMount={f => f}
                        onScriptChange={f => f}
                        onTextureChange={f => f}
                        onMaterialChange={f => f}
                        onNameChange={f => f}
                        position={element.getPosition()}
                        rotation={element.getRotation()}
                        scale={element.getScale()}
                        tags={element.getTags()}
                        name={element.getName()} />
            }
        }

        return <EmptyInspector />
    }

    render() {
        const { visible } = this.props;
        const className = classnames(style['inspector-drawer'], {
            [style['hidden']]: !visible
        });
        return (
            <Drawer
                className={className}
                title={'Inpector'}
                placement={'right'}
                closable={false}
                height={'80vh'}
                width={400}
                mask={false}
                visible={visible}
                getContainer={false}>
                { this.getContent() }
            </Drawer>
        );
    }
}

const mapStateToProps = ({ inspector }) => ({
    visible: inspector.visible,
    element: inspector.element
});

const mapDispatchToProps = (dispatch) => ({
    onInspectorClose: () => dispatch(toggleInspectorVisibility(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Inspector);
