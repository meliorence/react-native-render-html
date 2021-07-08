import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import classes from './index.module.scss';
import HomepageHeader from '../components/HomepageHeader';
import HomepageFeatures from '../components/HomepageFeatures';
import ExpoDiscoveryCard from '../components/ExpoDiscoveryCard';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Discover" description={siteConfig.tagline}>
      <HomepageHeader />
      <div id="more" className={classes.annoucement}>
        Coming from v4 or v5 ? Check out our{' '}
        <Link to="/docs/migration-guide">
          <strong>migration guide</strong>
        </Link>
        .
      </div>
      <div className={classes.advertising}>
        <div className={classes['advertising__left']}>
          <div className={classes['advertising__label']}>
            <p>
              Try out our <strong>Discovery App</strong> for an immersive mobile
              experience and glimpse of this library capabilities.
            </p>
          </div>
        </div>
        <div className={classes['advertising__right']}>
          <ExpoDiscoveryCard className={classes['advertising__expo']} />
        </div>
      </div>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
