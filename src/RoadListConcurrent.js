import React, { useEffect, useState } from 'react';
import { useFirestoreCollectionData, useAuth, useFirestore } from 'reactfire';
import VoteButton from './VoteButton';

function RoadListItem({ road }) {
  let votesBlurb;

  if (!road.votes) {
    votesBlurb = '0 votes';
  } else if (road.votes === 1) {
    votesBlurb = '1 vote';
  } else {
    votesBlurb = `${road.votes} votes`;
  }

  return (
    <div
      key={'suspense' + road.id}
      className="p-4 border border-t-0 border-blue-100 flex"
    >
      <div className="flex-auto h-16 flex flex-col justify-center">
        <span className="font-bold text-xl flex-1">{road.name}</span>
        <span className="flex-1 align-baseline">{road.state}</span>
        <span className="font-light flex-1 align-baseline">{votesBlurb}</span>
      </div>
      <VoteButton roadId={road.id} />
    </div>
  );
}

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
    return (
      <div className="w-full p-8">
        <span className="text-center font-bold text-2xl">
          According to the U.S. Census Bureau, there are NO roads in the United
          States with names that contain "
          <span className="underline">{term}</span>".
        </span>
      </div>
    );
  }
  return (
    <>
      {roads.map(road => (
        <RoadListItem key={road.id} road={road} />
      ))}
    </>
  );
}
