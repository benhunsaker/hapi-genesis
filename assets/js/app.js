import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

export const InitApp = () => {

    const rootElement = document.getElementById('root');

    if (rootElement) {
        ReactDOM.render(<App />, rootElement);
    }
};

export default InitApp;

InitApp();
