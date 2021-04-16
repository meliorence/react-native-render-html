import React from 'react';
import ListElement, { ListElementProps } from './ListElement';

export type OLElementProps = Omit<ListElementProps<'ol'>, 'listType'>;
export default function OLElement(props: OLElementProps) {
  return React.createElement(ListElement, { ...props, listType: 'ol' });
}
