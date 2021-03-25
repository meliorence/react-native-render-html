import React from 'react';
import contentWidthContextNucleon from './contentWidthContextNucleon';

export function useNuclearContentWidth() {
  return React.useContext(contentWidthContextNucleon);
}
