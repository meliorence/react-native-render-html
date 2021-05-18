import React, { useState } from 'react';
import { Modal, Button, Text, View } from 'react-native';
import {
  CustomBlockRenderer,
  useInternalRenderer
} from 'react-native-render-html';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = '<img src="https://dummyimage.com/1200x800">';

const Renderer: CustomBlockRenderer = function CustomImageRenderer(
  props
) {
  const { Renderer, rendererProps } = useInternalRenderer('img', props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onPress = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  const uri = rendererProps.source.uri!;
  const thumbnailSource = {
    ...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: uri.replace('1200', '300').replace('800', '200')
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Renderer {...rendererProps} source={thumbnailSource} onPress={onPress} />
      <Modal visible={isModalOpen} onRequestClose={onModalClose}>
        <Renderer {...rendererProps} />
        <Text>A full resolution image!</Text>
        <Button title="Close Modal" onPress={onModalClose} />
      </Modal>
    </View>
  );
};

const customImageRendererSrc = `function CustomImageRenderer(
  props
) {
  const { Renderer, rendererProps } = useInternalRenderer('img', props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onPress = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  const uri = rendererProps.source.uri!;
  const thumbnailSource = {
    ...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: uri.replace('1200', '300').replace('800', '200')
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Renderer {...rendererProps} source={thumbnailSource} onPress={onPress} />
      <Modal visible={isModalOpen} onRequestClose={onModalClose}>
        <Renderer {...rendererProps} />
        <Text>A full resolution image!</Text>
        <Button title="Close Modal" onPress={onModalClose} />
      </Modal>
    </View>
  );
}`;

const internalImageRendererConfig: UIRenderHtmlCardProps = {
  title: 'A Custom Image Renderer based on useInternalRenderer',
  caption: 'Press the image and a modal will appear!',
  props: {
    source: { html },
    tagsStyles: {
      img: {
        alignSelf: 'center'
      }
    },
    renderers: {
      img: Renderer
    }
  },
  config: {
    importStatements: [
      "import { Modal, Button, Text, View } from 'react-native';",
      "import { useState } from 'react';",
      "import { useInternalRenderer } from 'react-native-render-html';"
    ],
    fnSrcMap: {
      CustomImageRenderer: customImageRendererSrc
    }
  }
};

export default internalImageRendererConfig;
