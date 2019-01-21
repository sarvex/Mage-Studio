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

import {
    meshChanged
} from '../../actions/currentMesh';

class RightSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    onPositionChange = (axis) => (value) => {
        const { onPositionChange, element } = this.props;
        const position = {
            ...element.position(),
            [axis]: value
        };
        const rotation = element.rotation();
        const scale = element.scale();

        onPositionChange(element, position, rotation, scale);
    }

    onRotationChange = (axis) => (value) => {
        const { onRotationChange, element } = this.props;
        const rotation = {
            ...element.rotation(),
            [axis]: value
        };
        const position = element.position();
        const scale = element.scale();

        onRotationChange(element, position, rotation, scale);
    }

    onScaleChange = (axis) => (value) => {
        const { onScaleChange, element } = this.props;
        const scale = {
            ...element.scale(),
            [axis]: value
        };
        const position = element.position();
        const rotation = element.rotation();

        onScaleChange(element, position, rotation, scale);
    }

    render() {
        const { empty, element, position, rotation, scale, type } = this.props;

        return (
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
                            onPositionChange={this.onPositionChange}
                            onRotationChange={this.onRotationChange}
                            onScaleChange={this.onScaleChange}
                            empty={empty}
                            type={type}
                            element={element}
                            position={position}
                            rotation={rotation}
                            scale={scale}
                        />
                    </div>
                </div>
            </Col>
        );
    }
}


const mapStateToProps = (state) => {
    const { rightsidebar } = state;
    const { empty = true, element = '', type = '', position = {}, rotation = {}, scale= {} } = rightsidebar;

    return {
        empty,
        element,
        type,
        position,
        rotation,
        scale
    }
}

const mapDispatchToProps = (dispatch) => ({
    onPositionChange: (element, position, rotation, scale) => dispatch(meshChanged(element, position, rotation, scale)),
    onRotationChange: (element, position, rotation, scale) => dispatch(meshChanged(element, position, rotation, scale)),
    onScaleChange: (element, position, rotation, scale) => dispatch(meshChanged(element, position, rotation, scale))
})

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
