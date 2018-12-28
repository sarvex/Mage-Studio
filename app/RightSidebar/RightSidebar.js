import React from 'react';
import {
    connect
} from 'react-redux';
import { Col } from 'antd';

const RightSidebar = ({empty, x, y, z}) => (
    <Col
        span={4}
        className='sidebar'>
        { empty ? 'No Content' :
            <ul>
                <li>{x}</li>
                <li>{y}</li>
                <li>{z}</li>
            </ul> }
    </Col>
);

const mapStateToProps = (state) => {
    const { rightsidebar } = state;
    const { empty, element } = rightsidebar;

    console.log(element);
    const position = (element && element.position()) || { x: 0, y: 0, z: 0 };

    return {
        empty,
        ...position
    }
}

export default connect(mapStateToProps)(RightSidebar);
