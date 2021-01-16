import React from 'react';
import { Button } from 'antd';

const Footer = ({
        onCancel = f => f,
        onConfirm = f => f,
        canCancel = false,
        loading = false
    }) => (
    <div>
        { canCancel &&
            <Button
                onClick={onCancel}
                className='modal-btn'
                key="cancel">
                Cancel
            </Button>
        }
        <Button
            key="ok"
            onClick={onConfirm}
            loading={loading}
            className='modal-btn confirm'
            type="primary">
            Ok
        </Button>
    </div>
);

export default Footer;
