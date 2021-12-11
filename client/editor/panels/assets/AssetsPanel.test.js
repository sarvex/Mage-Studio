import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { AssetsPanel } from './AssetsPanel';

describe('asset', () => {

    it('should render an AssetsMenu', () => {
        const assets = { textures: [], models: [], images: [] };
        const textures = {};
        const config = { project: 'test' };


        const component = shallow(
            <AssetsPanel
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
            <AssetsPanel
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
            <AssetsPanel
                assets={assets}
                config={config}
                textures={textures}
            />);

        expect(component.find('AssetImage').length).toBe(3);
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
                <AssetsPanel
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
                <AssetsPanel
                    assets={assets}
                    config={config}
                    textures={textures}
                    showTextureModal={showTextureModal}
                />);

            component.find('AssetsMenu').simulate('assetsMenuClick', { key: 'textures' });

            expect(showTextureModal.called).toBe(true);
        });

        it('should call window.open if user clicks on scripts inside AssetsMenu', () => {
            const assets = {
                textures: [],
                models: [],
                images: []
            };
            const textures = {};
            const config = { project: 'test' };
            const stub = sinon.stub(window, 'open');

            const component = shallow(
                <AssetsPanel
                    assets={assets}
                    config={config}
                    textures={textures}
                />);

            component.find('AssetsMenu').simulate('assetsMenuClick', { key: 'scripts' });

            expect(stub.called).toBe(true);
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
                <AssetsPanel
                    assets={assets}
                    config={config}
                    textures={textures}
                    showTextureModal={showTextureModal}
                />);

            component.find('AssetsMenu').simulate('assetsMenuClick', { key: 'images' });

            expect(showTextureModal.called).toBe(false);
        });
    });
});
