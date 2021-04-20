import React from 'react';
import { PageId, PageSpecs } from './pages-types';
import PageConceptArchitecture from './pages/PageConceptArchitecture';
import PageContentImages from './pages/PageContentImages';
import useToolkit from './toolkit/useToolkit';

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
  architecture: {
    component: PageConceptArchitecture,
    group: 'concept',
    position: 1,
    title: 'Architecture',
    description: 'An introduction to react-native-render-html architecture.',
    id: 'architecture',
    iconName: 'atom'
  },
  images: {
    component: PageContentImages,
    group: 'content',
    position: 1,
    title: 'Images',
    description: 'An overview of react-native-render-html images.',
    id: 'images',
    iconName: 'image-album'
  }
};

export default pagesIndex;
