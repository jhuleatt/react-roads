import React from 'react';
import {
  AuthCheck,
  SuspenseWithPerf,
  useAnalytics,
  useFirestore,
  useFirestoreCollectionData,
  useRemoteConfigString,
  useUser
} from 'reactfire';
import { Button, VoteSubmitted } from './display';

function VoteButton({ roadId }) {
  const { FieldValue } = useFirestore;
  const db = useFirestore();
  const analytics = useAnalytics();
  const user = useUser();
  const votePrompt = useRemoteConfigString('vote_prompt');

  const saveVote = async () => {
    analytics.logEvent('road_vote', { vote_prompt: votePrompt });

    const ref = db.collection('roads').doc(roadId);

    const increment = FieldValue.increment(1);

    await ref.update({ votes: increment });
    await db
      .collection('users')
      .doc(user.uid)
      .collection('votes')
      .add({ roadId });
  };

  return <Button prompt={votePrompt} disabled={false} onClick={saveVote} />;
}

function VoteIndicator({ roadId }) {
  const user = useUser();
  const votesRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('votes');

  const existingVotes = useFirestoreCollectionData(votesRef);

  const hasVoted = existingVotes.reduce(
    (prev, current) => prev || current.roadId === roadId,
    false
  );

  if (hasVoted) {
    return <VoteSubmitted />;
  }

  return <VoteButton roadId={roadId} />;
}

export default function VoteIndicatorWrapper({ roadId }) {
  return (
    <SuspenseWithPerf fallback={null} traceId={'load-vote-indicator'}>
      <AuthCheck fallback={null}>
        <VoteIndicator roadId={roadId} />
      </AuthCheck>
    </SuspenseWithPerf>
  );
}
