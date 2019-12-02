import React from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { MostPopularRoadBlurb } from './display';

export default function MostPopularRoad() {
  const firestore = useFirestore();
  const mostPopularRoadRef = firestore()
    .collection('roads')
    .orderBy('votes', 'desc')
    .limit(1);
  const mostPopularRoads = useFirestoreCollectionData(mostPopularRoadRef);
  const mostPopularRoad = mostPopularRoads[0];

  return (
    <MostPopularRoadBlurb
      roadName={mostPopularRoad.name}
      stateName={mostPopularRoad.state}
      votes={mostPopularRoad.votes}
    />
  );
}
