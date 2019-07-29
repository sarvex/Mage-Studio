import React from 'react';
import { shallow } from 'enzyme';

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

        it.todo('should call hideModal when dismissing modal');
    });
});
