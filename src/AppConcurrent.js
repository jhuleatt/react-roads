import React, { useState, useTransition, Suspense } from 'react';
import TermSelector from './TermSelector';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const RoadListSuspense = React.lazy(() => import('./RoadListConcurrent'));

function Spinner({ term }) {
  return (
    <div className="w-full p-8">
      <span className="text-center font-bold text-2xl">
        Loading roads in the United States whose names contain{' '}
        <span className="underline">{term}</span>...
      </span>
    </div>
  );
}

function MostPopular() {
  const firestore = useFirestore();
  const mostPopularRoadRef = firestore()
    .collection('roads')
    .orderBy('votes', 'desc')
    .limit(1);
  const mostPopularRoads = useFirestoreCollectionData(mostPopularRoadRef);
  const mostPopularRoad = mostPopularRoads[0];
  const { name, state: stateName, votes } = mostPopularRoad;

  return (
    <span>
      <span className="font-bold">
        {name}, {stateName}
      </span>{' '}
      is the most popular road with {votes} votes.
    </span>
  );
}

export default function AppConcurrent() {
  const [term, setTerm] = useState('suspense');
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5200
  });

  return (
    <div className="overflow-hidden h-screen flex flex-col max-w-xl m-auto bg-white">
      <div className="px-4 py-2 bg-blue-900 text-blue-100 text-2xl">
        <h1>Search U.S. Roads for React terms</h1>
      </div>
      <TermSelector
        value={term}
        onChange={newTerm => startTransition(() => setTerm(newTerm))}
        disabled={isPending}
      />
      <div className="overflow-scroll border-collapse flex-1 shadow-inner">
        <Suspense fallback={<Spinner term={term} />}>
          <RoadListSuspense term={term} />
        </Suspense>
      </div>
      <div className="h-20 w-full bg-pink-300 p-4 flex items-center">
        <Suspense fallback={null}>
          <MostPopular />
        </Suspense>
      </div>
    </div>
  );
}
