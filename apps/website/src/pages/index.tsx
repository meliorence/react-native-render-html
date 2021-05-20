import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageHeader from '../components/HomepageHeader';
import HomepageFeatures from '../components/HomepageFeatures';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <div className={styles.annoucement}>
        Coming from v4 or v5 ? Check out our{' '}
        <Link to="/docs/migration-guide">migration guide</Link>.
      </div>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
