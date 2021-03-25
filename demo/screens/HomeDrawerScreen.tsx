import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import VersionDisplayMolecule from '../components/molecules/VersionDisplayMolecule';
import SnippetScreen from './SnippetScreen';
import snippets, { devSelectedSnippet, SnippetId } from '../snippets';
import { Platform, View } from 'react-native';
import DrawerHeader from '../components/DrawerHeader';
import { useComponentColors } from '../state/ThemeProvider';
import { Switch, List } from 'react-native-paper';
import {
  useColorScheme,
  useColorSchemeSetter
} from '../state/ColorSchemeProvider';
import { useSetSelectedSnippetId } from '../state/store';
import Lists from '../playgrounds/Lists';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

function CustomDrawerContent(props: DrawerContentComponentProps<any>) {
  const {
    backgroundColor,
    activeTintColor,
    activeBackgroundColor
  } = useComponentColors('drawer');
  const colorScheme = useColorScheme();
  const setColorScheme = useColorSchemeSetter();
  const { top } = useSafeAreaInsets();
  const swichColorModeRight = React.useCallback(
    ({ style }: any) => (
      //@ts-ignore
      <Switch
        style={style}
        value={colorScheme === 'dark'}
        onValueChange={(v) => setColorScheme(v ? 'dark' : 'light')}
      />
    ),
    [colorScheme, setColorScheme]
  );
  return (
    <>
      <View
        style={{ height: top, alignSelf: 'stretch', backgroundColor: 'gray' }}
      />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
        style={{ backgroundColor }}>
        <DrawerItemList
          {...props}
          activeTintColor={activeTintColor}
          activeBackgroundColor={activeBackgroundColor}
        />
      </DrawerContentScrollView>
      <List.Section>
        <List.Item title="Dark Mode?" right={swichColorModeRight} />
      </List.Section>
      <VersionDisplayMolecule />
    </>
  );
}

const initialRouteName = __DEV__ ? devSelectedSnippet : 'whitespace';

export default function HomeScreen({}: StackScreenProps<any>) {
  const setSelectedSnippetId = useSetSelectedSnippetId();
  const {
    tintColor: headerTintColor,
    backgroundColor: headerBackgroundColor
  } = useComponentColors('navHeader');
  React.useEffect(() => {
    setSelectedSnippetId(initialRouteName);
  }, [setSelectedSnippetId]);
  const snippetScreens = (Object.keys(snippets) as SnippetId[]).map(
    (snippetId) => {
      return (
        <Drawer.Screen
          component={SnippetScreen}
          initialParams={{ snippetId }}
          options={{
            header: (props) => (
              <DrawerHeader snippetId={snippetId} {...props} />
            ),
            title: snippets[snippetId].name
          }}
          key={snippets[snippetId].name}
          name={snippetId}
        />
      );
    }
  );
  return (
    <Drawer.Navigator
      hideStatusBar={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: true,
        headerTitleAllowFontScaling: true,
        headerTintColor: headerTintColor,
        headerStyle: {
          backgroundColor: headerBackgroundColor
        },
        headerTitleStyle: [
          Platform.select({
            android: {
              width: '75%',
              alignItems: 'flex-start'
            }
          })
        ]
      }}>
      {snippetScreens}
      <Drawer.Screen
        component={Lists}
        options={{
          headerShown: true,
          title: 'Lists Playground'
        }}
        key={'lists'}
        name={'ListsPlayground'}
      />
    </Drawer.Navigator>
  );
}
