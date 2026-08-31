import assert from 'assert';
import resolveOnceMap from 'resolve-once-map-cb';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof resolveOnceMap, 'function');
  });
});
