import React from 'react';
import ErrorPage from '../app/ErrorPage';

class Error extends React.Component {

  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <ErrorPage />
    );
  }
}

export default Error;
