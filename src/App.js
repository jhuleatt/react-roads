import React, { useEffect, useState, useTransition } from 'react';
import {
  preloadAnalytics,
  preloadAuth,
  preloadFirestore,
  preloadRemoteConfig,
  SuspenseWithPerf,
  useFirebaseApp
} from 'reactfire';
import {
  AppContainer,
  BottomBar,
  Loading,
  MainContents,
  Select
} from './display';
import reactTerms from './terms.json';

function preloadLibraries(firebaseApp) {
  preloadAnalytics({ firebaseApp });
  preloadRemoteConfig({
    firebaseApp,
    setup: remoteConfig => {
      remoteConfig().settings = {
        minimumFetchIntervalMillis: 10000,
        fetchTimeoutMillis: 10000
      };
      remoteConfig().defaultConfig = {
        vote_prompt: 'Vote'
      };
      return remoteConfig().fetchAndActivate();
    }
  });
  preloadAuth({ firebaseApp });
  preloadFirestore({
    firebaseApp,
    setip: firestore => {
      return firestore().enablePersistence();
    }
  });
}

// Lazy Load components
const RoadList = React.lazy(() => import('./RoadList'));
const MostPopularRoad = React.lazy(() => import('./MostPopularRoad'));

export default function App() {
  const firebaseApp = useFirebaseApp();
  useEffect(() => preloadLibraries(firebaseApp), [firebaseApp]);
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
        <SuspenseWithPerf
          fallback={<Loading term={term} />}
          traceId={'load-road-list'}
        >
          <RoadList term={term} />
        </SuspenseWithPerf>
      </MainContents>
      <BottomBar>
        <SuspenseWithPerf fallback={null} traceId={'load-leaderboard'}>
          <MostPopularRoad />
        </SuspenseWithPerf>
      </BottomBar>
    </AppContainer>
  );
}
