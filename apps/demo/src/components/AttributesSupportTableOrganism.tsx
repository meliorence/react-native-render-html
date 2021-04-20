import React from 'react';
import { Stack } from '@mobily/stacks';
import { View } from 'react-native';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';
import IconNucleon from './nucleons/IconNucleon';

// TODO polish (WIP)
export default function AttributesSupportTableOrganism({
  style,
  attributes
}: PropsWithStyle<{ attributes: Record<string, boolean> }>) {
  return (
    <View
      style={[
        { backgroundColor: 'rgba(125,125,125,0.1)', padding: 10 },
        style
      ]}>
      <Stack space={2}>
        <TextRoleNucleon role="bodyTableHeader">Attributes</TextRoleNucleon>
        {Object.entries(attributes).map(([attr, support]) => {
          return (
            <Stack horizontal space={4} key={attr}>
              <View
                style={{ width: 150, justifyContent: 'center', flexGrow: 1 }}>
                <TextRoleNucleon role="source">{attr}</TextRoleNucleon>
              </View>
              <View
                style={{ width: 100, justifyContent: 'center', flexGrow: 1 }}>
                <IconNucleon name={support ? 'check-bold' : 'close'} />
              </View>
            </Stack>
          );
        })}
      </Stack>
    </View>
  );
}
