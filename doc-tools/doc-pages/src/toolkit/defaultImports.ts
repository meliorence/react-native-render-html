import { ImportStmt } from './toolkit-types';

const defaultImports: Record<string, ImportStmt> = {
  react: {
    package: 'react',
    default: 'React'
  },
  'react-native': {
    package: 'react-native',
    named: ['useWindowDimensions']
  },
  'react-native-render-html': {
    package: 'react-native-render-html',
    default: 'RenderHtml'
  }
};

export default defaultImports;
