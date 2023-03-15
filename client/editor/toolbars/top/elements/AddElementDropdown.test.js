import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import AddElementDropdown, { AddMenu } from "./AddElementDropdown";
import { ELEMENTS } from "../../../../contants";
import sinon from "sinon";
import { Menu } from "antd";

describe("AddElementDropdown", () => {
    describe("render", () => {
        it("should render properly", () => {
            const component = shallow(<AddElementDropdown />);
            expect(toJSON(component)).toMatchSnapshot();
        });
    });

    // describe("AddMenu", () => {
    //     it("click on add -> mesh -> cube", () => {
    //         const spy = sinon.spy();
    //         const component = shallow(<AddMenu onItemSelect={spy} />);

    //         // console.log(component.debug());

    //         const item = component.findWhere(n => n.prop("title") === ELEMENTS.BASE.CUBE);
    //         item.simulate("click");

    //         console.log(spy.called);
    //         expect(spy.calledWith({ key: ELEMENTS.BASE.CUBE })).toBe(true);
    //     });
    // });
});
