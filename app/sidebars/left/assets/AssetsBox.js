import React from 'react';
import { Icon } from 'antd';
import CopyButton from '../../../common/CopyButton';
import DeleteButton from '../../../common/DeleteButton';
import AddButton from '../../../common/AddButton';
import SearchButton from '../../../common/SearchButton';

import AssetItem from './elements/AssetItem';
import {fogColorChanged, fogDensityChanged, fogEnabled} from "../../../actions/fog";
import {controlsChanged, snapEnabledChange, snapValueChange} from "../../../actions/controls";
import {connect} from "react-redux";
import {getAllAssets} from "../../../actions/assets";

const folders = [
    'static',
    'test',
    'folder',
    'table'
];

class AssetsBox extends React.Component {

    componentDidMount() {
        // getting assets
        const { getAssets, config } = this.props;
        const { project } = config;

        getAssets(project);
    }

    render() {
        const {
            models = [],
            images = [],
            textures = []
        } = this.props;

        return (
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
                    { models.map((model, i) => ( <AssetItem key={`model-${i}`} name={model.name}/>)) }
                    { images.map((image, i) => ( <AssetItem key={`image-${i}`} name={image.name}/>)) }
                    { textures.map((texture, i) => ( <AssetItem key={`texture-${i}`} name={texture.name}/>)) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { assets = {}, config = {} } = state;

    return {
        ...assets,
        config
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAssets: (project) => dispatch(getAllAssets(project))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetsBox);
