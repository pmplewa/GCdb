mongo test --eval "db.dropDatabase();"
mongoimport --db test --collection stars --drop --file stars.ndjson
mongo test --eval "db.stars.createIndex({ position: '2d' }, { min: -100, max: 100 });"
