import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import VersionDisplay from '../components/VersionDisplay';
import SnippetScreen from './SnippetScreen';
import snippets, { SnippetId } from '../snippets';
import { Platform } from 'react-native';
import DrawerHeader from '../components/DrawerHeader';
import { useComponentColors } from '../state/ThemeProvider';
import { Switch, List } from 'react-native-paper';
import { useColorScheme } from '../state/ColorSchemeProvider';

const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

const devSelectedSnippet = 'test';

function CustomDrawerContent(props: DrawerContentComponentProps<any>) {
  const {
    drawer: { backgroundColor, activeTintColor, activeBackgroundColor }
  } = useComponentColors();
  const { colorScheme, setColorScheme } = useColorScheme();
  const swichColorModeRight = React.useCallback(
    ({ style }: any) => (
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
      <DrawerContentScrollView {...props} style={{ backgroundColor }}>
        <DrawerItemList
          {...props}
          activeTintColor={activeTintColor}
          activeBackgroundColor={activeBackgroundColor}
        />
      </DrawerContentScrollView>
      <List.Section>
        <List.Item title="Dark Mode?" right={swichColorModeRight} />
      </List.Section>
      <VersionDisplay />
    </>
  );
}

export default function HomeScreen({}: StackScreenProps<any>) {
  return (
    <Drawer.Navigator
      hideStatusBar={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={__DEV__ ? devSelectedSnippet : 'whitespace'}
      screenOptions={{
        headerShown: true,
        headerTitleAllowFontScaling: true,
        headerTitleStyle: Platform.select({
          android: {
            width: '75%',
            alignItems: 'flex-start'
          }
        })
      }}>
      {(Object.keys(snippets) as SnippetId[]).map((snippetId) => {
        return (
          <Drawer.Screen
            component={SnippetScreen}
            initialParams={{ snippetId }}
            options={{
              header: (props) => <DrawerHeader {...props} />,
              title: snippets[snippetId].name
            }}
            key={snippets[snippetId].name}
            name={snippetId}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
