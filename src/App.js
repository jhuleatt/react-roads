import React, { useState } from 'react';
import { AppContainer, RoadListItem } from './display';
import {
  FirebaseAppProvider,
  useFirestore,
  useFirestoreCollectionData
} from 'reactfire';

// load the list of roads (filtered by 1 type)
// create container for app (just css)
// how do i talk to database?
// show what the console looks like
// map through
// add onClick to RoadListItem
// after important steps: create-react-app build and deploy on firebase hosting
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

function RoadList() {
  const firestore = useFirestore();
  const query = firestore().collection('roads');

  // rename term to searchTerm
  const roads = useFirestoreCollectionData(query);

  return (
    <>
      {roads.map(road => (
        <RoadListItem road={road} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AppContainer>
        <RoadList />
      </AppContainer>
    </FirebaseAppProvider>
  );
}
