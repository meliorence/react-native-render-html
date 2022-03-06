import React, { Fragment } from 'react';

export default function Indent({ indent }: { indent: number }) {
  const whitespaces = [];
  for (let i = 0; i < indent; i++) {
    whitespaces.push(<Fragment key={i}>&nbsp;</Fragment>);
  }
  return <code>{whitespaces}</code>;
}
