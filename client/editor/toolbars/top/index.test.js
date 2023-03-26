import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import sinon from "sinon";

import { addElement } from "../../scene/AppProxy";
import { Toolbar } from "./index";

jest.mock("../../scene/AppProxy");

describe("TopToolbar", () => {
    beforeEach(() => {
        addElement.mockClear();
    });

    describe("render", () => {
        it("should render properly", () => {
            const component = shallow(<Toolbar />);
            expect(toJSON(component)).toMatchSnapshot();
        });
    });

    describe("AddElementDropdown", () => {
        it("should call addElement when onElementSelection occurs", () => {
            const component = shallow(<Toolbar />);

            component.find("AddElementDropdown").simulate("elementSelection");

            expect(addElement).toHaveBeenCalledTimes(1);
        });
    });

    // describe('SpaceSettingsButton', () => {

    //     it('should call onTransformSpaceChange action when user changes transform space', () => {
    //         const spy = sinon.spy();
    //         const component = shallow(<Toolbar onTransformSpaceChange={spy} />)

    //         component.find('SpaceSettingsButton').simulate('transformSpaceChange');

    //         expect(spy.called).toBe(true);
    //     });
    // });

    // describe('ControlsRadioGroup', () => {

    //     it('should call onTransformControlChange action when user changes transform control', () => {
    //         const spy = sinon.spy();
    //         const component = shallow(<Toolbar onTransformControlChange={spy} />)
    //         component.find('ControlsRadioGroup').simulate('transformControlChange', { target: { value: '' } });

    //         expect(spy.called).toBe(true);
    //     });
    // });

    // describe('SnapControlsGroup', () => {

    //     it('should call onTransformSnapChange action when user decreases snap value', () => {
    //         const spy = sinon.spy();
    //         const component = shallow(<Toolbar onTransformSnapChange={spy} />)

    //         component.find('SnapControlsGroup').simulate('snapDecrease');

    //         expect(spy.called).toBe(true);
    //     });

    //     it('should call onTransformSnapChange action when user increases snap value', () => {
    //         const spy = sinon.spy();
    //         const component = shallow(<Toolbar onTransformSnapChange={spy} />)

    //         component.find('SnapControlsGroup').simulate('snapIncrease');

    //         expect(spy.called).toBe(true);
    //     });

    //     it('should call onTransformSnapChange action when user toggles snap', () => {
    //         const spy = sinon.spy();
    //         const component = shallow(<Toolbar onTransformSnapChange={spy} />)

    //         component.find('SnapControlsGroup').simulate('snapEnabledChange');

    //         expect(spy.called).toBe(true);
    //     });
    // });
});
