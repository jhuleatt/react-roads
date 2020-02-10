import React, { useState, useTransition, Suspense, useEffect } from 'react';
import {
  AppContainer,
  MainContents,
  Loading,
  BottomBar,
  Select
} from './display';
import reactTerms from './terms.json';
import {
  preloadAnalytics,
  preloadFirestore,
  preloadAuth,
  preloadRemoteConfig,
  useFirebaseApp
} from 'reactfire';

function preloadLibraries(firebaseApp) {
  preloadAnalytics(firebaseApp);
  preloadRemoteConfig(firebaseApp, remoteConfig => {
    remoteConfig().settings = {
      minimumFetchIntervalMillis: 10000,
      fetchTimeoutMillis: 10000
    };
    remoteConfig().defaultConfig = {
      vote_prompt: 'Vote'
    };
    return remoteConfig().fetchAndActivate();
  });
  preloadAuth(firebaseApp);
  preloadFirestore(firebaseApp, firestore => {
    return firestore().enablePersistence();
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
