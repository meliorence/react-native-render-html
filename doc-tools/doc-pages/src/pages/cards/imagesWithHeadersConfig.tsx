import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<img src="https://www.fillmurray.com/200/100" />`;

function provideEmbeddedHeaders(uri: string, tagName: string) {
  if (tagName === 'img') {
    return {
      Authorization: 'Bearer XYZ'
    };
  }
}

const imagesWithHeadersConfig: UIRenderHtmlCardProps = {
  title: 'Providing headers to images',
  caption:
    'provideEmbeddedHeaders lets you pick headers for specific domains and works with multiple tags. For example, it can be used with the iframe plugin.',
  props: {
    source: {
      html
    },
    provideEmbeddedHeaders
  },
  preferHtmlSrc: false,
  config: {
    importStatements: [
      { package: 'react-native', named: ['Platform', 'PixelRatio'] }
    ],
    fnSrcMap: {
      provideEmbeddedHeaders: `function provideEmbeddedHeaders(uri, tagName) {
  if (tagName === 'img') {
    return {
      Authorization: "Bearer XYZ",
    };
  }
}`
    }
  }
};

export default imagesWithHeadersConfig;
