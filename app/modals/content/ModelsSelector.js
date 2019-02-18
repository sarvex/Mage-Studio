import React from 'react';
import File from './File';

import './modalcontent.scss';

const ModelsSelector = ({ list = [], uploaded, onSelect }) => {

    const models = uploaded ? list.concat(uploaded) : list;

    const mapModels = () => {
        return models.map(m => (
            <li>
                <File
                    onClick={onSelect(m.name)}
                    name={m.name}/>
            </li>
        ));
    }

    const getEmptyList = () => {
        return <li>Empty</li>
    }

    return (
        <ul className="content flex-grow-2">
            { models.length ? mapModels() : getEmptyList() }
        </ul>
    )
}

export default ModelsSelector;
