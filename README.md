# ⚛️🚗 React Roads

[ReactFire](https://github.com/FirebaseExtended/reactfire) demo presented at
React Day Berlin 2019 in the talk:
[Modern React apps with Hooks, Suspense, Context, and Firebase](https://www.youtube.com/watch?v=Mi9aKDcpRYA)

The list of roads is from the United States Census Bureau's US Roads
[public BigQuery dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=geo_us_roads&page=dataset).

## Setup

1. Create a Firebase Project and enable Google Analytics for Firebase
1. Enable Firestore and Anonymous Authentication
1. Run the [seed data script](/seed-data)
1. Add your firebase config in a new file: `src/firebase-config.js`
1. Run `yarn` and `yarn start` to start the development server

## Deployment

1. Run `firebase init` in a terminal
1. Run `yarn build`
1. Run `firebase deploy`
