import React from 'react';
import { Upload, Icon } from 'antd';

import './modalcontent.scss';

const FileUploaderBox = (props) => {
    const { action, name, onBeforeUpload, className = ''} = props;
    const componentClassName = `content file-uploader-box ${className}`;

    return (
        <div className={componentClassName}>
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

export default FileUploaderBox;
