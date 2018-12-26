import React from 'react';
import { Switch, Icon, Checkbox, Divider } from 'antd';

const Fog = (props) => (
    <div className='scene-property'>
        <div className='label'>
            <Icon type='pushpin' theme='outlined' height='8px' width='8px' className='label-icon'/>
            <span className='label-text'>SPACE</span>
        </div>
    </div>
);

export default Fog;
