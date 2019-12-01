import React, { useState, Suspense } from 'react';
import TermSelector from './TermSelector';

const RoadList = React.lazy(() => import('./RoadList'));

export default function App() {
  const [term, setTerm] = useState('all');

  return (
    <div className="overflow-hidden max-h-screen max-w-xl m-auto">
      <TermSelector value={term} onChange={setTerm} />
      <div className="overflow-scroll border-collapse h-full">
        <Suspense fallback="loading bundles...">
          <RoadList term={term} />
        </Suspense>
      </div>
    </div>
  );
}
