import React from 'react';
import { Select, Switch } from 'antd';

import { FileTextOutlined } from '@ant-design/icons';

import style from '../../../inspector.module.scss';

class Script extends React.Component {

    componentDidMount() {
        const { onScriptsMount = f => f } = this.props;

        onScriptsMount();
    }

    mapScripts = () => {
        const { list = [] } = this.props;

        return list
            .filter(script => script.type === 'script')
            .map(script => <Select.Option key={script.name}>{script.name}</Select.Option>)
    }

    handleScriptChange = (name) => {
        const { onScriptChange } = this.props;

        onScriptChange(name);
    }

    render() {
        const { onScriptSwitchChange = f => f } = this.props;

        return (
            <div className={style['inspector-block']}>
                <div className={style['inspector-block-title']}>
                    <FileTextOutlined height='8px' width='8px' className={style['inspector-block-title-label-icon']}/>
                    <span className={style['inspector-block-title-label']}>Scripts</span>
                </div>
                <div className={style['inspector-block-values']}>
                    <div className={style['inspector-property']}>
                        <label className={style['inspector-property-label']}>
                            Script
                        </label>
                        <Select
                            className={style['property-dropdown-button']}
                            size={'small'}>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Script;
