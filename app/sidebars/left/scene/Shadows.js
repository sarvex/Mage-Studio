import React from 'react';
import { Switch, Icon, Checkbox, Select } from 'antd';

class Fog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            enabled: true
        };
    }

    onSwitchChange = (flag) => {
        this.setState({ enabled: flag });
    }

    render() {

        const { enabled } =  this.state;
        const enabledClassName = enabled ? 'enabled' : 'disabled';
        const selectClassName = `setting-input right ${enabledClassName}`;

        return (
            <div>
                <div className='scene-property'>
                    <div className='label'>
                        <Icon type='bulb' theme='outlined' height='8px' width='8px' className='label-icon'/>
                        <span className='label-text'>SHADOWS</span>
                    </div>
                    <div className='enabled-toggle'>
                        <span>active</span>
                        <Switch
                            onChange={this.onSwitchChange}
                            size={"small"}
                            defaultChecked />
                    </div>
                </div>
                <div className='scene-setting'>
                    <div className='setting-row'>
                        <label className='setting-label'>
                            Type
                        </label>
                        <Select
                            className={selectClassName}
                            size={'small'}
                            disabled={!enabled}
                            defaultValue='Basic'>
                            <Select.Option key='0'>Basic</Select.Option>
                            <Select.Option key='1'>PCFShadow</Select.Option>
                            <Select.Option key='2'>PCFSoftShadow</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}
export default Fog;
