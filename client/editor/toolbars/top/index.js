import React from 'react';

import {
    SpaceSettingsButton,
    ControlsRadioGroup,
    SnapControlsGroup,
    AddElementDropdown
} from './elements';

import style from './toolbar.module.scss';
import { addElement } from '../../../actions/scene';

const Toolbar = () => {
    return (
        <div className={style.toolbar}>
            <ul className={style['settings-list']}>
                <li className={style['settings-list-item']}>
                    <SpaceSettingsButton />
                </li>
                <li className={style['settings-list-item']}>
                    <ControlsRadioGroup />
                </li>
                <li className={style['settings-list-item']}>
                    <SnapControlsGroup />
                </li>
                <li className={style['settings-list-item']}>
                    <AddElementDropdown onElementSelection={addElement} />
                </li>
            </ul>
        </div>
    );
};

export default Toolbar;