import React from 'react';
import EmptyInspector from './elements/EmptyInspector';
import MeshInspector from './elements/MeshInspector';

class Inspector extends React.Component {

    constructor(props) {
        super(props);
    }

    getContent() {
        const {
            type,
            position,
            rotation,
            scale,
            name,
            onNameChange,
            onPositionChange,
            onRotationChange,
            onScriptsMount,
            onScriptChange,
            onScaleChange,
            onTextureChange,
            onMaterialChange,
            scripts,
            assets
        } = this.props;

        if (type === 'mesh') {
            return (
                <MeshInspector
                    onPositionChange={onPositionChange}
                    onRotationChange={onRotationChange}
                    onScaleChange={onScaleChange}
                    onScriptsMount={onScriptsMount}
                    onScriptChange={onScriptChange}
                    onTextureChange={onTextureChange}
                    onMaterialChange={onMaterialChange}
                    onNameChange={onNameChange}
                    name={name}
                    scripts={scripts}
                    position={position}
                    rotation={rotation}
                    scale={scale}
                    assets={assets}
                />
            );
        }

        return <EmptyInspector />;
    }

    render() {
        return (
            <div>
                { this.getContent() }
            </div>
        );
    }
}

export default Inspector;
