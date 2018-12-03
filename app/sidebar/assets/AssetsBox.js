import React from 'react';
import { Icon } from 'antd';
import AssetsTree from './AssetsTree';
import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';
import SearchButton from './SearchButton';

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
            { folders.map((name) => ( <Folder name={name}/>)) }
        </div>
    </div>
);

export default SceneSettings;
