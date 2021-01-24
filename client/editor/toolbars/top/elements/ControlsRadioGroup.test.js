import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ControlsRadioGroup from './ControlsRadioGroup';
import sinon from 'sinon';
import { ROTATE_CONTROL, SCALE_CONTROL, TRANSLATE_CONTROL } from '../../../../lib/constants';

describe('ControlsRadioGroup', () => {

    describe('render', () => {

        it('should render properly', () => {
            const component = shallow(<ControlsRadioGroup />);
            expect(toJSON(component)).toMatchSnapshot();
        });

        it('should render properly when control is TRANSLATE_CONTROL', () => {
            const component = shallow(<ControlsRadioGroup control={TRANSLATE_CONTROL} />);
            expect(toJSON(component)).toMatchSnapshot();
        });

        it('should render properly when control is ROTATE_CONTROL', () => {
            const component = shallow(<ControlsRadioGroup control={ROTATE_CONTROL} />);
            expect(toJSON(component)).toMatchSnapshot();
        });

        it('should render properly when control is SCALE_CONTROL', () => {
            const component = shallow(<ControlsRadioGroup control={SCALE_CONTROL} />);
            expect(toJSON(component)).toMatchSnapshot();
        });
    });

    describe('behaviour', () => {
        
        it('onTransformControlChange', () => {
            const spy = sinon.spy();
            const component = shallow(<ControlsRadioGroup onTransformControlChange={spy} />);

            component.find('.controls-settings-radio-group').simulate('change');

            expect(spy.called).toBe(true);
        });
    });
});