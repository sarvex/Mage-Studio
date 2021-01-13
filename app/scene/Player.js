import React from 'react';
import style from './scene.module.scss';

const Player = ({ visible, url }) => {
    if (!visible) return null;

    return (
        <iframe src={url} id={'gamePlayer'}/>
    )
};

export default Player;