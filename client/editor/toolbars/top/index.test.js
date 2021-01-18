import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { addElement } from '../../../actions/scene';
import Toolbar from './index';

jest.mock('../../../actions/scene');

describe.only('TopToolbar', () => {

    beforeEach(() => {
        addElement.mockClear();
    });

    describe('render', () => {

        it('should render properly', () => {
            const component = shallow(<Toolbar />);
            expect(toJSON(component)).toMatchSnapshot();
        });
    });

    describe('AddElementDropdown', () => {
        
        it('should call addElement when onElementSelection occurs', () => {
            const component = shallow(<Toolbar />);

            component.find('AddElementDropdown').simulate('elementSelection');

            expect(addElement).toHaveBeenCalledTimes(1);
        });
    });
});