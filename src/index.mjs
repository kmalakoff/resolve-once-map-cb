import resolveOnce from 'resolve-once-cb';

export default function resolveOnceMap(fn) {
  const resolvers = {};

  return (key, _callback) => {
    if (!resolvers[key]) {
      resolvers[key] = resolveOnce((cb) => {
        try {
          return fn(key, cb);
        } catch (err) {
          return cb(err);
        }
      });
    }
    return resolvers[key]();
  };
}
