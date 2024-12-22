import resolveOnce from 'resolve-once-cb';

export default function resolveOnceMap(fn) {
  const resolvers = {};

  return (key, callback) => {
    const resolver = resolvers[key];
    if (resolver) return resolver(callback);
    resolvers[key] = resolveOnce(() => {
      try {
        return callback(null, fn(key));
      } catch (err) {
        return callback(err);
      }
    });
  };
}
