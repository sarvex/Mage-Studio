import React from 'react';
import { shallow } from 'enzyme';

import ProjectTree from './ProjectTree';

const defaultProps = {
    scripts: {
        list: []
    },
    config: {
        project: 'test'
    }
};

describe('ProjectTree', () => {

    it('should render fine', () => {
        const component = shallow(<ProjectTree { ...defaultProps } />);
        expect(component).toMatchSnapshot();
    });
});
