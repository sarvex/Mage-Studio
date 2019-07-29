import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import AssetUploadModal from './AssetUploadModal';

describe('AssetUploadModal', () => {

    it('should render a Modal', () => {
        const component = shallow(<AssetUploadModal visible />);

        expect(component.find('Modal')).toHaveLength(1);
    });

    it('should render a FileUploaderBox', () => {
        const component = shallow(<AssetUploadModal visible />);

        expect(component.find('FileUploaderBox')).toHaveLength(1);
    });

    describe('events', () => {

        it('should call hideModal when dismissing modal', () => {
            const spy = sinon.spy();
            const component = shallow(<AssetUploadModal
                onDismiss={spy}
                visible />);


            component.find('Modal').simulate('cancel');

            expect(spy.called).toBe(true);
        });

        // it.only('should update the state when user tries to upload a file', () => {
        //     const spy = sinon.spy();
        //     const component = shallow(<AssetUploadModal
        //         onConfirm={spy}
        //         visible />);
        //
        //     console.log(component.debug());
        //
        //     // const instance = component.instance();
        //     // const footer = shallow(instance.getFooter.call(instance));
        //     const footer = component.find('Footer');
        //
        //     footer.simulate('confirm');
        //     //
        //     // expect(spy.called).toBe(true);
        // });
        //
        // it('should call onConfirm when the user confirms the upload', () => {
        //
        // });
    });
});
