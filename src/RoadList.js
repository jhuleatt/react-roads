import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

export default function RoadList({ term }) {
  const [isLoaded, setLoaded] = useState(false);
  const [roads, setRoads] = useState([]);

  useEffect(() => {
    let query = firebase.firestore().collection('roads');

    if (term !== 'all') {
      query = query.where('term', '==', term);
    }

    query = query.orderBy('name').limit(20);

    setLoaded(false);
    return query.onSnapshot(snap => {
      setRoads(
        snap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      );
      setLoaded(true);
    });
  }, [term]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {roads.map(road => (
        <li key={road.id}>
          {road.name}, {road.state}
        </li>
      ))}
    </ul>
  );
}
