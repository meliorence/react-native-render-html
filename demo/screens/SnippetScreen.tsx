import * as React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useLegacyMode } from '../state/LegacyContext';
import Snippet from '../components/Snippet';

export default function SnippetScreen({ route }: DrawerScreenProps<any>) {
  const legacyMode = useLegacyMode();
  const { snippetId } = route.params as any;
  return <Snippet useLegacy={legacyMode} exampleId={snippetId} />;
}
