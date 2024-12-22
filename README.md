## resolve-once-map-cb

Resolves a promise only once and memoizes the result in a map.

## Usage

```
const { callbackify } = require('util');
const resolveOnceMap = require('resolve-once-map-cb');
const { MongoClient } = require('mongodb');

const connection = resolveOnceMap((url, cb) => callbackify(MongoClient.connect)(url, cb));
connection('mongodb://localhost:27017/database', (err, db1) => { });
connection('mongodb://localhost:27017/database'. (err, db2) => { });
// db1 === db2

connection('mongodb://localhost:27017/database2', (err, db3) => { });
// db1 !== db3
```
