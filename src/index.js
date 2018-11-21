import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

const renderApp = (Component) => {
    render(
      <Provider store={store}>
        <Component />
      </Provider>,
      document.getElementById('root')
    )
}

window.addEventListener('load', () => {
    renderApp(App);
});

if (module.hot) {
    module.hot.accept('./components/App.js', function() {
        console.log('Accepting the updated printMe module!');
        const nextApp = require('./components/App').default;
        renderApp(nextApp);
    })
}
