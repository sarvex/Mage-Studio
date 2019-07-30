import React from 'react';
import { shallow } from 'enzyme';

import ProjectTree from './ProjectTree';

describe('ProjectTree', () => {

    it('should render fine', () => {
        const component = shallow(<ProjectTree />);
        expect(component).toMatchSnapshot();
    });
});
