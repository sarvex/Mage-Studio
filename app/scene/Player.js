import React from 'react';
import './scene.scss';

const Player = ({ visible, url, onDismiss }) => {
    if (!visible) return null;

    return (
        <iframe src={url} id={'gamePlayer'}/>
    )
};

export default Player;