import React from 'react';
import { Button, VoteSubmitted } from './display';
import {
  useFirestore,
  useUser,
  useFirestoreCollectionData,
  AuthCheck
} from 'reactfire';

const votePrompt = 'Vote';

function VoteButton({ roadId }) {
  const user = useUser();

  const firestore = useFirestore();
  const votesRef = firestore()
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

  const saveVote = () => {
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

          const voteCount = roadDoc.data().votes || 0;

          return transaction.update(ref, { votes: voteCount + 1 });
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

export default function VoteButtonWrapper({ roadId }) {
  return (
    <AuthCheck fallback={null}>
      <VoteButton roadId={roadId} />
    </AuthCheck>
  );
}
