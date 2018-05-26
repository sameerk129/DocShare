import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
// import App from './App';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'draft-js/dist/Draft.css';
import './css/index.css';
import './css/textEditor.css';


ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
