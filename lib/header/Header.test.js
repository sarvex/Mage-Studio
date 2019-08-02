import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Header from './Header';

describe('Header', () => {

    it('should render fine', () => {
        const component = shallow(<Header/>);
        const json = toJSON(component);

        expect(json).toMatchSnapshot();
    });
});