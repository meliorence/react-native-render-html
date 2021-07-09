import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import classes from './HomepageHeader.module.scss';
import Screenshot from './Screenshot';
//@ts-ignore
import showcaseImg from '@site/static/img/discover-screenshot.png';

function Feature({ children }) {
  return <li>{children}</li>;
}

function onPressReadMore() {
  const target = document.getElementById('more');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function HomepageHeader() {
  return (
    <header className={classes.root}>
      <div className={classes.rootOverlay} />
      <div className={clsx(classes.title, 'margin-bottom--md')}>
        <h1 className={clsx('hero__title')}>React Native Render HTML</h1>
        <p className={clsx('hero__subtitle', classes.subtitle)}>
          Give a <strong>genuine native</strong> feeling to your HTML content.
        </p>
      </div>
      <div className={clsx('hero hero--primary', classes.heroBanner)}>
        <div className={classes.main}>
          <div className={clsx(classes.content)}>
            <ul className={clsx(classes.features)}>
              <Feature>📱 Render HTML into 100% native views</Feature>
              <Feature>⚙️ Write custom tag renderers</Feature>
              <Feature>🖌️ Style tags and classes</Feature>
            </ul>
            <div className={clsx(classes.buttonsGroup)}>
              <Link
                className={clsx(
                  'button button--outline button--primary button--lg',
                  classes.button
                )}
                to="/docs/intro">
                Get Started!
              </Link>
            </div>
            <div className={clsx(classes.buttonsGroup, 'margin-bottom--md')}>
              <button
                className={clsx(
                  'button button--outline button--primary button--lg'
                )}
                style={{ borderWidth: 0 }}
                onClick={onPressReadMore}>
                ⬇ Read More
              </button>
            </div>
          </div>
          <div className={classes.screenshotContainer}>
            <Screenshot
              className={classes.screenshot}
              scale={1}
              url={showcaseImg}
            />
            <div className={classes.screenshotOverlay} />
          </div>
        </div>
      </div>
    </header>
  );
}
