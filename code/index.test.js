import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Code from './index';

describe('Code', () => {

    it('should render fine', () => {
        const component = shallow(<Code />);
        expect(toJSON(component)).toMatchSnapshot();
    });
});
