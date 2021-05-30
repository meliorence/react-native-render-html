import React from 'react';
import { Stack } from '@mobily/stacks';
import UIAppbarActionAtom from '../../UIAppbarActionAtom';
import { useNavigation } from '@react-navigation/core';

interface ArticleFooterFixedProps {
  //
}
export default function ArticleFooterFixed({}: ArticleFooterFixedProps) {
  const navigation = useNavigation();
  return (
    <Stack
      horizontal
      space={1}
      style={{
        // height: 65,
        backgroundColor: 'rgba(0,0,0,0.55)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}>
      <UIAppbarActionAtom
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: 'black' }}
        icon="chevron-left"
      />
      {/* <UIAppbarActionAtom
        onPress={() => navigation.goFor}
        style={{ backgroundColor: 'black' }}
        icon="chevron-right"
      /> */}
    </Stack>
  );
}
