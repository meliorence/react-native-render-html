export default function numOfCharsInPrefix(length: number, base: number) {
  let digits: number = 0;
  while (length > 1) {
    length /= base;
    digits++;
  }
  return digits;
}
