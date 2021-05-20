import { PageId, PageSpecs } from './pages-types';
import PageIntroduction from './pages/PageIntroduction';
import PageReinventTheWheel from './pages/PageReinventTheWheel';
import PageArchitecture from './pages/PageArchitecture';
import PageGuideCustomRenderers from './pages/PageGuideCustomRenderers';
import PageGuideStylingComponents from './pages/PageGuideStylingComponents';
import PageGuideDomTampering from './pages/PageGuideDomTampering';
import PageContentImages from './pages/PageContentImages';
import PageContentTextual from './pages/PageContentTextual';
import PageContentLists from './pages/PageContentLists';
import PageContentAnchors from './pages/PageContentAnchors';
import PageConceptTRE from './pages/PageConceptTRE';
import PageConceptRendering from './pages/PageConceptRendering';
import PageConceptCSS from './pages/PageConceptCSS';

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
    group: 'flow',
    description: 'An overview of CSS processing in react-native-render-html.',
    component: PageConceptCSS
  },
  'transient-render-engine': {
    title: 'Transient Render Engine',
    iconName: 'file-tree',
    group: 'flow',
    position: 3,
    id: 'transient-render-engine',
    description:
      'An overview of the transient render engine features in react-native-render-html.',
    component: PageConceptTRE
  },
  rendering: {
    title: 'Rendering',
    description:
      'An overview of the rendering step in react-native-render-html.',
    group: 'flow',
    iconName: 'react',
    position: 4,
    id: 'rendering',
    component: PageConceptRendering
  },
  'custom-renderers': {
    component: PageGuideCustomRenderers,
    group: 'guides',
    description:
      'How to implement custom renderers in react-native-render-html?',
    iconName: 'eye-settings',
    id: 'custom-renderers',
    position: 2,
    title: 'Custom Rendering'
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
  styling: {
    component: PageGuideStylingComponents,
    description:
      'How to add custom styles to components in react-native-render-html?',
    group: 'guides',
    iconName: 'format-paint',
    id: 'styling',
    position: 2,
    title: 'Styling'
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
