import assert from 'assert';
import resolveOnceMap from 'resolve-once-map-cb';

describe('exports .ts', () => {
  it('default', () => {
    assert.equal(typeof resolveOnceMap, 'function');
  });
});
