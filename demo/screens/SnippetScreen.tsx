import * as React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Snippet from '../components/Snippet';
import { useLegacyMode } from '../state/store';

export default function SnippetScreen({ route }: DrawerScreenProps<any>) {
  const legacyMode = useLegacyMode();
  const { snippetId } = route.params as any;
  return <Snippet useLegacy={legacyMode} snippetId={snippetId} />;
}
