import { Button, Radio, Tooltip, Switch, Input, Dropdown, Menu } from 'antd';
import React from 'react';
import { DragOutlined, RedoOutlined, ArrowsAltOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import './toolbar.scss';

const getAddMenu = () => (
    <Menu>
        <Menu.Item title='model'>
            model
        </Menu.Item>
        <Menu.SubMenu title="mesh">
            <Menu.Item title='cube'>cube</Menu.Item>
            <Menu.Item title='sphere'>sphere</Menu.Item>
            <Menu.Item title='cylinder'>cylinder</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="sound">
            <Menu.Item>sorry</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="light">
            <Menu.Item title='ambient'>ambient light</Menu.Item>
            <Menu.Item title='sun'>sun light</Menu.Item>
        </Menu.SubMenu>
    </Menu>
);

const Toolbar = props => {
    return (
        <div className='toolbar'>
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
                    </div>
                </li>
                <li className='settings-list-item'>
                    <div className='controls-settings-group'>
                        <Dropdown
                            overlay={getAddMenu()}
                            trigger={['click']}
                            placement={'topLeft'}>
                            <Button className='space-settings-button'><PlusOutlined/>Add</Button>
                        </Dropdown>
                        
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Toolbar;