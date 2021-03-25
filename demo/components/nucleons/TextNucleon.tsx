import * as React from 'react';
import { Text as NativeText } from 'react-native';
import { TextProps } from 'react-native';
import useNuclearTextStyle, { NuclearTextStyle } from './useNuclearTextStyle';
import textColorContext from '../../state/textColorContext';

export type TextNucleonProps = React.PropsWithChildren<
  TextProps & NuclearTextStyle
>;

export default function TextNucleon(props: TextNucleonProps) {
  const memoizedStyle = useNuclearTextStyle(props);
  const text = <NativeText {...props} style={memoizedStyle} />;
  if (props.color) {
    return (
      <textColorContext.Provider value={props.color}>
        {text}
      </textColorContext.Provider>
    );
  }
  return text;
}
