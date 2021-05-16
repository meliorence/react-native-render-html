import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';
import { Alert } from 'react-native';

const html = `<a
  href="https://developer.mozilla.org/"
  style="text-align:center;">
    A link to MDN!
</a>`;

function onPress(event: any, href: string) {
  Alert.alert(`You just pressed ${href}`);
}

const onPressSrc = `function onPress(event, href) {
  Alert.alert(\`You just pressed \${href}\`);
}`;

const anchorsCustomConfig: UIRenderHtmlCardProps = {
  title: 'Customizing Anchor Behavior',
  caption: '',
  props: {
    source: {
      html
    },
    renderersProps: {
      a: {
        onPress
      }
    }
  },
  preferHtmlSrc: false,
  config: {
    importStatements: ["import { Alert } from 'react-native';"],
    fnSrcMap: {
      onPress: onPressSrc
    }
  }
};

export default anchorsCustomConfig;
