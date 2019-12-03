import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/remote-config';
import 'firebase/analytics';
import './styles.css';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: 'AIzaSyDdns7n9w-fn7wOE2Ji2_KUf9W8sYY7ALc',
  authDomain: 'react-roads.firebaseapp.com',
  databaseURL: 'https://react-roads.firebaseio.com',
  projectId: 'react-roads',
  storageBucket: 'react-roads.appspot.com',
  messagingSenderId: '316874420035',
  appId: '1:316874420035:web:9c80cfdea5179203da49f6',
  measurementId: 'G-XWBLKFD91K'
};

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
