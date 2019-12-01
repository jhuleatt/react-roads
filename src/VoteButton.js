import React, { useEffect, useState, Suspense } from 'react';
import {
  useFirestore,
  useAnalytics,
  useRemoteConfig,
  useUser,
  useFirestoreCollectionData,
  AuthCheck
} from 'reactfire';

function Button({ disabled, onClick, prompt }) {
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

  if (
    existingVotes.reduce(
      (prev, current) => prev || current.roadId === roadId,
      false
    )
  ) {
    return (
      <div className="flex items-center justify-center w-16 h-16">
        <span role="img" aria-label="vote submitted" className="text-green-700">
          +1
        </span>
      </div>
    );
  } else if (!votePrompt) {
    return null;
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
