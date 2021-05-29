import create from 'zustand';

interface State extends Record<string | symbol | number, unknown> {
  legacyMode: boolean;
  // Actions
  toggleLegacyMode: () => void;
}

const useStore = create<State>((set) => {
  return {
    legacyMode: false,
    // Actions
    toggleLegacyMode: () => set((s) => ({ legacyMode: !s.legacyMode }))
  };
});

const legacyMode = (s: State) => s.legacyMode;
const toggleLegacyMode = (s: State) => s.toggleLegacyMode;

export const useLegacyMode = () => useStore(legacyMode);
export const useToggleLegacyMode = () => useStore(toggleLegacyMode);
