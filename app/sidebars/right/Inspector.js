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
            type,
            position,
            rotation,
            scale,
            onPositionChange,
            onRotationChange,
            onScaleChange
        } = this.props;

        if (element && type === 'mesh') {
            return (
                <MeshInspector
                    onPositionChange={onPositionChange}
                    onRotationChange={onRotationChange}
                    onScaleChange={onScaleChange}
                    uuid={element}
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
