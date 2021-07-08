import TwitterFollow from './TwitterFollow';
import React from 'react';
import classes from './Badges.module.scss';

export default function Badges() {
  return (
    <div className={classes.stats}>
      <TwitterFollow className={classes.badge} />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=meliorence&repo=react-native-render-html&type=star&count=true&size=small"
        frameBorder="0"
        scrolling="0"
        width="92"
        height="20"
        title="GitHub"
      />
    </div>
  );
}
