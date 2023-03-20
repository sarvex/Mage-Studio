import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import { Hierarchy } from "./HierarchyPanel";

const MOCK_GRAPH = [
    {
        element: { name: "Level" },
        children: [
            {
                element: { name: "Cube" },
                children: [],
            },
        ],
    },
];

describe("HierarchyPanel", () => {
    describe("render", () => {
        it("should render properly when empty", () => {
            const component = shallow(<Hierarchy />);
            expect(toJSON(component)).toMatchSnapshot();
        });

        it("should render properly when receives a graph", () => {
            const component = shallow(<Hierarchy graph={MOCK_GRAPH} />);
            expect(toJSON(component)).toMatchSnapshot();
        });
    });
});
