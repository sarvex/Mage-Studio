import React from 'react';
import {
    Icon,
    Select,
    Switch,
    Input
} from 'antd';

const mapTexturesToOption = (textures) => {
    return textures.map(texture => <Select.Option key={texture.name}>{texture.name}</Select.Option>)
}

const Material = ({ textures = [], onTextureChange }) => (
    <div>
        <div className='scene-property'>
            <div className='label'>
                <Icon type='picture' theme='outlined' height='8px' width='8px' className='label-icon'/>
                <span className='label-text'>MATERIAL</span>
            </div>
        </div>
        <div className='scene-setting'>
            <div className='setting-row'>
                <label className='setting-label'>
                    Type
                </label>
                <Select
                    className='setting-input right'
                    size={'small'}
                    defaultValue='global'>
                    <Select.Option key='0'>global</Select.Option>
                    <Select.Option key='1'>local</Select.Option>
                </Select>
            </div>
            <div className='setting-row'>
                <label className='setting-label'>
                    Wireframe
                </label>
                <div className='enabled-toggle'>
                    <span>active</span>
                    <Switch
                        size={"small"} />
                </div>
            </div>
            <div className='setting-row'>
                <label className='setting-label'>
                    Color
                </label>
                <div className="setting-input right">
                    <Input
                        size="small"
                        placeholder="#ffffff" />
                </div>
            </div>
            <div className='setting-row'>
                <label className='setting-label'>
                    Texture
                </label>
                <Select
                    onChange={onTextureChange}
                    className='setting-input right'
                    size={'small'}>
                    { mapTexturesToOption(textures) }
                </Select>
            </div>
            <div className='setting-row'>
                <label className='setting-label'>
                    Normal
                </label>
                <Select
                    className='setting-input right'
                    size={'small'}>
                </Select>
            </div>
        </div>
    </div>
);

export default Material;

// change material type,
// wireframe true/false
// color
// texture
// normal map ?
