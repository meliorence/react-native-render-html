import ContentImages from '../components/resources/ContentImages';
import { IconNucleonProps } from '../components/nucleons/IconNucleon';
import ConceptArchitecture from '../components/resources/ConceptArchitecture';
import ConceptHtml from '../components/resources/ConceptHtml';
import ConceptTre from '../components/resources/ConceptTre';
import ConceptCss from '../components/resources/ConceptCss';
import PlaygroundLists from '../components/resources/PlaygroundLists';
import React from 'react';

export type ResourceRouteName =
  | 'ContentImages'
  | 'ConceptArchitecture'
  | 'ConceptHTMLProcessing'
  | 'ConceptTRE'
  | 'ConceptCSSProcessing'
  | 'PlaygroundLists';

export interface ResourceRouteDefinition {
  title: string;
  name: ResourceRouteName;
  iconName: IconNucleonProps['name'];
  component: React.ComponentType<any>;
}

const contentImagesRoute: ResourceRouteDefinition = {
  title: 'Images',
  name: 'ContentImages',
  component: ContentImages,
  iconName: 'image-album'
};

const conceptArchitectureRoute: ResourceRouteDefinition = {
  title: 'Architecture',
  name: 'ConceptArchitecture',
  iconName: 'atom',
  component: ConceptArchitecture
};

const conceptHtmlProcessing: ResourceRouteDefinition = {
  title: 'HTML Processing',
  name: 'ConceptHTMLProcessing',
  iconName: 'language-html5',
  component: ConceptHtml
};

const conceptTre: ResourceRouteDefinition = {
  title: 'Transient Render Engine',
  name: 'ConceptTRE',
  iconName: 'file-tree',
  component: ConceptTre
};

const conceptCssProcessing: ResourceRouteDefinition = {
  title: 'CSS Processing',
  name: 'ConceptCSSProcessing',
  iconName: 'language-css3',
  component: ConceptCss
};

const playgroundLists: ResourceRouteDefinition = {
  title: 'Lists Playground',
  name: 'PlaygroundLists',
  iconName: 'format-list-bulleted-square',
  component: PlaygroundLists
};

const resources: Record<ResourceRouteName, ResourceRouteDefinition> = {
  ConceptArchitecture: conceptArchitectureRoute,
  ConceptCSSProcessing: conceptCssProcessing,
  ConceptHTMLProcessing: conceptHtmlProcessing,
  ConceptTRE: conceptTre,
  ContentImages: contentImagesRoute,
  PlaygroundLists: playgroundLists
};

export default resources;
