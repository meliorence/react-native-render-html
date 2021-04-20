import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import UIAppbarActionAtom from '../components/UIAppbarActionAtom';
import UIAppbarContentAtom from '../components/UIAppbarContentAtom';
import UIHeaderAtom from '../components/UIHeaderAtom';

export { StackHeaderProps };

export default function StackHeader(props: StackHeaderProps) {
  const { scene } = props;
  const {
    descriptor: { options, navigation }
  } = scene;
  const onMenuPress = React.useCallback(() => navigation.goBack(), [
    navigation
  ]);
  return (
    <UIHeaderAtom>
      <UIAppbarActionAtom icon="arrow-left" onPress={onMenuPress} />
      <UIAppbarContentAtom title={options.title} />
    </UIHeaderAtom>
  );
}
