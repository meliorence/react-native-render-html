import { RenderHTMLProps } from 'react-native-render-html';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface SnippetDeclaration {
  name: string;
  codeSource: string;
  supportsLegacy: boolean;
  props?: RenderHTMLProps;
}
