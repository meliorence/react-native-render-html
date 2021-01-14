/* eslint-disable react-hooks/rules-of-hooks */
import React, { PropsWithChildren } from 'react';

const OlNestLevel = React.createContext<number>(0);
const UlNestLevel = React.createContext<number>(0);

export function useListNestLevel(listType: 'ol' | 'ul') {
  return listType === 'ol'
    ? React.useContext(OlNestLevel)
    : React.useContext(UlNestLevel);
}

export interface NestLevelProviderProps {
  listType: 'ol' | 'ul';
  level: number;
}

export default function NestLevelProvider({
  listType,
  level,
  children
}: PropsWithChildren<NestLevelProviderProps>) {
  if (listType === 'ol') {
    return (
      <OlNestLevel.Provider value={level}>{children}</OlNestLevel.Provider>
    );
  }
  return <UlNestLevel.Provider value={level}>{children}</UlNestLevel.Provider>;
}
