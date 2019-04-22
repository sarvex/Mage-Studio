import React from 'react';
import File from './File';

import './modalcontent.scss';

const ModelsSelector = ({ list = [], selection = '', uploaded, onSelect }) => {

    const mapModels = () => {
        return list.map(m => (
            <li>
                <File
                    selected={selection === m.name}
                    onClick={onSelect(m.name)}
                    name={m.name} />
            </li>
        ));
    };

    const getEmptyList = () => {
        return <li>Empty</li>
    };

    return (
        <ul className="content flex-grow-2">
            { list.length ? mapModels() : getEmptyList() }
        </ul>
    )
}

export default ModelsSelector;
