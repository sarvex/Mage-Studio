import React from 'react';
import { InputNumber } from 'antd';

import { MIN, MAX } from './constants';

export default ({x, y, z, onRotationChange}) => (
    <div className='setting-row'>
        <label className='setting-label'>
            Rotation
        </label>
        <div className="setting-input-group">
            <div className={"setting-input small"}>
                <InputNumber
                    onChange={onRotationChange('x')}
                    size="small"
                    min={MIN}
                    max={MAX}
                    defaultValue={x}
                    step={0.1}
                    placeholder="0"
                    value={x} />
            </div>
            <div className={"setting-input small"}>
                <InputNumber
                    onChange={onRotationChange('y')}
                    size="small"
                    min={MIN}
                    max={MAX}
                    defaultValue={y}
                    step={0.1}
                    placeholder="0"
                    value={y} />
            </div>
            <div className={"setting-input small last"}>
                <InputNumber
                    onChange={onRotationChange('z')}
                    size="small"
                    min={MIN}
                    max={MAX}
                    defaultValue={z}
                    step={0.1}
                    placeholder="0"
                    value={z} />
            </div>
        </div>
    </div>
)
