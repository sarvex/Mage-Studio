import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
// import sinon from 'sinon';
// import * as actions from '../actions/scripts';
import { CodeEditor } from "./CodeEditor";

// jest.mock("../actions/scripts");

const defaultProps = {
    onEditorReady: f => f,
    onScriptLoaded: f => f,
    scripts: {
        list: [],
        editor: {},
    },
    config: {
        project: "test",
    },
};

const getEditor = props => shallow(<CodeEditor {...defaultProps} {...props} />);

describe("CodeEditor", () => {
    //     beforeEach(() => {
    //         actions.getScripts.mockClear();
    //         actions.getScriptContent.mockClear();
    //     });
    it("should render fine", () => {
        expect(toJSON(getEditor({}))).toMatchSnapshot();
    });
    //     describe('events', () => {
    //         it('should fetch script content on script selection', () => {
    //             actions.getScriptContent.mockReturnValue(Promise.resolve({ data: { content: 'nothing' }}));
    //             const component = getEditor();
    //             const tree = component.find('ProjectTree');
    //             tree.simulate('scriptSelect', ['filename.js']);
    //             expect(actions.getScriptContent).toHaveBeenCalledTimes(1);
    //         });
    //         it('should call onScriptLoaded when is done fetching script content', (done) => {
    //             actions.getScriptContent.mockReturnValue(Promise.resolve({ data: { content: 'content' }}));
    //             const spy = sinon.spy();
    //             const onScriptLoaded = function() {
    //                 spy();
    //             };
    //             const component = getEditor({ onScriptLoaded });
    //             const tree = component.find('ProjectTree');
    //             tree.simulate('scriptSelect', ['filename.js']);
    //             setTimeout(() => {
    //                 expect(spy.called).toEqual(true);
    //                 done();
    //             });
    //         });
    //     });
});
