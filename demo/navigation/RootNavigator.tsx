import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TNode } from '@native-html/transient-render-engine';
import { Snackbar } from 'react-native-paper';
import SourceScreen from '../screens/SourceScreen';
import TTreeContextProvider from '../state/TTreeContextProvider';
import TTreeScreen from '../screens/TTreeScreen';
import LegacyContext from '../state/LegacyContext';
import ToggleLegacyContext from '../state/ToggleLegacyContext';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [legacyMode, setLegacyMode] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [ttree, setTTree] = React.useState<TNode | null>(null);
  React.useEffect(() => {
    setSnackbarVisible(true);
    const timeout = setTimeout(() => setSnackbarVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, [legacyMode]);
  const memoizedSetUseLegacy = React.useCallback(
    () => setLegacyMode((s) => !s),
    []
  );
  const memoizedTTreeContext = React.useMemo(() => ({ ttree, setTTree }), [
    ttree,
    setTTree
  ]);
  return (
    <TTreeContextProvider value={memoizedTTreeContext}>
      <ToggleLegacyContext.Provider value={memoizedSetUseLegacy}>
        <LegacyContext.Provider value={legacyMode}>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="source"
              options={{ title: 'HTML Source' }}
              component={SourceScreen}
            />
            <Stack.Screen
              name="ttree"
              options={{ title: 'Transient Render Tree' }}
              component={TTreeScreen}
            />
          </Stack.Navigator>
          <Snackbar visible={snackbarVisible} onDismiss={() => void 0}>
            {legacyMode ? 'Legacy (v5.x) enabled.' : 'Foundry (v6.x) enabled'}
          </Snackbar>
        </LegacyContext.Provider>
      </ToggleLegacyContext.Provider>
    </TTreeContextProvider>
  );
}
