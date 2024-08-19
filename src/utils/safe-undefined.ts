export function safeUndefined<T, R>(origin: T, target: string, tobe: string): R {
  const accessPath = target.split(".");
  let current = origin as any;

  for (const key of accessPath) {
    if (current === undefined) return tobe as R;
    current = current[key];
  }

  return current as R;
}
