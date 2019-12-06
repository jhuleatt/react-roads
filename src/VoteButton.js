import React from 'react';
import { Button } from './display';

const votePrompt = 'Vote';

// TODO: LIVECODE THIS
export default function VoteButton({ roadId, onVote }) {
  return <Button prompt={votePrompt} disabled={false} onClick={onVote} />;
}
