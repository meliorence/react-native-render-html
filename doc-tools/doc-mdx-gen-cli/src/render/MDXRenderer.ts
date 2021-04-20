import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import { createElement } from './createElement';

const MDXRenderer = Reconciler<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  createInstance(type, props, root) {
    return createElement(type, props, root!);
  },

  createTextInstance(text) {
    return text;
  },

  finalizeInitialChildren() {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
    return null;
  },

  prepareUpdate() {
    return true;
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent() {
    // noop
  },

  getRootHostContext() {
    // https://github.com/nitin42/redocx/blob/384305bfe6d792837ed93efc675a2b4f3aca8a55/src/renderer/renderer.js#L59
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent() {
    return false;
  },

  preparePortalMount() {},

  supportsHydration: true,

  supportsPersistence: false,

  isPrimaryRenderer: true,

  cancelTimeout: clearTimeout,

  scheduleTimeout: setTimeout,

  noTimeout: -1,

  // eslint-disable-next-line no-undef
  queueMicrotask: queueMicrotask,

  //@ts-ignore
  now: () => {},

  // Setting to false leads to crash...
  supportsMutation: true,

  clearContainer() {
    // noop
  },

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  appendChildToContainer(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  insertBefore() {
    // noop
  },

  commitUpdate() {
    // noop
  },

  commitMount() {
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.children = newText;
  }
});

export default MDXRenderer;
