import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { CodeEditor } from './CodeEditor';

const defaultProps = {
    scripts: {
        list: []
    },
    config: {
        project: 'test'
    }
};

describe('CodeEditor', () => {

    it('should render fine', () => {
        const component = shallow(<CodeEditor { ...defaultProps } />);
        expect(toJSON(component)).toMatchSnapshot();
    });

    it('should render fine')
});
