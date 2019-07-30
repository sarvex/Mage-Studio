import React from 'react';
import { shallow } from 'enzyme';

import { ModelUploadModal } from './ModelUploadModal';

const getModal = (props) => shallow(<ModelUploadModal {...props} />);

describe('ModelUploadModal', () => {

    it('should render fine', () => {
        expect(getModal()).toMatchSnapshot();
    });

    it('should have right initial state', () => {
        const component = getModal();

        expect(component.state().)
    });

    it('should call getModels on componentDidMount');

    describe('events', () => {

        it('should set the right state after selection');

        it('should set the right state after file is about to upload');

        it('should call onDismiss when the modal is cancelled');

        it('should call uploadModel when user confirms and hes trying to upload');

        it('should call loadSingleModel when user confirms selection');
    });
});