import React from 'react';
import RenderHtmlSimple from './RenderHtmlSimple';

export default function ProfileSimple({ running, html, ignoredTags }) {
  return (
    html &&
    running && <RenderHtmlSimple ignoredTags={ignoredTags} html={html} />
  );
}
