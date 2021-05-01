import React from 'react';
import { PageId, PageSpecs } from './pages-types';
import useToolkit from './toolkit/useToolkit';
import PageIntroduction from './pages/PageIntroduction';
import PageReinventTheWheel from './pages/PageReinventTheWheel';
import PageArchitecture from './pages/PageArchitecture';
import PageGuideCustomRenderers from './pages/PageGuideCustomRenderers';
import PageGuideDomTampering from './pages/PageGuideCustomRenderers';
import PageGuideStylingComponents from './pages/PageGuideStylingComponents';
import PageContentImages from './pages/PageContentImages';
import PageContentTextual from './pages/PageContentTextual';
import PageContentLists from './pages/PageContentLists';
import PageContentAnchors from './pages/PageContentAnchors';

const Empty = () => {
  const { Header, Paragraph, RefDoc } = useToolkit();
  return (
    <Header>
      <Paragraph>
        This article is yet a Work In Progress. See also{' '}
        <RefDoc target="architecture">
          This is a link to the architecture!
        </RefDoc>
      </Paragraph>
    </Header>
  );
};

const defaultDescription = 'WIP';

const pagesIndex: Record<PageId, PageSpecs> = {
  intro: {
    title: 'Introduction',
    iconName: 'information-variant',
    component: PageIntroduction,
    description: 'An introduction to react-native-render-html library.',
    group: 'root',
    id: 'intro',
    position: 0
  },
  'reinvent-the-wheel': {
    id: 'reinvent-the-wheel',
    title: 'Reinvent the Wheel',
    iconName: 'ship-wheel',
    component: PageReinventTheWheel,
    description:
      'How to implement a super simple HTML renderer in React Native?',
    group: 'root',
    position: 1
  },
  architecture: {
    component: PageArchitecture,
    group: 'root',
    position: 1,
    title: 'Architecture',
    description: 'An overview of react-native-render-html architecture.',
    id: 'architecture',
    iconName: 'pillar'
  },
  'css-processing': {
    title: 'CSS Processing',
    iconName: 'language-css3',
    position: 4,
    id: 'css-processing',
    group: 'concept',
    description: defaultDescription,
    component: Empty
  },
  'html-processing': {
    title: 'HTML Processing',
    iconName: 'language-html5',
    group: 'concept',
    position: 2,
    id: 'html-processing',
    description: defaultDescription,
    component: Empty
  },
  'transient-render-engine': {
    title: 'Transient Render Engine',
    iconName: 'file-tree',
    group: 'concept',
    position: 3,
    id: 'transient-render-engine',
    description: defaultDescription,
    component: Empty
  },
  'custom-renderers': {
    component: PageGuideCustomRenderers,
    group: 'guides',
    description:
      'How to implement custom renderers in react-native-render-html?',
    iconName: 'eye-settings',
    id: 'custom-renderers',
    position: 2,
    title: 'Custom Renderers'
  },
  'dom-tampering': {
    component: PageGuideDomTampering,
    description: 'How to alter the DOM in react-native-render-html?',
    group: 'guides',
    iconName: 'medical-bag',
    id: 'dom-tampering',
    position: 3,
    title: 'DOM Tampering'
  },
  'styling-components': {
    component: PageGuideStylingComponents,
    description:
      'How to add custom styles to components in react-native-render-html?',
    group: 'guides',
    iconName: 'format-paint',
    id: 'styling-components',
    position: 2,
    title: 'Styling Components'
  },
  // content
  textual: {
    group: 'content',
    component: PageContentTextual,
    description: 'An overview of textual contents in react-native-render-html.',
    iconName: 'format-text',
    id: 'textual',
    position: 1,
    title: 'Textual'
  },
  images: {
    component: PageContentImages,
    group: 'content',
    position: 2,
    title: 'Images',
    description: 'An overview of images in react-native-render-html.',
    id: 'images',
    iconName: 'image-album'
  },
  lists: {
    component: PageContentLists,
    description: 'An overview of lists in react-native-render-html.',
    group: 'content',
    iconName: 'format-list-bulleted',
    id: 'lists',
    position: 3,
    title: 'Lists'
  },
  anchors: {
    component: PageContentAnchors,
    description: 'An overview of anchors in react-native-render-html.',
    group: 'content',
    iconName: 'link-variant',
    id: 'anchors',
    position: 4,
    title: 'Anchors'
  }
};

export default pagesIndex;
