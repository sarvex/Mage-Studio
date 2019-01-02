import React from 'react';
import {
    connect
} from 'react-redux';
import { Col, Icon } from 'antd';

import CopyButton from '../../common/CopyButton';
import DeleteButton from '../../common/DeleteButton';
import AddButton from '../../common/AddButton';
import SearchButton from '../../common/SearchButton';

import Hierarchy from './Hierarchy';
import Inspector from './Inspector';

const RightSidebar = ({ empty, element, position, rotation, scale }) => (
    <Col
        span={4}
        className='sidebar'>

        <div className="box">
            <p className="title">
                <Icon className="icon" type="bars" />
                <span>Hierarchy</span>
                <DeleteButton />
                <CopyButton />
                <AddButton />
                <SearchButton />
            </p>
            <div className="content">
                <Hierarchy />
            </div>
        </div>
        <div className='box'>
            <p className="title">
                <Icon className="icon" type="search" />
                <span>Inspector</span>
            </p>
            <div className="content">
                <Inspector
                    empty={empty}
                    element={element}
                    position={position}
                    rotation={rotation}
                    scale={scale}
                />
            </div>
        </div>
    </Col>
);

const mapStateToProps = (state) => {
    const { rightsidebar } = state;
    const { empty, element, position, rotation, scale } = rightsidebar;

    // console.log(rightsidebar, new Date());

    return {
        empty,
        element,
        position,
        rotation,
        scale
    }
}

export default connect(mapStateToProps)(RightSidebar);
