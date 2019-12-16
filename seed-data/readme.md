# Seed data

`roads.json` contains a list of roads with React-related terms. The query run
against the
[BigQuery Public Dataset](https://cloud.google.com/bigquery/public-data/) was:

```sql
BQ public dataset
SELECT full_name, state_name
FROM `bigquery-public-data.geo_us_roads.us_national_roads`
WHERE LOWER(full_name) LIKE "%react%"
  OR LOWER(full_name) LIKE "%suspense%"
  OR LOWER(full_name) LIKE "%context%"
  OR LOWER(full_name) LIKE "%javascript%"
  OR LOWER(full_name) LIKE "%infinite loop%"
  OR LOWER(full_name) LIKE "%cache%"
  OR LOWER(full_name) LIKE "%network%"
  OR LOWER(full_name) LIKE "%hooks%"
```

To seed a Firestore database with this data, place a service account config in a
new file called `service-account.json`, set `databaseURL` in `seed.js`, and run
`node seed.js` from the command line.
