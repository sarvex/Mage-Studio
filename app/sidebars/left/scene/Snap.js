import React from 'react';
import { Icon, InputNumber, Switch } from 'antd';

const Snap = (props) => {

    const { onSnapValueChange = f => f, onSnapEnabledChange = f => f, value, enabled } = props;
    const enabledClassName = enabled ? 'enabled' : 'disabled';
    const inputClassName = `setting-input right ${enabledClassName}`;

    return (
        <div>
            <div className='scene-property'>
                <div className='label'>
                    <Icon type='link' theme='outlined' height='8px' width='8px' className='label-icon'/>
                    <span className='label-text'>SNAP</span>
                </div>
                <div className='enabled-toggle'>
                    <span>active</span>
                    <Switch
                        onChange={onSnapEnabledChange}
                        size={"small"}
                        value={enabled}/>
                </div>
            </div>
            <div className='scene-setting'>
                <div className='setting-row'>
                    <label className='setting-label'>
                        Value
                    </label>
                    <div className={inputClassName}>
                        <InputNumber
                            onChange={onSnapValueChange}
                            size="small"
                            min={0}
                            max={100}
                            step={1}
                            placeholder="0"
                            disabled={!enabled} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Snap;
