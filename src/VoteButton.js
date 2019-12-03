import React from 'react';
import { Button, VoteSubmitted } from './display';
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire';

const votePrompt = 'Vote';

// TODO: LIVECODE THIS
export default function VoteButton({ roadId, onVote }) {
  return <Button prompt={votePrompt} disabled={false} onClick={onVote} />;
}
