import React from 'react';
import './scene.scss';

const Player = ({ visible, url }) => {
    if (!visible) return null;

    return (
        <iframe src={url} id={'gamePlayer'}/>
    )
};

export default Player;