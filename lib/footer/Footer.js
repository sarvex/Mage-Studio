import Link from 'next/link';
import packageJSON from '../../package.json';
import React from 'react';
import { Row, Col } from 'antd';

import './footer.scss';

const Footer = () => (
    <Row className="footer">
        <Col span={12}>
            Mage Studio v{packageJSON.version}
        </Col>
    </Row>
);

export default Footer;
