import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import App from './index';

describe('App', () => {

    it('should render fine', () => {
        const component = shallow(<App />);
        expect(toJSON(component)).toMatchSnapshot();
    });
});
