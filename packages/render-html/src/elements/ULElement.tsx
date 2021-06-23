import React from 'react';
import ListElement, { ListElementProps } from './ListElement';

export type ULElementProps = Omit<ListElementProps<'ul'>, 'listType'>;

export default function ULElement(props: ULElementProps) {
  return React.createElement(ListElement, {
    ...props,
    listType: 'ul'
  });
}
