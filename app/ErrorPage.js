import React from 'react';
import { Result, Button } from 'antd';
import Header from '../lib/header/Header';
import Footer from '../lib/footer/Footer';

import '../lib/style.scss';

const ErrorPage = () => (
    <div className='app'>
        <Header showMenu={false} />
        <Result
            className='main-container'
            status="500"
            title="500"
            subTitle="Sorry, the server is wrong."
            extra={
                <Button type="primary">Back Home</Button>
            }/>
        <Footer />
    </div>
);

export default ErrorPage;
