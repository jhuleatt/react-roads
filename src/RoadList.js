import React, { useEffect, Suspense } from 'react';
import {
  useAuth,
  useFirestore,
  useFirestoreCollectionData,
  AuthCheck
} from 'reactfire';
import { NoRoadsFound, RoadListItem } from './display';
import VoteButton from './VoteButton';

export default function RoadList({ term }) {
  const firestore = useFirestore();
  let query = firestore().collection('roads');

  if (term !== 'all') {
    query = query.where('term', '==', term);
  }

  query = query.orderBy('name');

  const roads = useFirestoreCollectionData(query, { idField: 'id' });

  const auth = useAuth();

  useEffect(() => {
    if (auth().currentUser) {
      return;
    }

    auth()
      .signInAnonymously()
      .then(() => console.log('signed in'))
      .catch(e => console.error(e));
  }, [auth]);

  if (roads.length === 0) {
    return <NoRoadsFound term={term} />;
  }

  return (
    <>
      {roads.map(road => (
        <RoadListItem
          key={road.id}
          road={road}
          voteButton={
            <AuthCheck fallback={null}>
              <Suspense fallback={null}>
                <VoteButton roadId={road.id} />
              </Suspense>
            </AuthCheck>
          }
        />
      ))}
    </>
  );
}
