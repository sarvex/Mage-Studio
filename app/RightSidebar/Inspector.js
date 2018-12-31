import React from 'react';
import EmptyInspector from './elements/EmptyInspector';
import MeshInspector from './elements/MeshInspector';

class Inspector extends React.Component {

    constructor(props) {
        super(props);
    }

    getContent() {
        const { empty, element = {} } = this.props;

        if (element.isMesh && element.isMesh()) {
            return (
                <MeshInspector
                    position={element.position()}
                    rotation={element.rotation()}
                    scale={element.scale()}
                />
            );
        }

        return <EmptyInspector />;
    }

    render() {
        return (
            <div className='scene-setting'>
                { this.getContent() }
            </div>
        );
    }
}

export default Inspector;
