const assert = require('assert');
const resolveOnceMap = require('resolve-once-map-cb');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof resolveOnceMap, 'function');
  });
});
