import React from 'react';
import { shallow, mount } from 'enzyme';
import { Dropdown } from 'antd';
import sinon from 'sinon';
import { addLight, addMesh } from '../actions/scene';
import SceneToolbar from './SceneToolbar';
jest.mock('../actions/scene');

describe('SceneToolbar', () => {

    beforeEach(() => {
        addLight.mockClear();
        addMesh.mockClear();
    });

    describe('render', () => {

        it('should render a dropdown', () => {
            const component = shallow(<SceneToolbar />);

            expect(component.find('Dropdown').length).toBe(1);
        });

        it('should render a play button when scene is not playing', () => {
            const component = shallow(<SceneToolbar />);
            const icon = component.find('Icon').at(1);

            expect(icon.props().type).toBe('caret-right');
        });

        it('should render a pause button when scene is playing', () => {
            const component = shallow(<SceneToolbar playerVisible />);
            const icon = component.find('Icon').at(1);

            expect(icon.props().type).toBe('pause');
        });

        it('should render a full screen button', () => {
            const component = shallow(<SceneToolbar />);
            const icon = component.find('Icon').at(2);

            expect(icon.props().type).toBe('fullscreen');
        });

        describe('add menu', () => {

            it('should render a Menu.Item with title=model', () => {
                const component = new SceneToolbar();

                const rendered = shallow(component.getMenu());
                const item = rendered.find('MenuItem').at(0);

                expect(item.props().title).toBe('model');
            });

            it('should render a Menu.SubMenu with title=mesh with three Menu.Item inside', () => {
                const component = new SceneToolbar();

                const rendered = shallow(component.getMenu());
                const submenu = rendered.find('SubMenu').at(0);

                expect(submenu.props().title).toBe('mesh');

                expect(submenu.find('MenuItem').length).toBe(3);
            });

            it('should render a Menu.SubMenu with title=sound', () => {
                const component = new SceneToolbar();

                const rendered = shallow(component.getMenu());
                const submenu = rendered.find('SubMenu').at(1);

                expect(submenu.props().title).toBe('sound');
            });

            it('should render a Menu.SubMenu with title=light with two Menu.Item inside', () => {
                const component = new SceneToolbar();

                const rendered = shallow(component.getMenu());
                const submenu = rendered.find('SubMenu').at(2);

                expect(submenu.props().title).toBe('light');

                expect(submenu.find('MenuItem').length).toBe(2);
            });
        });
    });

    describe('actions', () => {

        it('should call showModelModal when clicking on add/model', () => {
            const spy = sinon.spy();
            const toolbar = mount(<SceneToolbar showModelModal={spy} />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(0);

            item.simulate('click');

            expect(spy.called).toBe(true);
        });

        it('should call addMesh when clicking on add/mesh/cube', () => {
            const toolbar = mount(<SceneToolbar />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(1);

            item.simulate('click');

            expect(addMesh).toHaveBeenCalledTimes(1);
        });

        it('should call addMesh when clicking on add/mesh/sphere', () => {
            const toolbar = mount(<SceneToolbar />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(2);

            item.simulate('click');

            expect(addMesh).toHaveBeenCalledTimes(1);
        });

        it('should call addMesh when clicking on add/mesh/cylinder', () => {
            const toolbar = mount(<SceneToolbar />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(3);

            item.simulate('click');

            expect(addMesh).toHaveBeenCalledTimes(1);
        });

        it('should call addMesh when clicking on add/light/ambient', () => {
            const toolbar = mount(<SceneToolbar />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(5);

            item.simulate('click');

            expect(addLight).toHaveBeenCalledTimes(1);
        });

        it('should call addMesh when clicking on add/light/sun', () => {
            const toolbar = mount(<SceneToolbar />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(6);

            item.simulate('click');

            expect(addLight).toHaveBeenCalledTimes(1);
        });
    });

    describe('state', () => {

        it('should restore the state when clicking on add/mesh/cube', () => {
            const toolbar = mount(<SceneToolbar />);
            const menu = shallow(toolbar.instance().getMenu());
            const item = menu.find('MenuItem').at(1);

            item.simulate('click');

            expect(toolbar.state().add).toBe(false);
            expect(toolbar.state().play).toBe(false);
            expect(toolbar.state().fullscreen).toBe(false);
        });

        it('should set state.add to true when clicking onn add dropdown', () => {
            const toolbar = shallow(<SceneToolbar config={{ project: 'test' }}/>);
            const item = toolbar.find('Dropdown').at(0);

            item.simulate('click');

            expect(toolbar.state().add).toBe(true);
        });

        it('should set state.play to true when clicking on play button', () => {
            const toolbar = shallow(<SceneToolbar config={{ project: 'test' }}/>);
            const item = toolbar.find('p').at(1);

            item.simulate('click');

            expect(toolbar.state().play).toBe(true);
        });

        it('should set state.fullscreen to true when clicking on fullscreen button', () => {
            const toolbar = shallow(<SceneToolbar config={{ project: 'test' }}/>);
            const item = toolbar.find('p').at(2);

            item.simulate('click');

            expect(toolbar.state().fullscreen).toBe(true);
        });
    });

    describe('Start/Stop', () => {

        it('should call startProject when clicking on play the first time', () => {
            const startSpy = sinon.spy();
            const stopSpy = sinon.spy();
            const toolbar = shallow(<SceneToolbar
                startProject={startSpy}
                stopProject={stopSpy}
                config={{ project: 'test' }}
            />);

            const item = toolbar.find('p').at(1);

            item.simulate('click');

            expect(startSpy.calledWith('test')).toBe(true);
            expect(stopSpy.calledWith('test')).toBe(false);
        });

        it('should call stopProject when clicking on play button and player is visible', () => {
            const startSpy = sinon.spy();
            const stopSpy = sinon.spy();
            const toolbar = shallow(<SceneToolbar
                startProject={startSpy}
                stopProject={stopSpy}
                playerVisible
                config={{ project: 'test' }}
            />);

            const item = toolbar.find('p').at(1);

            item.simulate('click');

            expect(startSpy.calledWith('test')).toBe(false);
            expect(stopSpy.calledWith('test')).toBe(true);
        });
    })
});