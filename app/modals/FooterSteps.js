import React from 'react';
import { Button } from 'antd';

const getConfirmButton = (loading, onConfirm) => (
    <Button
        key="ok"
        onClick={onConfirm}
        loading={loading}
        className='modal-btn confirm'
        type="primary">
        Ok
    </Button>
)

const getNextButton = (onNext) => (
    <Button
        onClick={onNext}
        className='modal-btn'
        key="next">
        Next
    </Button>
)

const getPreviousButton = (onPrevious) => (
    <Button
        onClick={onPrevious}
        className='modal-btn'
        key="previous">
        Previous
    </Button>
)

const FooterSteps = ({
        onNext = f => f,
        onPrevious = f => f,
        onConfirm = f => f,
        current,
        length,
        loading = false
    }) => (
    <div>
        { current > 0 && getPreviousButton(onPrevious) }
        { current < length - 1 && getNextButton(onNext) }
        { current === (length - 1) && getConfirmButton(loading, onConfirm) }
    </div>
);

export default FooterSteps;
