import React from 'react';
import { Tooltip, Icon } from 'antd';

const File = ({ name, onClick = f => f, selected }) => {
    const className = `file-box ${(selected ? 'selected' : '')}`;

    return (
        <div className={className} onClick={onClick}>
            <Tooltip title={name} placement="bottom">
                <div className={"model-item file"}>
                    <Icon theme="filled" className="icon" type="file"/>
                    <span className="name">{name}</span>
                </div>
            </Tooltip>
        </div>
    );
};

export default File;
