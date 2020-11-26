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
import trickyStuff from './snippets/trickyStuff';
import layoutStyles from './snippets/layoutStyles';
import textStyles from './snippets/textsStyles';
import ignoring from './snippets/ignoring';
import remoteHTML from './snippets/remoteHTML';
import alteration from './snippets/alteration';
import customRenderers from './snippets/customRenderers';
import modelTampering from './snippets/modelTampering';

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
  | 'trickyStuff'
  | 'layoutStyles'
  | 'textStyles'
  | 'ignoring'
  | 'customTags'
  | 'customRenderers'
  | 'modelTampering'
  | 'headers'
  | 'remoteHTML'
  | 'iframes'
  | 'alteration';

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
  customTags,
  modelTampering,
  // ↓ Ignored snippets
  trickyStuff,
  ignoring,
  iframes,
  alteration
};

const ignoredSnippets: SnippetId[] = [
  'trickyStuff',
  'ignoring',
  'iframes',
  'alteration'
];

if (!__DEV__) {
  ignoredSnippets.push('test');
}

const filteredSnippets: Record<SnippetId, SnippetDeclaration> = (Object.keys(
  snippets
) as SnippetId[])
  .filter((k) => ignoredSnippets.indexOf(k as SnippetId) === -1)
  .reduce((prev, key) => ({ ...prev, [key]: snippets[key] }), {} as any);

export default filteredSnippets;
