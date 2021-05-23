import useReflectionIndex from './useReflectionIndex';

export default function useReflection(reflectionId: number) {
  const index = useReflectionIndex();
  return index[reflectionId];
}
