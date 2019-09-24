import React from 'react';
import { Modal, Input } from 'antd';

import Footer from './footer';
import FileUploaderBox from './content/FileUploaderBox';

import './modals.scss';
import '../../lib/style.scss';

class NewFileModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    getFooter = (loading) => (
        <Footer
            loading={loading}
            onConfirm={this.handleConfirm}
        />
    );

    handleCancel = () => {
        const { onDismiss = f => f } = this.props;

        onDismiss();
    };

    handleChange = ({ target: { value = '' } }) => {
        this.setState({ value });
    };

    handleConfirm = () => {
       const { value } = this.state;
       const { onConfirm } = this.props;

       if (value) {
           onConfirm(value);
       }
    };

    render() {
        const { visible, loading, type } = this.props;
        const { value } = this.state;

        return (
            <Modal
                className='modal'
                title={'New File'}
                visible={visible}
                onCancel={this.handleCancel}
                footer={this.getFooter(loading)}>
                <div className='box row'>
                    <div className='scene-setting'>
                        <div className='setting-row'>
                            <label className='setting-label'>
                                file name
                            </label>
                            <div className='setting-input right'>
                                <Input
                                    onChange={this.handleChange}
                                    value={value}
                                    size="small"
                                    placeholder="newscript" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default NewFileModal;
