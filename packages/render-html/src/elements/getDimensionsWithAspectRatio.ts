export default function getDimensionsWithAspectRatio(
  width: number | null,
  height: number | null,
  aspectRatio: number | undefined
) {
  return {
    width: width ?? (aspectRatio && height ? height * aspectRatio : null),
    height: height ?? (aspectRatio && width ? width / aspectRatio : null)
  };
}
