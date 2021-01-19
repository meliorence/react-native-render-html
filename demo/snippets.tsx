import { SnippetDeclaration } from './types';
import iframes from './snippets/iframes';
import headers from './snippets/headers';
import customTags from './snippets/customTags';
import whitespace from './snippets/whitespace';
import pre from './snippets/pre';
import test from './snippets/test';
import fonts from './snippets/fonts';
import paragraphs from './snippets/paragraphs';
import anchors from './snippets/anchors';
import lists from './snippets/lists';
import images from './snippets/images';
import layoutStyles from './snippets/layoutStyles';
import textStyles from './snippets/textStyles';
import ignoring from './snippets/ignoring';
import remoteHTML from './snippets/remoteHTML';
import alteration from './snippets/alteration';
import customRenderers from './snippets/customRenderers';
import modelTampering from './snippets/modelTampering';
import internalRenderers from './snippets/internalRenderers';

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
