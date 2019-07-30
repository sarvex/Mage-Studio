import React from 'react';
import { shallow } from 'enzyme';

import CodeEditor from './CodeEditor';

describe('CodeEditor', () => {

    it('should render fine', () => {
        const component = shallow(<CodeEditor />);
        expect(component).toMatchSnapshot();
    });
});
