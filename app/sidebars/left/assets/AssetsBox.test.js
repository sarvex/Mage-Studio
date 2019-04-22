import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { AssetsBox } from './AssetsBox';

describe('asset', () => {

    it('should render an AssetsMenu', () => {
        const assets = { textures: [], models: [], images: [] };
        const textures = {};
        const config = { project: 'test' };


        const component = shallow(
            <AssetsBox
                assets={assets}
                config={config}
                textures={textures}
            />);

        expect(component.find('AssetsMenu').length).toBe(1);
    });

    it('should render one AssetItem per image', () => {
        const images = [
            { name: 'test1' },
            { name: 'test2' },
            { name: 'test3' }
        ];
        const models = [
            { name: 'test1' },
            { name: 'test2' },
            { name: 'test3' }
        ];
        const assets = { textures: [], models, images };
        const textures = {};
        const config = { project: 'test' };


        const component = shallow(
            <AssetsBox
                assets={assets}
                config={config}
                textures={textures}
            />);

        expect(component.find('AssetItem').length).toBe(6);
    });

    it('should render one AssetImage per texture', () => {
        const assets = {
            textures: [
                { name: 'test1' },
                { name: 'test2' },
                { name: 'test3' }
            ],
            models: [],
            images: []
        };
        const textures = {};
        const config = { project: 'test' };

        const component = shallow(
            <AssetsBox
                assets={assets}
                config={config}
                textures={textures}
            />);

        expect(component.find('AssetImage').length).toBe(3);
    });

    it('should render one AssetUploadModal', () => {
        const assets = {
            textures: [],
            models: [],
            images: []
        };
        const textures = {};
        const config = { project: 'test' };

        const component = shallow(
            <AssetsBox
                assets={assets}
                config={config}
                textures={textures}
            />);

        expect(component.find('AssetUploadModal').length).toBe(1);
    });

    describe('mount', () => {

        it('should fetch assets when component is mounted', () => {
            const assets = {
                textures: [],
                models: [],
                images: []
            };
            const textures = {};
            const config = { project: 'test' };
            const getAssets = sinon.spy();

            mount(
                <AssetsBox
                    getAssets={getAssets}
                    assets={assets}
                    config={config}
                    textures={textures}
                />);

            expect(getAssets.calledWithExactly('test')).toBe(true);
        });
    });

    describe('events', () => {

        it('should call showTextureModal if user clicks on texture inside AssetsMenu', () => {
            const assets = {
                textures: [],
                models: [],
                images: []
            };
            const textures = {};
            const config = { project: 'test' };
            const showTextureModal = sinon.spy();

            const component = shallow(
                <AssetsBox
                    assets={assets}
                    config={config}
                    textures={textures}
                    showTextureModal={showTextureModal}
                />);

            component.find('AssetsMenu').simulate('assetsMenuClick', { key: 'textures' });

            expect(showTextureModal.called).toBe(true);
        });

        it('should not call showTextureModal if user clicks on diff menu item', () => {
            const assets = {
                textures: [],
                models: [],
                images: []
            };
            const textures = {};
            const config = { project: 'test' };
            const showTextureModal = sinon.spy();

            const component = shallow(
                <AssetsBox
                    assets={assets}
                    config={config}
                    textures={textures}
                    showTextureModal={showTextureModal}
                />);

            component.find('AssetsMenu').simulate('assetsMenuClick', { key: 'images' });

            expect(showTextureModal.called).toBe(false);
        });

        it('should fire uploadTexture when user tries to upload a texture', () => {
            const assets = {
                textures: [],
                models: [],
                images: []
            };
            const textures = {};
            const config = { project: 'test' };
            const uploadTexture = sinon.spy();

            const component = shallow(
                <AssetsBox
                    assets={assets}
                    config={config}
                    textures={textures}
                    uploadTexture={uploadTexture}
                />);

            const textureModal = component
                .findWhere(node => node.props().type === 'textures');

            textureModal.simulate('upload', { file: 'testfile' });

            expect(uploadTexture.called).toBe(true);
        });
    });
});