import resolveOnce from 'resolve-once-cb';

export default function resolveOnceMap(fn) {
  const resolvers = {};

  return (key, callback) => {
    if (typeof callback !== 'function') throw new Error('resolve-once-map-cb missing callback');
    if (!resolvers[key]) {
      resolvers[key] = resolveOnce((cb) => {
        try {
          return fn(key, cb);
        } catch (err) {
          return cb(err);
        }
      });
    }
    return resolvers[key](callback);
  };
}
