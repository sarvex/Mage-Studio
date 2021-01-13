import Link from 'next/link';
import packageJSON from '../../package.json';
import React from 'react';
import { Row, Col } from 'antd';

import style from './footer.module.scss';

const Footer = () => (
    <Row className={style.footer}>
        <Col span={12}>
            Mage Studio v{packageJSON.version}
        </Col>
    </Row>
);

export default Footer;
