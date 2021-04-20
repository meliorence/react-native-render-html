export default function groupBy<T, K extends keyof T>(xs: Array<T>, key: K) {
  return xs.reduce(function (rv, x) {
    //@ts-ignore
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {} as T[K] extends string ? Record<T[K], Array<T>> : never);
}
