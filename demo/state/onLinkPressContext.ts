import { createContext } from 'react';
import { RenderHTMLProps } from 'react-native-render-html';

const onLinkPressContext = createContext<
  Required<RenderHTMLProps>['onLinkPress']
>(() => undefined as void);

export default onLinkPressContext;
