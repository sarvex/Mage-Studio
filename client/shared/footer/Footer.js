import Link from 'next/link';
import packageJSON from '../../../package.json';
import React from 'react';
import { Row, Col } from 'antd';

import style from './footer.module.scss';

const Footer = () => (
    <Row className={style.footer}>
        <p className={style.name}>
            Mage Studio <span className={style.version}>v{packageJSON.version}</span>
            &nbsp; running on mage-engine <span className={style.version}>v{packageJSON.dependencies['mage-engine']}</span>
        </p>
    </Row>
);

export default Footer;
