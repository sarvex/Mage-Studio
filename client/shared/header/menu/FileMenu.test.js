import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import FileMenu from './FileMenu';

describe('FileMenu', () => {

    it('should render fine', () => {
        const component = shallow(<FileMenu />);
        expect(toJSON(component)).toMatchSnapshot();
    });

    it('should render properly when is inside code editor', () => {
        const component = shallow(<FileMenu isCodeEditor/>);
        expect(toJSON(component)).toMatchSnapshot();
    });
})
