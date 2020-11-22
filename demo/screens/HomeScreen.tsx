import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import VersionDisplay from '../components/VersionDisplay';
import HeaderRight from '../components/HeaderRight';
import SnippetScreen from '../screens/SnippetScreen';
import snippets from '../snippets';
import { Platform } from 'react-native';

const ignoredSnippets = [
  'trickyStuff',
  'invalidHTML',
  'ignoringTagsAndStyles',
  'customHTMLTags',
  'iframes',
  'alteration',
  'inlineCustomTags'
];

if (!__DEV__) {
  ignoredSnippets.push('test');
}

const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

const devSelectedSnippet = 'remoteHTML';

function CustomDrawerContent(props: DrawerContentComponentProps<any>) {
  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <VersionDisplay />
    </>
  );
}

export default function HomeScreen({}: StackScreenProps<any>) {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      hideStatusBar={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={__DEV__ ? devSelectedSnippet : 'whitespace'}
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerShown: true,
        headerTitleAllowFontScaling: true,
        headerTitleStyle: Platform.select({
          android: {
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
                  <HeaderRight tintColor={tintColor} />
                )
              }}
              key={snippets[snippetId].name}
              name={snippetId}
            />
          );
        })}
    </Drawer.Navigator>
  );
}
