import type { JSONOutput } from 'typedoc';
import { usePluginData } from '@docusaurus/useGlobalData';

export default function useReflectionIndex() {
  return usePluginData('doc-docusaurus-typedoc-plugin') as Record<
    number,
    JSONOutput.DeclarationReflection
  >;
}
