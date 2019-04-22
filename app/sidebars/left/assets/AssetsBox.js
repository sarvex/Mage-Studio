import React from 'react';
import { connect } from "react-redux";

import AssetsMenu from './elements/AssetsMenu';
import AssetItem from './elements/AssetItem';
import AssetImage from './elements/AssetImage';
import AssetUploadModal from '../../../modals/AssetUploadModal';

import { getAllAssets } from "../../../actions/assets";
import {
    showTextureModal,
    hideTextureModal,
    uploadTexture
} from '../../../actions/textures';

export class AssetsBox extends React.Component {

    componentDidMount() {
        const { getAssets = f => f, config } = this.props;
        const { project } = config;

        getAssets(project);
    }

    handleAssetsMenuChange = ({ key }) => {
        const  { showTextureModal } = this.props;

        switch(key) {
            case 'textures':
                showTextureModal();
                break;
            default:
                break;
        }
    }

    handleUpload = (type) => (file) => {
        const { config, uploadTexture } = this.props;
        const { project } = config;
        // upload stuff
        switch(type) {
            case 'textures':
                uploadTexture(project, file);
                break;
            default:
                break;
        }
    }

    handleModalHide = (type) => () => {
        const { hideTextureModal } = this.props;

        switch(type) {
            case 'textures':
                hideTextureModal();
                break;
            default:
                break;
        }
    }

    render() {
        const {
            assets,
            textures,
            config
        } = this.props;

        return (
            <div className="box">
                <div className="title">
                    <AssetsMenu onAssetsMenuClick={this.handleAssetsMenuChange} />
                </div>
                <div className="content">
                    { assets.models.map((model, i) => ( <AssetItem key={`model-${i}`} name={model.name}/>)) }
                    { assets.images.map((image, i) => ( <AssetItem key={`image-${i}`} name={image.name}/>)) }
                    { assets.textures.map((texture, i) => ( <AssetImage
                        key={`texture-${i}`}
                        project={config.project}
                        name={texture.name} />
                    )) }
                </div>
                <AssetUploadModal
                    type={"textures"}
                    hideModal={this.handleModalHide('textures')}
                    onUpload={this.handleUpload('textures')}
                    loading={textures.textureModalLoading}
                    visible={textures.textureModalVisible} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { assets = {}, config = {}, textures = {} } = state;

    return {
        assets,
        textures,
        config
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadTexture: (project, file) => dispatch(uploadTexture(project, file)),
        hideTextureModal: () => dispatch(hideTextureModal()),
        showTextureModal: () => dispatch(showTextureModal()),
        getAssets: (project) => dispatch(getAllAssets(project))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetsBox);
