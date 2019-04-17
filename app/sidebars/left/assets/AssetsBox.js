import React from 'react';
import { connect } from "react-redux";

import AssetsMenu from './elements/AssetsMenu';
import AssetItem from './elements/AssetItem';
import AssetImage from './elements/AssetImage';

import { fogColorChanged, fogDensityChanged, fogEnabled } from "../../../actions/fog";
import { controlsChanged, snapEnabledChange, snapValueChange } from "../../../actions/controls";
import { getAllAssets } from "../../../actions/assets";

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
            textures = [],
            config
        } = this.props;

        return (
            <div className="box">
                <div className="title">
                    <AssetsMenu />
                </div>
                <div className="content">
                    { models.map((model, i) => ( <AssetItem key={`model-${i}`} name={model.name}/>)) }
                    { images.map((image, i) => ( <AssetItem key={`image-${i}`} name={image.name}/>)) }
                    { textures.map((texture, i) => ( <AssetImage
                        key={`texture-${i}`}
                        project={config.project}
                        name={texture.name} />
                    )) }
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
