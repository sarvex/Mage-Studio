import React from 'react';

import BaseMeshProperties from './mesh/BaseMeshProperties';
import Material from './mesh/Material';
import Script from './mesh/Script';

class MeshInspector extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { position, rotation, scale, uuid } = this.props;

        return (
            <div>
                <BaseMeshProperties
                    uuid={uuid}
                    position={position}
                    rotation={rotation}
                    scale={scale} />
                <Material />
                <Script />
            </div>
        );
    }
}

export default MeshInspector;
