import React, { PropsWithChildren } from 'react';
import useToolkit from '../toolkit/useToolkit';

export default function ListItemCode({
  name,
  children
}: PropsWithChildren<{ name: string }>) {
  const { ListItem, InlineCode } = useToolkit();
  return (
    <ListItem>
      <InlineCode>{name}</InlineCode>
      {': '}
      {children}
    </ListItem>
  );
}
