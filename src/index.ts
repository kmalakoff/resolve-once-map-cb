import resolveOnce, { type Callback } from 'resolve-once-cb';

export type { Callback } from 'resolve-once-cb';
export type Resolver<T> = (key: string, callback: Callback<T>) => void;

export default function resolveOnceMap<T extends string | number | symbol>(fn: Resolver<T>): Resolver<T> {
  const resolvers = {} as Record<T, Callback<T>>;

  return (key: string, callback: Callback<T>) => {
    if (typeof callback !== 'function') throw new Error('resolve-once-map-cb missing callback');
    if (!resolvers[key]) {
      resolvers[key] = resolveOnce<T>((cb) => {
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
