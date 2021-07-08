import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.scss';

const features = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/undraw_relaxation.svg').default,
    description: (
      <>
        Despite its rich features and plugins,{' '}
        <code>react-native-render-html</code> was designed for ease of use in
        mind. Getting started is a matter of seconds.
      </>
    )
  },
  {
    title: 'Transparent',
    Svg: require('../../static/img/undraw_back_home.svg').default,
    description: (
      <>
        The internal data structure to render elements is{' '}
        <strong>entirely transparent</strong>. You can easily{' '}
        <strong>inspect</strong> the transient tree structure and have an
        immediate idea of the engine belly.
      </>
    )
  },
  {
    title: 'Hackable',
    Svg: require('../../static/img/undraw_hacker_mind.svg').default,
    description: (
      <>
        Every step of the data flow can be tampered with. You can{' '}
        <strong>alter the DOM</strong>,{' '}
        <strong>customize and define elements models</strong>, implement{' '}
        <strong>custom renderers</strong> and <strong>defer rendering</strong>{' '}
        for asynchronous DOM inspection in a breeze.
      </>
    )
  },
  {
    title: 'Standards Compliance',
    Svg: require('../../static/img/undraw_static_assets.svg').default,
    description: (
      <>
        This library aims at balancing adherance to the W3C and WHATWG standards
        with complexity and speed.
      </>
    )
  },
  {
    title: 'Styles Safety',
    Svg: require('../../static/img/undraw_security_on.svg').default,
    description: (
      <>
        Despite React Native styles and W3C CSS numerous incompatibilities, this
        library <strong>reconciles both standards</strong>, and brings support
        for properties unavailable in React Native such as{' '}
        <code>list-style-type</code>, <code>white-space</code>...
      </>
    )
  },
  {
    title: 'Production Ready',
    Svg: require('../../static/img/undraw_certificate.svg').default,
    description: (
      <>
        This library is ready for production, and its development{' '}
        <strong>test-driven</strong>. The transient node engine is{' '}
        <strong>CI-benchmarked</strong> to safeguard its speed.
      </>
    )
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <h1 style={{ display: 'none' }}>Overview of features</h1>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
