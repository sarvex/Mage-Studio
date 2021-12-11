import React from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';

import AssetsTitle from './elements/AssetsTitle';
import AssetItem from './elements/AssetItem';
import AssetImage from './elements/AssetImage';
// import AssetUploadModal from '../../modals/AssetUploadModal';

import { SCRIPTS_EDITOR_PATH } from '../../../lib/constants';

import { getAllAssets } from "../../../actions/assets";
import {
    showTextureModal,
    hideTextureModal,
    uploadTexture
} from '../../../actions/textures';

import style from './assets.module.scss';

export class AssetsPanel extends React.Component {

    componentDidMount() {
        const { getAssets = f => f, config } = this.props;
        const { project } = config;

        getAssets(project);
    }

    navigateToScriptsEditor = () => {
        window.open(SCRIPTS_EDITOR_PATH, '_blank');
    }

    handleAssetsTitleChange = ({ key }) => {
        const  { showTextureModal } = this.props;

        switch(key) {
            case 'textures':
                showTextureModal();
                break;
            case 'scripts':
                this.navigateToScriptsEditor();
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
            assets = {},
            config
        } = this.props;

        const { models = [], images = [], textures = [] } = assets;

        return (
            <div className={classnames(style.panel, style.assets)}>
                <h3 className={style.title}>Assets</h3>
                {/* <AssetsTitle onAssetsTitleClick={this.handleAssetsTitleChange} /> */}
                <div className={style.content}>
                    { models.map((model, i) => ( <AssetItem key={`model-${i}`} name={model.name}/>)) }
                    { images.map((image, i) => ( <AssetItem key={`image-${i}`} name={image.name}/>)) }
                    { textures.map((texture, i) => ( <AssetImage
                        key={`texture-${i}`}
                        project={config.project}
                        name={texture.name} />
                    )) }
                </div>
                {/* <AssetUploadModal
                    type={"textures"}
                    onDismiss={this.handleModalHide('textures')}
                    onConfirm={this.handleUpload('textures')}
                    loading={textures.textureModalLoading}
                    visible={textures.textureModalVisible} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(AssetsPanel);
