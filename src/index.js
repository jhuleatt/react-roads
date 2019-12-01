import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/remote-config';
import 'firebase/analytics';

import AppConcurrent from './AppConcurrent';
import './styles.css';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: 'AIzaSyAukvAfJFqu8GArLqOk6I6Y2RJSsbcbj28',
  authDomain: 'jeff-suspense-demo.firebaseapp.com',
  databaseURL: 'https://jeff-suspense-demo.firebaseio.com',
  projectId: 'jeff-suspense-demo',
  storageBucket: 'jeff-suspense-demo.appspot.com',
  messagingSenderId: '87986548732',
  appId: '1:87986548732:web:3e0e59070191983a7dcc79',
  measurementId: 'G-PCBCN7M3ZH'
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.remoteConfig().settings = {
    minimumFetchIntervalMillis: 100000
  };
  // firebase.remoteConfig().defaultConfig = {
  //   welcome_message: 'Welcome'
  // };
  firebase.remoteConfig().fetchAndActivate();
}

firebase.remoteConfig().fetch();

// const AppToUse = App;
const AppToUse = AppConcurrent;

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseApp={firebase}>
    <AppToUse />
  </FirebaseAppProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
