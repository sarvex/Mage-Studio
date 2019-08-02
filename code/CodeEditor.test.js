import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import * as actions from '../app/actions/scripts';
import { CodeEditor } from './CodeEditor';

jest.mock('../app/actions/scripts');

const defaultProps = {
    scripts: {
        list: []
    },
    config: {
        project: 'test'
    }
};

const getEditor = (props) => shallow(<CodeEditor {...defaultProps} {...props} />);

describe('CodeEditor', () => {

    beforeEach(() => {
        actions.getScripts.mockClear();
        actions.getScriptContent.mockClear();
    });

    it('should render fine', () => {
        expect(toJSON(getEditor())).toMatchSnapshot();
    });

    it('should start with the right state', () => {
        const component = getEditor();

        expect(component.state().code).toBe('');
        expect(component.state().loaded).toBe(false);
    });

    describe('events', () => {

        it('should fetch script content on script selection', () => {
            actions.getScriptContent.mockReturnValue(Promise.resolve({ data: { content: 'nothing' }}));
            const component = getEditor();
            const tree = component.find('ProjectTree');

            tree.simulate('scriptSelect', ['filename.js']);

            expect(actions.getScriptContent).toHaveBeenCalledTimes(1);
        });

        it('should set state when script is done fetching', (done) => {
            actions.getScriptContent.mockReturnValue(Promise.resolve({ data: { content: 'content' }}));
            const component = getEditor();
            const tree = component.find('ProjectTree');

            tree.simulate('scriptSelect', ['filename.js']);

            setTimeout(() => {
                expect(component.state().code).toBe('content');
                done();
            });
        });
    });
});
