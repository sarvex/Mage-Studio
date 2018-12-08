import React from 'react';
import { version, Button } from 'antd';

const App = () => (
  <div>
    <h1>ad</h1>
    <p>Current antd version: {version}</p>
    <p>Please fork this codesandbox to reproduce your issue.</p>
    <p>请 fork 这个链接来重现你碰到的问题。</p>
    <Button type="primary">Hello</Button>
  </div>
)

export default App;
