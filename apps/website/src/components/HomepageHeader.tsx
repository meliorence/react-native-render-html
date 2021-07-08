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

export default function HomepageHeader() {
  return (
    <header className={classes.root}>
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
              <Feature>Render HTML into 100% native views</Feature>
              <Feature>Register custom renderers easily</Feature>
              <Feature>Define styles in a breeze</Feature>
              <Feature>...</Feature>
            </ul>
            <div
              className={clsx(
                classes.buttons,
                'margin-top--xl',
                'margin-bottom--xl'
              )}>
              <Link
                className={clsx(
                  'button button--outline button--primary button--lg',
                  classes.buttonGetStarted
                )}
                to="/docs/intro">
                Get Started!
              </Link>
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
