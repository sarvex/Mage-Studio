import React from 'react';
import { Button } from 'antd';
import { FolderOutlined, HddOutlined, FolderOpenOutlined, PartitionOutlined } from '@ant-design/icons';
import './lefttoolbar.scss';

export default props => {
    return (
        <div className='left-toolbar'>
            <ul className='left-toolbar-list'>
                <li className=''>
                    <PartitionOutlined style={{ fontSize: '12px' }} />
                </li>
                <li className=''>
                    <FolderOpenOutlined style={{ fontSize: '12px' }} />
                </li>
                <li className=''>
                    <HddOutlined style={{ fontSize: '12px' }} />
                </li>
            </ul>
        </div>
    );
};