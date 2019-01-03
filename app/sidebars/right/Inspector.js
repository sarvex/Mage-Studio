import React from 'react';
import EmptyInspector from './elements/EmptyInspector';
import MeshInspector from './elements/MeshInspector';

class Inspector extends React.Component {

    constructor(props) {
        super(props);
    }

    getContent() {
        const {
            empty,
            element,
            position,
            rotation,
            scale,
            onPositionChange,
            onRotationChange,
            onScaleChange
        } = this.props;

        if (element && element.isMesh && element.isMesh()) {
            return (
                <MeshInspector
                    onPositionChange={onPositionChange}
                    onRotationChange={onRotationChange}
                    onScaleChange={onScaleChange}
                    uuid={element.uuid()}
                    position={position}
                    rotation={rotation}
                    scale={scale}
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
