import { SnippetDeclaration } from './types';
import iframes from './src/snippets/iframes';
import headers from './src/snippets/headers';
import customTags from './src/snippets/customTags';
import whitespace from './src/snippets/whitespace';
import pre from './src/snippets/pre';
import test from './src/snippets/test';
import fonts from './src/snippets/fonts';
import paragraphs from './src/snippets/paragraphs';
import anchors from './src/snippets/anchors';
import lists from './src/snippets/lists';
import images from './src/snippets/images';
import layoutStyles from './src/snippets/layoutStyles';
import textStyles from './src/snippets/textStyles';
import ignoring from './src/snippets/ignoring';
import remoteHTML from './src/snippets/remoteHTML';
import alteration from './src/snippets/alteration';
import customRenderers from './src/snippets/customRenderers';
import modelTampering from './src/snippets/modelTampering';
import internalRenderers from './src/snippets/internalRenderers';
import relativeUrls from './src/snippets/relativeUrls';

export const devSelectedSnippet = 'test';

export type SnippetId =
  | 'test'
  | 'whitespace'
  | 'pre'
  | 'fonts'
  | 'paragraphs'
  | 'anchors'
  | 'lists'
  | 'images'
  | 'layoutStyles'
  | 'textStyles'
  | 'ignoring'
  | 'customTags'
  | 'customRenderers'
  | 'modelTampering'
  | 'headers'
  | 'remoteHTML'
  | 'relativeUrls'
  | 'iframes'
  | 'alteration'
  | 'internalRenderers';

const snippets: Record<SnippetId, SnippetDeclaration> = {
  // DEV only
  test,
  // Public snippets
  whitespace,
  pre,
  fonts,
  paragraphs,
  anchors,
  lists,
  images,
  layoutStyles,
  textStyles,
  headers,
  remoteHTML,
  customRenderers,
  internalRenderers,
  customTags,
  modelTampering,
  ignoring,
  alteration,
  relativeUrls,
  // ↓ Ignored snippets
  iframes
};

const ignoredSnippets: SnippetId[] = ['iframes'];

if (!__DEV__) {
  ignoredSnippets.push('test');
}

const filteredSnippets: Record<SnippetId, SnippetDeclaration> = (Object.keys(
  snippets
) as SnippetId[])
  .filter((k) => ignoredSnippets.indexOf(k as SnippetId) === -1)
  .reduce((prev, key) => ({ ...prev, [key]: snippets[key] }), {} as any);

export default filteredSnippets;
