/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import VersionDisplay from './VersionDisplay';
import { View } from 'react-native';
import {
  useColorScheme,
  useColorSchemeSetter
} from '../../../state/ColorSchemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorRoles } from '../../../theme/colorSystem';
import DrawerItemList from './DrawerItemList';
import { ScrollView } from 'react-native-gesture-handler';
import BoxNucleon from '../../nucleons/BoxNucleon';
import UISwitchTideMolecule from '../../UISwitchTideMolecule';
import CardColorRolesProvider from '../../croles/CardColorRolesProvider';

function Footer() {
  const { surface } = useColorRoles();
  const colorScheme = useColorScheme();
  const setColorScheme = useColorSchemeSetter();
  return (
    <BoxNucleon backgroundColor={surface.background} paddingY={0}>
      <UISwitchTideMolecule
        leftIconName="weather-night"
        label="Dark"
        value={colorScheme === 'dark'}
        onValueChange={(v) => setColorScheme(v ? 'dark' : 'light')}
      />
      <VersionDisplay />
    </BoxNucleon>
  );
}

export default function CustomDrawerContent(
  props: DrawerContentComponentProps<any>
) {
  const { surface, statusBarBackground } = useColorRoles();
  const { top } = useSafeAreaInsets();
  return (
    <>
      <View
        style={{
          height: top,
          alignSelf: 'stretch',
          backgroundColor: statusBarBackground
        }}
      />
      <ScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0,
          backgroundColor: surface.background
        }}>
        <DrawerItemList {...props} />
      </ScrollView>
      <CardColorRolesProvider>
        <Footer />
      </CardColorRolesProvider>
    </>
  );
}
