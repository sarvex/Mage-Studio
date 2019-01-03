import React from 'react';
import { Icon } from 'antd';
import CopyButton from '../../../common/CopyButton';
import DeleteButton from '../../../common/DeleteButton';
import AddButton from '../../../common/AddButton';
import SearchButton from '../../../common/SearchButton';

import Folder from './elements/Folder';

const folders = [
    'marco',
    'test',
    'folder',
    'table'
];

const SceneSettings = () => (
    <div className="box">
        <p className="title">
            <Icon className="icon" type="hdd" />
            <span>Assets</span>
            <DeleteButton />
            <CopyButton />
            <AddButton />
            <SearchButton />
        </p>
        <div className="content">
            { folders.map((name, i) => ( <Folder key={i} name={name}/>)) }
        </div>
    </div>
);

export default SceneSettings;
