import React from 'react';

export default function Indent({ indent }: { indent: number }) {
  const whitespaces = [];
  for (let i = 0; i < indent; i++) {
    whitespaces.push(<>&nbsp;</>);
  }
  return <code>{whitespaces}</code>;
}
