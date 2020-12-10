import HTML from "./HTML";

export { constructStyles } from "./HTMLStyles";
export {
  getParentsTagsRecursively,
  getClosestNodeParentByTag,
  IGNORED_TAGS,
} from "./HTMLUtils";
export { default as domNodeToHTMLString } from "./domNodeToHTMLString";
export default HTML;
