export function getStringPrefixFromIndex(
  index: number,
  baseCharcode: number,
  modulo: number
): string {
  if (index < modulo) {
    return String.fromCharCode(baseCharcode + index);
  }
  const rest = index % modulo;
  const next = (index - rest - modulo) / modulo;
  return (
    getStringPrefixFromIndex(next, baseCharcode, modulo) +
    String.fromCharCode(baseCharcode + rest)
  );
}
