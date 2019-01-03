import React from 'react';
import { InputNumber } from 'antd';

import { MIN, MAX } from './constants';

export default ({x, y, z, onScaleChange}) => (
    <div className='setting-row'>
        <label className='setting-label'>
            Scale
        </label>
        <div className="setting-input-group">
            <div className={"setting-input small"}>
                <InputNumber
                    onChange={onScaleChange('x')}
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
                    onChange={onScaleChange('y')}
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
                    onChange={onScaleChange('z')}
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
