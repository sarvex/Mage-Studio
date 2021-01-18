import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { SceneContainer } from './SceneContainer';

const getSceneContainer = (props) => shallow(<SceneContainer scene={{}} {...props} />);

describe('SceneContainer', () => {

    it('should render properly', () => {
        const component = getSceneContainer();

        expect(toJSON(component)).toMatchSnapshot();
    });

    it('should render properly if fullscreen', () => {
       const component = getSceneContainer();

       component.setState({ fullscreen: true });

       expect(toJSON(component)).toMatchSnapshot();
    });

    it('should have state.fullscreen set to false', () => {
        const component = getSceneContainer();

        expect(component.state().fullscreen).toBe(false);
    });

    describe('events', () => {

        it('should call onMeshChanged', () => {
            const spy = sinon.spy();
            const component = getSceneContainer({ onMeshChanged: spy });

            component.find('Scene').simulate('meshChanged');

            expect(spy.called).toBe(true);
        });

        it('should call onMeshAttached', () => {
            const spy = sinon.spy();
            const component = getSceneContainer({ onMeshAttached: spy });

            component.find('Scene').simulate('meshAttached');

            expect(spy.called).toBe(true);
        });

        it('should call onMeshDetached', () => {
            const spy = sinon.spy();
            const component = getSceneContainer({ onMeshDetached: spy });

            component.find('Scene').simulate('meshDetached');

            expect(spy.called).toBe(true);
        });

        it('should call onSceneExported', () => {
            const spy = sinon.spy();
            const component = getSceneContainer({ onSceneExported: spy });

            component.find('Scene').simulate('sceneExported');

            expect(spy.called).toBe(true);
        });
    });
});