import React, { useState, useTransition, Suspense } from 'react';
import {
  AppContainer,
  MainContents,
  Loading,
  BottomBar,
  Select
} from './display';
import reactTerms from './terms.json';

// Lazy Load components
const RoadList = React.lazy(() => import('./RoadList'));
const MostPopularRoad = React.lazy(() => import('./MostPopularRoad'));

export default function App() {
  const [term, setTerm] = useState('suspense');
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5200
  });

  return (
    <AppContainer>
      <Select
        value={term}
        onChange={newTerm => startTransition(() => setTerm(newTerm))}
        disabled={isPending}
        values={reactTerms}
      />
      <MainContents>
        <Suspense fallback={<Loading term={term} />}>
          <RoadList term={term} />
        </Suspense>
      </MainContents>
      <BottomBar>
        <Suspense fallback={null}>
          <MostPopularRoad />
        </Suspense>
      </BottomBar>
    </AppContainer>
  );
}
