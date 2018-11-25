import React from 'react';
import Layout from '../components/Layout';
import { version, Button } from 'antd';
import "antd/dist/antd.min.css";


const Index = () => (
  <div>
    <Layout>
        <h1>ad</h1>
        <p>Current antd version: {version}</p>
        <Button type="primary">Hello</Button>
    </Layout>
  </div>
);

export default Index;
