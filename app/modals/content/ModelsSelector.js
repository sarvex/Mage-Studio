import React from 'react';
import '../../style.scss';

import './modalcontent.scss';

const ModelsSelector = ({ models = [] }) => {

    const mapModels = () => {
        return models.map(m => <li>test</li>)
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
