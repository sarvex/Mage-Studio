import React from 'react';
import { InputNumber } from 'antd';

export default ({x = 0, y = 0, z = 0}) => (
    <div className='setting-row'>
        <label className='setting-label'>
            Position
        </label>
        <div className="setting-input-group">
            <div className={"setting-input small"}>
                <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    defaultValue={x}
                    step={0.1}
                    placeholder="0" />
            </div>
            <div className={"setting-input small"}>
                <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    defaultValue={y}
                    step={0.1}
                    placeholder="0" />
            </div>
            <div className={"setting-input small last"}>
                <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    defaultValue={z}
                    step={0.1}
                    placeholder="0" />
            </div>
        </div>
    </div>
)
