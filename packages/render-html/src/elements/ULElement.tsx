import React from 'react';
import GenericListElement, {
  GenericListElementProps
} from './GenericListElement';

export type ULElementProps = Omit<GenericListElementProps<'ul'>, 'listType'>;
export default function ULElement(props: ULElementProps) {
  return React.createElement(GenericListElement, { ...props, listType: 'ul' });
}
