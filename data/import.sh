mongo test --eval "db.dropDatabase();"
mongoimport --db test --collection stars --drop --jsonArray --file stars.json
mongo test --eval "db.stars.createIndex({ position: '2d' }, { min: -100, max: 100 });"
