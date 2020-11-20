import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavLightTheme,
  DarkTheme as NavDarkTheme,
  useTheme,
  useNavigation
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerScreenProps
} from '@react-navigation/drawer';
import {
  createStackNavigator,
  StackScreenProps
} from '@react-navigation/stack';
import { ColorSchemeName, Platform, View } from 'react-native';
import { TNode, tnodeToString } from '@native-html/transient-render-tree';
import { Appbar, Snackbar } from 'react-native-paper';
import snippets from './snippets';
import Snippet from './Snippet';
import SourceRenderer from '../components/SourceRenderer';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme
} from 'react-native-paper';
import merge from 'deepmerge';
import { memo } from 'react';
import TTreeContextProvider, { useTTree } from '../state/TTreeContextProvider';
import { MonoText } from '../components/StyledText';
import BidirectionalScrollView from '../components/BidirectionalScrollView';

const CombinedLightTheme = merge(PaperLightTheme, NavLightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavDarkTheme);

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <PaperProvider
      theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme}>
      <NavigationContainer
        // linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

const ignoredSnippets = [
  'trickyStuff',
  'invalidHTML',
  'ignoringTagsAndStyles',
  'customHTMLTags',
  'parseRemoteHTML',
  'iframes',
  'alteration',
  'inlineCustomTags'
];

if (!__DEV__) {
  ignoredSnippets.push('test');
}

function SnippetScreen({ route }: DrawerScreenProps<any>) {
  const legacyMode = useLegacyMode();
  const { snippetId } = route.params as any;
  return <Snippet useLegacy={legacyMode} exampleId={snippetId} />;
}

const LegacyContext = React.createContext(false);
const ToggleLegacyContext = React.createContext(() => {});

const useLegacyMode = () => React.useContext(LegacyContext);
const useToggleLegacyMode = () => React.useContext(ToggleLegacyContext);

function TTreeScreen() {
  const { ttree } = useTTree();
  return (
    <BidirectionalScrollView padding={5}>
      <MonoText style={{ fontSize: 12 }}>
        {ttree && tnodeToString(ttree)}
      </MonoText>
    </BidirectionalScrollView>
  );
}

const HeaderRight = memo(function HeaderRight({ tintColor, snippetId }: any) {
  const toggleUseLegacy = useToggleLegacyMode();
  const navigation = useNavigation();
  const legacyMode = useLegacyMode();
  return (
    <View
      style={{
        flexDirection: 'row'
      }}>
      <Appbar.Action
        icon="alpha-l-circle"
        color={legacyMode ? 'red' : tintColor}
        style={{ marginHorizontal: 0 }}
        onPress={toggleUseLegacy}
      />
      <Appbar.Action
        icon="xml"
        color={tintColor}
        style={{ marginHorizontal: 0 }}
        onPress={() =>
          navigation.navigate('source', snippets[snippetId].html as any)
        }
      />
      <Appbar.Action
        icon="file-tree"
        color={tintColor}
        style={{ marginHorizontal: 0 }}
        onPress={() => navigation.navigate('ttree')}
      />
    </View>
  );
});

function HomeScreen({}: StackScreenProps<any>) {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      hideStatusBar={false}
      initialRouteName="Texts styles behaviour"
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerShown: true,
        headerTitleAllowFontScaling: true,
        headerTitleStyle: Platform.select({
          ios: {
            width: '75%',
            alignItems: 'flex-start'
          }
        })
      }}>
      {Object.keys(snippets)
        .filter((k) => ignoredSnippets.indexOf(k) === -1)
        .map((snippetId) => {
          return (
            <Drawer.Screen
              component={SnippetScreen}
              initialParams={{ snippetId }}
              options={{
                title: snippets[snippetId].name,
                headerRight: ({ tintColor }) => (
                  <HeaderRight tintColor={tintColor} snippetId={snippetId} />
                )
              }}
              key={snippets[snippetId].name}
              name={snippets[snippetId].name}
            />
          );
        })}
    </Drawer.Navigator>
  );
}

function RootNavigator() {
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
              component={SourceRenderer}
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
