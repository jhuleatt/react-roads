import React from 'react';

export function AppContainer({ children }) {
  return (
    <div className="overflow-hidden h-screen flex flex-col max-w-xl m-auto bg-white">
      <div className="px-4 py-2 bg-blue-900 text-blue-100 text-2xl">
        <h1>Search U.S. Roads for React terms</h1>
      </div>
      {children}
    </div>
  );
}

export function MainContents({ children }) {
  return (
    <div className="overflow-scroll border-collapse flex-1 shadow-inner">
      {children}
    </div>
  );
}

export function Loading({ term }) {
  return (
    <div className="w-full p-8">
      <span className="text-center font-bold text-2xl">
        Loading roads in the United States whose names contain{' '}
        <span className="underline">{term}</span>...
      </span>
    </div>
  );
}

export function BottomBar({ children }) {
  return (
    <div className="h-20 w-full bg-pink-300 p-4 flex items-center">
      {children}
    </div>
  );
}

export function Select({ value, onChange, disabled, values }) {
  return (
    <div className="inline-block relative w-full">
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
        className="w-full appearance-none rounded-none bg-blue-200 h-16 text-xl text-center px-4 py-2 pr-8"
      >
        {values.map(term => (
          <option key={term} value={term}>
            {term}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

export function MostPopularRoadBlurb({ roadName, stateName, votes }) {
  return (
    <span>
      <span className="font-bold">
        {roadName}, {stateName}
      </span>{' '}
      is the most popular road with {votes} votes.
    </span>
  );
}

export function RoadListItem({ voteButton, road }) {
  let votesBlurb;

  if (!road.votes) {
    votesBlurb = '0 votes';
  } else if (road.votes === 1) {
    votesBlurb = '1 vote';
  } else {
    votesBlurb = `${road.votes} votes`;
  }

  return (
    <div className="p-4 border border-t-0 border-blue-100 flex">
      <div className="flex-auto h-16 flex flex-col justify-center">
        <span className="font-bold text-xl flex-1">{road.name}</span>
        <span className="flex-1 align-baseline">{road.state}</span>
        <span className="font-light flex-1 align-baseline">{votesBlurb}</span>
      </div>
      {voteButton}
    </div>
  );
}

export function NoRoadsFound({ term }) {
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

export function Button({ disabled, onClick, prompt }) {
  const border = disabled ? '' : 'border-2';
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex-initial h-16 w-16 rounded-full text-blue-900 ${border}`}
    >
      {prompt}
    </button>
  );
}

export function VoteSubmitted() {
  return (
    <div className="flex items-center justify-center w-16 h-16">
      <span role="img" aria-label="vote submitted" className="text-green-700">
        +1
      </span>
    </div>
  );
}
