import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/remote-config';
import 'firebase/analytics';
import './styles.css';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase-config';

// The setup here is more complicated than usual because ReactFire doesn't
// support Remote Config or Analytics yet.
// We're working on it in these issues:
// https://github.com/FirebaseExtended/reactfire/issues/176
// https://github.com/FirebaseExtended/reactfire/issues/175
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.remoteConfig().settings = {
    minimumFetchIntervalMillis: 100000
  };
  firebase.remoteConfig().defaultConfig = {
    vote_prompt: 'Vote'
  };
  firebase.remoteConfig().fetchAndActivate();
}

firebase.remoteConfig().fetch();

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseApp={firebase}>
    <App />
  </FirebaseAppProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
