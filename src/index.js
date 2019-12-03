// this is what the app does without Firebase
// 1. Start in Firebase console
// 2. Copy Firebase config
// 3. Have App component be totally blank (create from scratch)
// 4. Show presentational components
// 5. Create App component

// Set S,M,L goal for live demo
// remind that the pressure is on

import React from 'react';
import ReactDOM from 'react-dom';
// will things break if i get rid of this?
import * as serviceWorker from './serviceWorker';
import './styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
