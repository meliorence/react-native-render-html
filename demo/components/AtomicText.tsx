import * as React from 'react';
import { Text as NativeText } from 'react-native';
import { TextProps } from 'react-native';
import useAtomicTextStyle, {
  AtomicTextStyle
} from '../hooks/useAtomicTextStyle';
import textColorContext from '../state/textColorContext';

export type AtomicTextProps = React.PropsWithChildren<
  TextProps & AtomicTextStyle
>;

export default function AtomicText(props: AtomicTextProps) {
  const memoizedStyle = useAtomicTextStyle(props);
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
