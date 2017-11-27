# A Galactic Center Stellar Database

This web interface allows browsing a database of known stars in the Galactic Center.

### Local Install

1) Download the code:
```
git clone https://github.com/pmplewa/GCdb
cd GCdb/
```
2) Install the required packages:
```
bower install
npm install
```
3) Launch the database server and rebuild the `test` database:
```
./mongod.sh &

cd data
./import.sh
```
4) Build and start the web server:
```
gulp build
npm start
```
5) Point your web browser to this URL to access the web interface:
```
http://localhost:3000/
```
