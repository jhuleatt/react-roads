import React from 'react';

const terms = [
  'all',
  'react',
  'suspense',
  'context',
  'javascript',
  'infinite loop',
  'cache',
  'network',
  'hooks'
];

export default function TermSelector({ value, onChange, disabled }) {
  return (
    <div className="inline-block relative w-full">
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
        className="w-full appearance-none rounded-none bg-blue-200 h-16 text-xl text-center px-4 py-2 pr-8"
      >
        {terms.map(term => (
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
