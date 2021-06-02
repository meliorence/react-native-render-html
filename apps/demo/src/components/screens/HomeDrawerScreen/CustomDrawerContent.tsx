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
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';
import svgAssetsIndex from '../../../svgAssetsIndex';
import { useSpacing } from '@mobily/stacks';
import { HEADER_COLL_HEIGHT } from '../../../constants';
import HeaderColorRolesProvider from '../../croles/HeaderColorRolesProvider';

const Logo = svgAssetsIndex.logo as any;

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

const LOGO_SIZE = 42;

function Header() {
  const { surface } = useColorRoles();
  return (
    <BoxNucleon
      direction="row"
      alignY="center"
      backgroundColor={surface.background}
      style={{ height: HEADER_COLL_HEIGHT }}
      paddingBottom={2}
      padding={1}>
      <Logo height={LOGO_SIZE} width={LOGO_SIZE} />
      <TextRoleNucleon style={{ marginLeft: useSpacing(2) }} role="bodyBold">
        Discover RNRH
      </TextRoleNucleon>
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
      <HeaderColorRolesProvider>
        <Header />
      </HeaderColorRolesProvider>
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
