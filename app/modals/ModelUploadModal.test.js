import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { ModelUploadModal } from './ModelUploadModal';

const defaultProps = {
    config: {}
};

const getModal = (props) => shallow(<ModelUploadModal {...defaultProps} {...props} />);

describe('ModelUploadModal', () => {

    it('should render fine', () => {
        expect(getModal()).toMatchSnapshot();
    });

    it('should have right initial state', () => {
        const component = getModal();

        expect(component.state().file).toBe(false);
        expect(component.state().selection).toBe(false);
    });

    it('should call getModels on componentDidMount', () => {
        const spy = sinon.spy();
        const component = getModal({ getModels: spy });

        expect(spy.called).toBe(true);
    });

    describe('events', () => {

        it('should set the right state after selection', () => {
            const component = getModal();
            const selector = component.find('ModelsSelector');

            selector.simulate('select', 'selection');

            expect(component.state().selection).toBe('selection');
        });

        it('should set the right state after file is about to upload', () => {
            const component = getModal();
            const selector = component.find('FileUploaderBox');

            selector.simulate('beforeUpload', 'filename.js');

            expect(component.state().file).toBe('filename.js');
        });

        it('should call onDismiss when the modal is cancelled', () => {
            const onDismiss = sinon.spy();
            const component = getModal({ onDismiss });
            const modal = component.find('Modal');

            modal.simulate('cancel');

            expect(onDismiss.called).toBe(true);
        });

        it('should call uploadModel when user confirms and hes trying to upload', () => {
            const uploadModel = sinon.spy();
            const config = { project: 'test' };
            const component = getModal({ uploadModel, config });

            component.setState({ file: 'filename.js' });

            component.instance().handleConfirm();

            expect(uploadModel.calledWith('test', 'filename.js')).toBe(true);
        });

        it('should call loadSingleModel when user confirms selection', () => {
            const loadSingleModel = sinon.spy();
            const config = { project: 'test' };
            const component = getModal({ loadSingleModel, config });

            component.setState({ selection: 'filename.js' });

            component.instance().handleConfirm();

            expect(loadSingleModel.calledWith('test', 'filename.js')).toBe(true);
        });
    });
});
