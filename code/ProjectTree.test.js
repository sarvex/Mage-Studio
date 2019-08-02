import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
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

const getProjectTree = (props) => shallow(<ProjectTree { ...defaultProps } { ...props }/>);

describe('ProjectTree', () => {

    it('should render fine', () => {
        expect(toJSON(getProjectTree())).toMatchSnapshot();
    });

    it('should call onScriptSelect when user selects a script', () => {
        const onScriptSelect = sinon.spy();
        const component = getProjectTree({ onScriptSelect });

        component.find('DirectoryTree').simulate('select');

        expect(onScriptSelect.called).toBe(true);
    });
});
