import React from 'react';
import { Upload, Icon } from 'antd';

import './modalcontent.scss';

const ModelUploader = (props) => {
    const { action, name, onBeforeUpload } = props;
    return (
        <div className='content model-uploader'>
            <Upload.Dragger
                action={action}
                name={name}
                beforeUpload={onBeforeUpload}>
                <p>
                    <Icon type="upload" />
                </p>
                <p>Click or drag file to this area to upload</p>
            </Upload.Dragger>
        </div>
    );
};

export default ModelUploader;
