import { iteratee } from 'lodash';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import SnapControlsGroup from './SnapControlsGroup';

describe('SnapControlsGroup', () => {

    it('renders properly', () => {
        const component = shallow(<SnapControlsGroup />);
        expect(toJSON(component)).toMatchSnapshot();
    });

    describe('behaviours', () => {

        it.skip('onSnapIncrease', () => {
            const spy = sinon.spy();
            const component = shallow(<SnapControlsGroup onSnapIncrease={spy} />);

            component.find('PlusOutlined').simulate('click');

            expect(spy.called).toBe(true);
        });

        it.skip('onSnapDecrease', () => {
            const spy = sinon.spy();
            const component = shallow(<SnapControlsGroup onSnapDecrease={spy} />);

            component.find('MinusOutlined').simulate('click');

            expect(spy.called).toBe(true);
        });

        it('onSnapEnabledChange', () => {
            const spy = sinon.spy();
            const component = shallow(<SnapControlsGroup onSnapEnabledChange={spy} />);

            component.find('Switch').simulate('change');

            expect(spy.called).toBe(true);
        });
    });
});
