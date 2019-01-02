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

const BaseMeshProperties = ({ position = {}, rotation = {}, scale = {}, uuid }) => {
        // console.log('basemesh', position, rotation, scale);
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
                    <UUID uuid={uuid} />
                </div>
            </div>
    )
};

export default BaseMeshProperties;
