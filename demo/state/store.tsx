import create from 'zustand';
import { SnippetId } from '../snippets';
import { TNode } from '@native-html/transient-render-engine';

interface State extends Record<string | symbol | number, unknown> {
  legacyMode: boolean;
  selectedSnippetId: SnippetId;
  ttreeRegistry: Partial<Record<SnippetId, TNode>>;
  htmlRegistry: Partial<Record<SnippetId, string>>;
  // Actions
  setSelectedSnippetId: (snippetId: SnippetId) => void;
  toggleLegacyMode: () => void;
  setSnippetTTree: (snippetId: SnippetId, ttre: TNode) => void;
  setSnippetHTML: (snippetId: SnippetId, html: string) => void;
}

const useStore = create<State>((set) => {
  return {
    legacyMode: false,
    selectedSnippetId: 'whitespace',
    ttreeRegistry: {},
    htmlRegistry: {},
    // Actions
    toggleLegacyMode: () => set((s) => ({ legacyMode: !s.legacyMode })),
    setSelectedSnippetId: (selectedSnippetId: SnippetId) =>
      set((s) => {
        return s.selectedSnippetId !== selectedSnippetId
          ? { selectedSnippetId }
          : {};
      }),
    setSnippetTTree: (snippetId: SnippetId, ttree: TNode) =>
      set((s) => ({
        ttreeRegistry: { ...s.ttreeRegistry, [snippetId]: ttree }
      })),
    setSnippetHTML: (snippetId: SnippetId, html: string) =>
      set((s) => ({ htmlRegistry: { ...s.htmlRegistry, [snippetId]: html } }))
  };
});

const selectedSnippetId = (s: State) => s.selectedSnippetId;
const legacyMode = (s: State) => s.legacyMode;
const toggleLegacyMode = (s: State) => s.toggleLegacyMode;
const setSelectedSnippetId = (s: State) => s.setSelectedSnippetId;
const setSnippetTTree = (s: State) => s.setSnippetTTree;
const setSnippetHTML = (s: State) => s.setSnippetHTML;
const selectedHTML = (s: State) => s.htmlRegistry[s.selectedSnippetId];
const selectedTTree = (s: State) => s.ttreeRegistry[s.selectedSnippetId];

export const useLegacyMode = () => useStore(legacyMode);
export const useToggleLegacyMode = () => useStore(toggleLegacyMode);
export const useSelectedSnippetId = () => useStore(selectedSnippetId);
export const useSetSelectedSnippetId = () => useStore(setSelectedSnippetId);
export const useSelectedTTree = () => useStore(selectedTTree);
export const useSelectedHTML = () => useStore(selectedHTML);
export const useSetTTreeForSnippet = () => useStore(setSnippetTTree);
export const useSetHTMLForSnippet = () => useStore(setSnippetHTML);
