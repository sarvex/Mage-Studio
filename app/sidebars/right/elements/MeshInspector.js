import React from 'react';
import { connect } from 'react-redux';
import BaseMeshProperties from './mesh/BaseMeshProperties';
import Material from './mesh/Material';
import Script from './mesh/Script';

class MeshInspector extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            position,
            rotation,
            scale,
            uuid,
            onPositionChange,
            onRotationChange,
            onScaleChange,
            onScriptsMount,
            onScriptChange,
            scripts = {}
        } = this.props;

        const { list } = scripts;

        return (
            <div>
                <BaseMeshProperties
                    onPositionChange={onPositionChange}
                    onRotationChange={onRotationChange}
                    onScaleChange={onScaleChange}
                    uuid={uuid}
                    position={position}
                    rotation={rotation}
                    scale={scale} />
                <Material />
                <Script
                    list={list}
                    onScriptsMount={onScriptsMount}
                    onScriptChange={onScriptChange}/>
            </div>
        );
    }
}

export default MeshInspector;
