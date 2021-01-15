import React from 'react';
import GenericListElement, {
  GenericListElementProps
} from './GenericListElement';

export type OLElementProps = Omit<GenericListElementProps<'ol'>, 'listType'>;
export default function OLElement(props: OLElementProps) {
  return React.createElement(GenericListElement, { ...props, listType: 'ol' });
}
