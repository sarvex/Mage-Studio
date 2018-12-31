import React from 'react';
import {
    InputNumber
} from 'antd';

import Position from './Position';
import Rotation from './Rotation';
import Scale from './Scale';
import Name from './Name';

class MeshInspector extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { position, rotation, scale } = this.props;

        return (
            <div>
                <Name />
                <Position
                    x={position.x}
                    y={position.y}
                    z={position.z}
                />
                <Rotation
                    x={rotation.x}
                    y={rotation.y}
                    z={rotation.z}
                />
                <Scale
                    x={scale.x}
                    y={scale.y}
                    z={scale.z}
                />
            </div>
        );
    }
}

export default MeshInspector;
