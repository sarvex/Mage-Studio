import { Button, Radio, Tooltip } from 'antd';
import React from 'react';
import { DragOutlined, RedoOutlined, ArrowsAltOutlined } from '@ant-design/icons';

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
                    <Button className='controls-settings-radio-group-button' value="move"><DragOutlined /></Button>
                    <Button className='controls-settings-radio-group-button' value="rotate"><RedoOutlined /></Button>
                    <Button className='controls-settings-radio-group-button' value="scale"><ArrowsAltOutlined /></Button>
                </li>
            </ul>
        </div>
    );
};

export default EditorSettingsBar;