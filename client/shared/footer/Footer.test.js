import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Footer from './Footer';

describe('Footer', () => {

    it('should render fine', () => {
        const component = shallow(<Footer />);
        const json = toJSON(component);

        expect(json).toMatchSnapshot();
    });
});
