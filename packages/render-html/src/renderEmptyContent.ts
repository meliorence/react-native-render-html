import { TNode } from '@native-html/transient-render-engine';
import { TNodeSubRendererProps } from './internal-types';

function renderEmptyContent({ tnode }: TNodeSubRendererProps<TNode>) {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    if (tnode.isUnregistered) {
      console.warn(
        `There is no custom renderer registered for tag "${tnode.tagName}" which is not part of the HTML5 standard. The tag will not be rendered.` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredDomTags" prop array. If you do, register an HTMLElementModel for this tag with "customHTMLElementModels" prop.'
      );
    } else if (tnode.tagName !== 'head') {
      console.warn(
        `The "${tnode.tagName}" tag is a valid HTML element but is not handled by this library. You must extend the default HTMLElementModel for this tag with "customHTMLElementModels" prop and make sure its content model is not set to "none".` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredDomTags" prop array.'
      );
    }
  }
  return null;
}

export default renderEmptyContent;
