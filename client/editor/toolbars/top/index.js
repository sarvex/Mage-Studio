import React from 'react';

import {
    SpaceSettingsButton,
    ControlsRadioGroup,
    SnapControlsGroup,
    AddElementDropdown
} from './elements';

import style from './toolbar.module.scss';
import { addElement } from '../../../actions/scene';
import { connect } from 'react-redux';
import {
    transformSnapChanged,
    transformControlChanged,
    transformSpaceChanged
} from '../../../actions/controls';

export const Toolbar = ({
    control,
    space,
    snap,
    snapEnabled,
    onTransformControlChange,
    onTransformSpaceChange,
    onTransformSnapChange
}) => {

    const handleTransformControlChange = (e) => onTransformControlChange(e.target.value);
    const handleTransformSpaceChange = () => onTransformSpaceChange();

    const handleSnapIncrease = () => onTransformSnapChange(snapEnabled, snap + 10);
    const handleSnapDecrease = () => onTransformSnapChange(snapEnabled, snap - 10);
    const handleSnapEnabledToggle = () => onTransformSnapChange(!snapEnabled, snap);

    return (
        <div className={style.toolbar}>
            <ul className={style['settings-list']}>
                <li className={style['settings-list-item']}>
                    <SpaceSettingsButton
                        onTransformSpaceChange={handleTransformSpaceChange}
                        space={space} />
                </li>
                <li className={style['settings-list-item']}>
                    <AddElementDropdown onElementSelection={addElement} />
                </li>
                <li className={style['settings-list-item']}>
                    <ControlsRadioGroup
                        onTransformControlChange={handleTransformControlChange}
                        control={control} />
                </li>
                <li className={style['settings-list-item']}>
                    <SnapControlsGroup
                        snap={snap}
                        enabled={snapEnabled}
                        onSnapDecrease={handleSnapDecrease}
                        onSnapIncrease={handleSnapIncrease}
                        onSnapEnabledChange={handleSnapEnabledToggle} />
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = ({ controls }) => ({
    control: controls.current,
    space: controls.space,
    snapEnabled: controls.snapEnabled,
    snap: controls.snap
});

const mapDispatchToProps = dispatch => ({
    onTransformControlChange: value => dispatch(transformControlChanged(value)),
    onTransformSpaceChange: () => dispatch(transformSpaceChanged()),
    onTransformSnapChange: (enabled, value) => dispatch(transformSnapChanged(enabled, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);