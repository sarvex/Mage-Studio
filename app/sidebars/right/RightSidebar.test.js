import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { RightSidebar } from './RightSidebar';

const defaultProps = {
    config: {
        project: 'test'
    }
};

const getSidebar = (props) =>  shallow(<RightSidebar { ...defaultProps } { ...props }/>);

describe('RightSidebar', () => {

    it('should render fine', () => {
        const component = getSidebar();
        expect(component).toMatchSnapshot();
    });

    describe('events', () => {

        it('should call onPositionChange when the position changes', () => {
            const onPositionChange = sinon.spy();
            const component = getSidebar({ onPositionChange });

            component.instance().handlePositionChange('x')();

            expect(onPositionChange.called).toBe(true);
        });

        it('should call onRotationChange when the rotation changes', () => {
            const onRotationChange = sinon.spy();
            const component = getSidebar({ onRotationChange });

            component.instance().handleRotationChange('x')();

            expect(onRotationChange.called).toBe(true);
        });

        it('should call onScaleChange when the scale changes', () => {
            const onScaleChange = sinon.spy();
            const component = getSidebar({ onScaleChange });

            component.instance().handleScaleChange('x')();

            expect(onScaleChange.called).toBe(true);
        });

        it('should call onScriptMount when the scripts are on screen', () => {
            const getScripts = sinon.spy();
            const component = getSidebar({ getScripts });

            component.find('Inspector').simulate('scriptsMount');

            expect(getScripts.called).toBe(true);
        });

        it('should call onSCriptchange when the scripts are changing', () => {
            const getSingleScript = sinon.spy();
            const component = getSidebar({ getSingleScript });

            component.find('Inspector').simulate('scriptChange');

            expect(getSingleScript.called).toBe(true);
        });

        it('should call onTextureChange when the texture changed', () => {
            const onTextureChange = sinon.spy();
            const component = getSidebar({ onTextureChange });

            component.find('Inspector').simulate('textureChange');

            expect(onTextureChange.called).toBe(true);
        });

        it('should onMaterialChange when the material changes', () => {
            const onMaterialChange = sinon.spy();
            const component = getSidebar({ onMaterialChange });

            component.find('Inspector').simulate('materialChange');

            expect(onMaterialChange.called).toBe(true);
        });
    });
});