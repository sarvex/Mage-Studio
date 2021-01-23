import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import SpaceSettingsButton from './SpaceSettingsButton';
import sinon from 'sinon';

describe('SpaceSettingsButton', () => {

    it('should render properly', () => {
        const component = shallow(<SpaceSettingsButton />);
        expect(toJSON(component)).toMatchSnapshot();
    });

    describe('behaviour', () => {

        it('onTransformSpaceChange', () => {
            const spy = sinon.spy();
            const component = shallow(<SpaceSettingsButton onTransformSpaceChange={spy} />);

            component.find('Button').simulate('click');

            expect(spy.called).toBe(true);
        });
    });
});