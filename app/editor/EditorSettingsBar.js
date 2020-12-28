import { Button, Radio, Tooltip, Switch, Input } from 'antd';
import React from 'react';
import { DragOutlined, RedoOutlined, ArrowsAltOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import './editorSettingsBar.scss';

const EditorSettingsBar = props => {
    return (
        <div className='editorsettingsbar'>
            <ul className='settings-list'>
                <li className='settings-list-item'>
                    <Tooltip title='Local/global space setting'>
                        <Button className='space-settings-button'>Global</Button>
                    </Tooltip>
                </li>
                <li className='settings-list-item'>
                    <Radio.Group className='controls-settings-radio-group'>
                        <Radio.Button className='controls-settings-radio-group-button' value="move">
                            <DragOutlined height={12} width={12} />
                        </Radio.Button>
                        <Radio.Button className='controls-settings-radio-group-button' value="rotate">
                            <RedoOutlined height={12} width={12}/>
                        </Radio.Button>
                        <Radio.Button className='controls-settings-radio-group-button' value="scale">
                            <ArrowsAltOutlined height={12} width={12}/>
                        </Radio.Button>
                    </Radio.Group>
                </li>
                <li className='settings-list-item'>
                    <div className='controls-settings-group snap-settings-group'>
                        <label className='snap-settings-group-item'>Snap:</label>
                        <Switch  className='snap-settings-group-item' size="small" defaultChecked />
                        <Input
                            size="small"
                            placeholder="1"
                            className='snap-settings-group-item snap-settings-group-item-text-input'
                            prefix={<MinusOutlined/>}
                            suffix={<PlusOutlined/>}/>
                        {/* <Input
                            className='snap-settings-group-item'
                            placeholder="Enter your username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        /> */}
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default EditorSettingsBar;