import resolveOnce from 'resolve-once-cb';

export default function resolveOnceMap(fn) {
  const resolvers = {};

  return (key, callback) => {
    if (!resolvers[key]) {
      resolvers[key] = resolveOnce(() => {
        try {
          return callback(null, fn(key));
        } catch (err) {
          return callback(err);
        }
      })
    }
    return resolvers[key]();
  };
}
