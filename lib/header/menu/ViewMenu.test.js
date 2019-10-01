import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ViewMenu from './ViewMenu';

describe('ViewMenu', () => {

    it('should render fine', () => {
        const component = shallow(<ViewMenu />);
        expect(toJSON(component)).toMatchSnapshot();
    });
})
