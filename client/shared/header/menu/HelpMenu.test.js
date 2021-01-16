import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import HelpMenu from './HelpMenu';

describe('HelpMenu', () => {

    it('should render fine', () => {
        const component = shallow(<HelpMenu />);
        expect(toJSON(component)).toMatchSnapshot();
    });
})
