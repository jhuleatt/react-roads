import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles.css';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase-config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
