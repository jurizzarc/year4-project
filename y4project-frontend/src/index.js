import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as themes from './theme/themes.json';
import { setToLS } from './utils/storage';

// Gets theme information from themes.json and stores it to the localStorage 
const Index = () => {
    setToLS('all-themes', themes.default);
    return (
        <App />
    );
}

ReactDOM.render(
    <Index />, 
    document.getElementById('root')
);