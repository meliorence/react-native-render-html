/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// @ts-ignore
import version from '../../../../version';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';
import { useColorRoles } from '../../../theme/colorSystem';

export default function VersionDisplay() {
  const { bottom, left, right } = useSafeAreaInsets();
  const { surface } = useColorRoles();
  return (
    <View
      style={{
        alignSelf: 'stretch',
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
        padding: 10
      }}>
      <TextRoleNucleon role="footer" color={surface.secondaryContent}>
        Discovery {version.demo}
        {'\n'}
        rnrh {version.lib}
      </TextRoleNucleon>
    </View>
  );
}
