const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');
const databaseURL = ''; /* TODO: Enter your databaseURL */
const roadsJSON = require('./roads.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

const terms = [
  'react',
  'suspense',
  'context',
  'javascript',
  'infinite loop',
  'cache',
  'network',
  'hooks'
];

function getTerm(roadName) {
  let containedTerm;
  terms.forEach(term => {
    if (roadName.toLowerCase().includes(term.toLowerCase())) {
      containedTerm = term;
    }
  });
  return containedTerm;
}

const dedupedRoads = [];

roadsJSON.reduce((accumulator, currentValue) => {
  const hash = currentValue.full_name + currentValue.state_name;

  if (!accumulator.has(hash)) {
    accumulator.add(hash, currentValue);
    dedupedRoads.push(currentValue);
  }

  return accumulator;
}, new Set());

const numRoads = dedupedRoads.length;
const batches = [];
const batchSize = 400;
const numBatches = Math.ceil(numRoads / batchSize);

console.log(
  `Creating ${numBatches} batches (${numRoads} roads with batch size ${batchSize})`
);

for (var i = 0; i < numBatches; i++) {
  batches[i] = admin.firestore().batch();
}

dedupedRoads.forEach(({ full_name, state_name, road_id }, index) => {
  console.log(index);
  const batch = batches[Math.floor(index / batchSize)];
  batch.set(
    admin
      .firestore()
      .collection('roads')
      .doc(road_id),
    {
      name: full_name,
      state: state_name,
      term: getTerm(full_name),
      id: road_id
    }
  );
});

return Promise.all(batches.map(batch => batch.commit())).then(() =>
  console.log('complete')
);
