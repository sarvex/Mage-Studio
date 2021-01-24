import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import AddElementDropdown from './AddElementDropdown';
import sinon from 'sinon';

describe('AddElementDropdown', () => {

    describe('render', () => {

        it('should render properly', () => {
            const component = shallow(<AddElementDropdown />);
            expect(toJSON(component)).toMatchSnapshot();
        });
    });
});