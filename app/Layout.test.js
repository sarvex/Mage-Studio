import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {

    it('should render fine', () => {
        const component = shallow(<Layout />);
        expect(toJSON(component)).toMatchSnapshot();
    });
});
