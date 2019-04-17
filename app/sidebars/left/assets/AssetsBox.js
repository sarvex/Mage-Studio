import React from 'react';
import { connect } from "react-redux";

import AssetsMenu from './elements/AssetsMenu';
import AssetItem from './elements/AssetItem';
import AssetImage from './elements/AssetImage';

import {
    getAllAssets,
    showTextureModal
} from "../../../actions/assets";
import AssetUploadModal from '../../../modals/AssetUploadModal';

class AssetsBox extends React.Component {

    componentDidMount() {
        // getting assets
        const { getAssets, config } = this.props;
        const { project } = config;

        getAssets(project);
    }

    handleAssetsMenuChange = (key) => {
        const  { showTextureModal } = this.props;
        switch(key) {
            case 'texture':
                showTextureModal();
                break;
            default:
                break;
        }
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
                    <AssetsMenu onAssetsMenuClick={this.handleAssetsMenuChange} />
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
                <AssetUploadModal visible/>
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
        showTextureModal: () => dispatch(showTextureModal()),
        getAssets: (project) => dispatch(getAllAssets(project))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetsBox);
