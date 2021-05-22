import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { defaultSystemFonts } from 'react-native-render-html';

const html = `<p style="font-family: 'space-mono'; padding: 10px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip
  ex ea commodo consequat. 
</p>`;

const fontLoaderSrc = `function FontLoader({ children }){
  const [fontsLoaded] = useFonts({
    'space-mono': SpaceMono_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return <>{children}</>;
}`;

const fontSelectionSpaceMonoConfig: UIRenderHtmlCardProps = {
  title: 'Space Mono Font Selection',
  caption:
    'This paragraph font family is set to "Space Mono", which is loaded with Expo font loading helpers and registered via systemFonts prop.',
  props: {
    source: {
      html
    },
    enableExperimentalMarginCollapsing: true,
    systemFonts: ['space-mono', ...defaultSystemFonts]
  },
  config: {
    importStatements: [
      {
        package: 'react-native-render-html',
        named: ['defaultSystemFonts']
      },
      {
        package: '@expo-google-fonts/space-mono',
        named: ['useFonts', 'SpaceMono_400Regular']
      }
    ],
    fnSrcMap: {
      FontLoader: fontLoaderSrc
    },
    exprSrcMap: {
      systemFonts: '["\'space-mono\'", ...defaultSystemFonts]'
    },
    wrapperComponent: 'FontLoader'
  },
  preferHtmlSrc: false
};

export default fontSelectionSpaceMonoConfig;
