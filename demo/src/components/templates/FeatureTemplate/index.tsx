import { Stack } from '@mobily/stacks';
import React, {
  Children,
  PropsWithChildren,
  FunctionComponentElement
} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import upperRoman from '@jsamr/counter-style/presets/upperRoman';
import BoxNucleon from '../../nucleons/BoxNucleon';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import BodyChapterMolecule, {
  BodyChapterMoleculeProps
} from '../../BodyChapterMolecule';

function isBodyChapterElement(
  candidate: unknown
): candidate is FunctionComponentElement<BodyChapterMoleculeProps> {
  return (
    typeof candidate === 'object' &&
    candidate != null &&
    (candidate as any).type === BodyChapterMolecule
  );
}

export default function FeatureTemplate({ children }: PropsWithChildren<{}>) {
  const counter = upperRoman;
  let index = 1;
  return (
    <ScrollView
      style={{ flexGrow: 1 }}
      contentContainerStyle={useSurfaceBackgroundStyleNucleon()}>
      <BoxNucleon paddingBottom={2}>
        <Stack space={8}>
          {Children.map(children, (c) => {
            if (isBodyChapterElement(c)) {
              return React.cloneElement(c, {
                ...c.props,
                prefix: counter.renderMarker(index++)
              });
            }
            return c;
          })}
        </Stack>
      </BoxNucleon>
    </ScrollView>
  );
}
