import React from 'react';
import { InputNumber } from 'antd';

import { MIN, MAX } from './constants';

export default ({x, y, z}) => (
    <div className='setting-row'>
        <label className='setting-label'>
            Position
        </label>
        <div className="setting-input-group">
            <div className={"setting-input small"}>
                <InputNumber
                    size="small"
                    min={MIN}
                    max={MAX}
                    step={0.1}
                    placeholder="0"
                    value={x} />
            </div>
            <div className={"setting-input small"}>
                <InputNumber
                    size="small"
                    min={MIN}
                    max={MAX}
                    step={0.1}
                    placeholder="0"
                    value={y} />
            </div>
            <div className={"setting-input small last"}>
                <InputNumber
                    size="small"
                    min={MIN}
                    max={MAX}
                    step={0.1}
                    placeholder="0"
                    value={z} />
            </div>
        </div>
    </div>
)
