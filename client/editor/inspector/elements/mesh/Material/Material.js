import React, { useState } from 'react';
import {
    Select,
    Switch,
    Button
} from 'antd';

import { PictureOutlined } from '@ant-design/icons';
import { ChromePicker } from 'react-color';

import style from '../../../inspector.module.scss';

const mapTexturesToOption = (textures) => {
    return textures.map(texture => <Select.Option key={texture.name}>{texture.name}</Select.Option>)
}

const Material = ({ textures = [], onTextureChange, onMaterialChange }) => {
    const [colorPickerVisible, toggleColorPicker] = useState(false);

    const onColorPickerButtonClick = () => toggleColorPicker(!colorPickerVisible);

    return (
        <div className={style['inspector-block']}>
            <div className={style['inspector-block-title']}>
                <PictureOutlined height='8px' width='8px' className={style['inspector-block-title-label-icon']}/>
                <span className={style['inspector-block-title-label']}>Material</span>
            </div>
            <div className={style['inspector-block-values']}>
                <div className={style['inspector-property']}>
                    <label className={style['inspector-property-label']}>
                        Material
                    </label>
                    <Select
                        onChange={onMaterialChange}
                        className={style['property-dropdown-button']}
                        size={'small'}
                        defaultValue='Basic'>
                        <Select.Option key='basic'>Basic</Select.Option>
                        <Select.Option key='lambert'>Lambert</Select.Option>
                        <Select.Option key='phong'>Phong</Select.Option>
                        <Select.Option key='depth'>Depth</Select.Option>
                        <Select.Option key='standard'>Standard</Select.Option>
                    </Select>
                </div>
                <div className={style['inspector-property']}>
                    <label className={style['inspector-property-label']}>
                        Wireframe
                    </label>
                    <div className='enabled-toggle'>
                        <span>active</span>
                        <Switch size={"small"} />
                    </div>
                </div>
                <div className={style['inspector-property']}>
                    <label className={style['inspector-property-label']}>
                        Color
                    </label>
                    <div className="setting-input right">
                        <Button
                            className={style['property-dropdown-button']}
                            onClick={onColorPickerButtonClick}>
                            #abcdee
                        </Button>
                        { colorPickerVisible && <ChromePicker color='#abcdee'/> }
                    </div>
                </div>
                <div className={style['inspector-property']}>
                    <label className={style['inspector-property-label']}>
                        Texture
                    </label>
                    <Select
                        onChange={onTextureChange}
                        className={style['property-dropdown-button']}
                        size={'small'}>
                        { mapTexturesToOption(textures) }
                    </Select>
                </div>
                <div className={style['inspector-property']}>
                    <label className={style['inspector-property-label']}>
                        Normal
                    </label>
                    <Select
                        className={style['property-dropdown-button']}
                        size={'small'}>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default Material;
