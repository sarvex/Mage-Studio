import React from 'react';
import { Icon } from 'antd';

import './inspectorelements.scss';

const EmptyInspector = () => (
    <div className='inspector-empty'>
        <p>
            <Icon height='64px' width='64px' className="inspector-empty-icon" type="search" />
            Please select an element from the Scene, Hierarchy or Assets box.
        </p>
    </div>
);

export default EmptyInspector;
