import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import NewFileModal from './NewFileModal';

const defaultProps = {
    config: {}
};

const getModal = (props) => shallow(<NewFileModal {...defaultProps} {...props} />);

describe('NewFileModal', () => {

    it('should render fine', () => {
        expect(toJSON(getModal())).toMatchSnapshot();
    });

    it('should call onDismiss when user tries to dismiss modal', () => {
        const onDismiss = sinon.spy();
        const modal = getModal({ onDismiss });

        modal.simulate('cancel');

        expect(onDismiss.called).toBe(true);
    });
});
