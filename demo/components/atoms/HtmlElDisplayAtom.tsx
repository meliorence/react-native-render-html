import React from 'react';
import TextNucleon, { TextNucleonProps } from '../nucleons/TextNucleon';

export default function HtmlElDisplayAtom({
  name,
  ...props
}: Omit<TextNucleonProps, 'mono' | 'children'> & {
  name: string;
}) {
  return (
    <TextNucleon {...props} mono>
      &lt;{name}&gt;
    </TextNucleon>
  );
}
