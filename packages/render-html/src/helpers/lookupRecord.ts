export default function lookupRecord<T extends Record<string, any>>(
  record: T,
  key: any
): key is keyof T {
  const value = record[key];
  return !!value;
}
