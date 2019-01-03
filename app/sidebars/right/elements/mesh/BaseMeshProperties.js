import React from 'react';

import {
    InputNumber,
    Icon
} from 'antd';

import Position from './Position';
import Rotation from './Rotation';
import Scale from './Scale';
import Name from './Name';
import UUID from './UUID';

const BaseMeshProperties = (props) => {

        const {
            position = {},
            rotation = {},
            scale = {},
            uuid,
            onPositionChange,
            onRotationChange,
            onScaleChange
        } = props;

        return (
            <div>
                <div className="scene-property">
                    <div className='label'>
                        <Icon type='code-sandbox' theme='outlined' height='8px' width='8px' className='label-icon'/>
                        <span className='label-text'>MESH</span>
                    </div>
                </div>
                <div className="scene-setting">
                    <Name />
                    <Position
                        onPositionChange={onPositionChange}
                        x={position.x}
                        y={position.y}
                        z={position.z}
                    />
                    <Rotation
                        onRotationChange={onRotationChange}
                        x={rotation.x}
                        y={rotation.y}
                        z={rotation.z}
                    />
                    <Scale
                        onScaleChange={onScaleChange}
                        x={scale.x}
                        y={scale.y}
                        z={scale.z}
                    />
                    <UUID uuid={uuid} />
                </div>
            </div>
    )
};

export default BaseMeshProperties;
