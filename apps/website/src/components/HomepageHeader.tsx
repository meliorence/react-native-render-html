import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './HomepageHeader.module.scss';

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.content}>
        <h1 className="hero__title">React Native Render HTML</h1>
        <p className={clsx('hero__subtitle', styles.subtitle)}>
          {siteConfig.tagline}
        </p>
        <div
          className={clsx(
            styles.buttons,
            'margin-top--xl',
            'margin-bottom--xl'
          )}>
          <Link
            className={clsx(
              'button button--outline button--primary button--lg',
              styles.buttonGetStarted
            )}
            target="_blank"
            to="/docs/intro">
            Get Started!
          </Link>
        </div>
      </div>
      <div className={styles.stats}>
        <a
          className="margin-right--md"
          href="https://openbase.com/js/react-native-render-html?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge">
          <img src="https://badges.openbase.com/js/rating/react-native-render-html.svg" />
        </a>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=meliorence&repo=react-native-render-html&type=star&count=true&size=small"
          frameBorder="0"
          scrolling="0"
          width="100"
          height="30"
          title="GitHub"
        />
      </div>
    </header>
  );
}
