import React, { PropsWithChildren, useState } from 'react';

export interface ColorSchemeState {
  colorScheme: 'light' | 'dark';
  setColorScheme: (colorScheme: 'light' | 'dark') => void;
}

const ColorSchemeContext = React.createContext<ColorSchemeState>({
  colorScheme: 'light',
  setColorScheme: () => {}
});

export function useColorScheme() {
  return React.useContext(ColorSchemeContext).colorScheme;
}

export function useColorSchemeSetter() {
  return React.useContext(ColorSchemeContext).setColorScheme;
}

export default function ColorSchemeProvider({
  initialColorScheme,
  children
}: PropsWithChildren<{
  initialColorScheme: ColorSchemeState['colorScheme'];
}>) {
  const [colorScheme, setColorScheme] = useState<
    ColorSchemeState['colorScheme']
  >(initialColorScheme);
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
