# resolve-once-map-cb

Run a callback-based operation once per string key and memoize each result, including errors.

```sh
npm install resolve-once-map-cb
```

## Usage

```js
const resolveOnceMap = require('resolve-once-map-cb');

const resolveValue = resolveOnceMap((key, cb) => cb(null, { key }));
resolveValue('one', (err, value1) => {
  if (err) throw err;
  resolveValue('one', (err, value2) => {
    if (err) throw err;
    console.log(value1 === value2); // true

    resolveValue('two', (err, value3) => {
      if (err) throw err;
      console.log(value1 === value3); // false
    });
  });
});
```
