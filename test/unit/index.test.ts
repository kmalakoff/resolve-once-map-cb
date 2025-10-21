import assert from 'assert';
import Queue from 'queue-cb';

import resolveOnceMap, { type Callback } from 'resolve-once-map-cb';

describe('resolve-once-map-cb', () => {
  it('handle success', (callback) => {
    const counters = {};
    const resolver = resolveOnceMap((key, callback) => {
      counters[key] = counters[key] || 0;
      callback(null, ++counters[key]);
    });

    const errors = [];
    const results = [];
    function collect(key, cb) {
      resolver(key, (err, value) => {
        err ? errors.push(err) : results.push(value);
        cb();
      });
    }

    const queue = new Queue();
    queue.defer(collect.bind(null, 'one'));
    queue.defer(collect.bind(null, 'one'));
    queue.defer(collect.bind(null, 'two'));
    queue.await((err) => {
      assert.ok(!err);
      assert.ok(errors.length === 0);
      assert.equal(results.length, 3);
      results.forEach((result) => {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one', (err, result) => {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.deepEqual(counters, { one: 1, two: 1 });
        callback();
      });
    });
  });

  it('handle failure', (callback) => {
    const counters = {};
    const resolver = resolveOnceMap((key, callback) => {
      counters[key] = counters[key] || 0;
      ++counters[key];
      callback(new Error('Failed'));
    });

    const errors = [];
    const results = [];
    function collect(key, cb) {
      resolver(key, (err, value) => {
        err ? errors.push(err) : results.push(value);
        cb();
      });
    }

    const queue = new Queue();
    queue.defer(collect.bind(null, 'one'));
    queue.defer(collect.bind(null, 'one'));
    queue.defer(collect.bind(null, 'two'));
    queue.await((err) => {
      assert.ok(!err);
      assert.ok(errors.length === 3);
      assert.equal(results.length, 0);
      results.forEach((result) => {
        assert.equal(result, 1);
      });
      assert.deepEqual(counters, { one: 1, two: 1 });

      resolver('one', (err) => {
        assert.deepEqual(counters, { one: 1, two: 1 });
        assert.equal(err.message, 'Failed');
        callback();
      });
    });
  });
  describe('errors', () => {
    it('missing callback', (done) => {
      const counters = {};
      const resolver = resolveOnceMap<number>((key, callback) => {
        counters[key] = counters[key] || 0;
        callback(null, ++counters[key]);
      });
      try {
        resolver(undefined as string, undefined as Callback<number>);
        assert.ok(false, 'should not get here');
      } catch (err) {
        assert.ok(err.message.indexOf('missing callback') >= 0);
        done();
      }
    });
  });
});
