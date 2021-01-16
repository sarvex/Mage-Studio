import React from 'react';
import { shallow } from 'enzyme';
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

        it('should update the state when user tries to upload a file', () => {
            const component = shallow(<AssetUploadModal visible />);

            const fileUploader = component.find('FileUploaderBox');

            fileUploader.simulate('beforeUpload', 'filename');

            expect(component.state().file).toBe('filename');
        });
    });
});
