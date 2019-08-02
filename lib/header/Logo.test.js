import React from 'react';
import { shallow } from 'enzyme';

import Logo from './Logo';

describe('Logo', () => {

    it('should render a span with classname logo', () => {
        const component = shallow(<Logo />);

        expect(component.find('span.logo').length).toBe(1);
    });
});