import React from 'react';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {

    it('should render fine', () => {
        const component = shallow(<Layout />);
        expect(component).toMatchSnapshot();
    });
});
