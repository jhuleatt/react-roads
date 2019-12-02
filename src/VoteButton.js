import React, { useEffect, useState, Suspense } from 'react';
import {
  useFirestore,
  useAnalytics,
  useRemoteConfig,
  useUser,
  useFirestoreCollectionData,
  AuthCheck
} from 'reactfire';
import { Button, VoteSubmitted } from './display';

function ActiveVoteButton({ className, roadId }) {
  const user = useUser();
  const remoteConfig = useRemoteConfig();
  const [votePrompt, setVotePrompt] = useState(null);

  const firestore = useFirestore();
  const votesRef = firestore()
    .collection('users')
    .doc(user.uid)
    .collection('votes');
  const existingVotes = useFirestoreCollectionData(votesRef);
  const analytics = useAnalytics();

  useEffect(() => {
    remoteConfig()
      .ensureInitialized()
      .then(() => {
        return remoteConfig().getValue('vote_prompt');
      })
      .then(val => {
        setVotePrompt(val.asString());
      });
  }, [remoteConfig]);

  const hasVoted = existingVotes.reduce(
    (prev, current) => prev || current.roadId === roadId,
    false
  );

  if (hasVoted) {
    return <VoteSubmitted />;
  }

  const saveVote = () => {
    analytics().logEvent('road_vote', { vote_prompt: votePrompt });

    const ref = firestore()
      .collection('roads')
      .doc(roadId);

    firestore().runTransaction(transaction =>
      transaction
        .get(ref)
        .then(roadDoc => {
          if (!roadDoc.exists) {
            throw new Error(`Road ${roadId} does not exist`);
          }

          const newVoteCount = roadDoc.data().votes
            ? roadDoc.data().votes + 1
            : 1;
          return transaction.update(ref, { votes: newVoteCount });
        })
        .catch(e => {
          console.log(e);
        })
    );

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('votes')
      .add({ roadId });
  };

  return <Button prompt={votePrompt} disabled={false} onClick={saveVote} />;
}

export default function VoteButton({ roadId }) {
  return (
    <Suspense fallback={null}>
      <AuthCheck fallback={null}>
        <ActiveVoteButton roadId={roadId} />
      </AuthCheck>
    </Suspense>
  );
}
