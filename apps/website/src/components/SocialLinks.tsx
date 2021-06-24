import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import classes from './SocialLinks.module.scss';

function TwitterLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
      className={classes['ic']}>
      <path fill="none" d="M0 0h72v72H0z" />
      <path
        fill="var(--button-color)"
        d="M68.812 15.14c-2.348 1.04-4.87 1.744-7.52 2.06 2.704-1.62 4.78-4.186 5.757-7.243-2.53 1.5-5.33 2.592-8.314 3.176C56.35 10.59 52.948 9 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396c-1.125 1.936-1.77 4.184-1.77 6.58 0 4.543 2.312 8.552 5.824 10.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09-4.482 3.51-10.13 5.605-16.26 5.605-1.055 0-2.096-.06-3.122-.184 5.794 3.717 12.676 5.882 20.067 5.882 24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693 2.558-1.847 4.778-4.15 6.532-6.774z"
      />
    </svg>
  );
}

function RedditLogo() {
  return (
    <svg
      className={classes['ic']}
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--button-color)"
      viewBox="0 0 24 24">
      <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z" />
    </svg>
  );
}

export default function SocialLinks({
  redditUrl,
  twitterUrl
}: {
  redditUrl: string;
  twitterUrl: string;
}) {
  return (
    <div className={classes.socialLinks}>
      <div className={classes.row}>
        <img
          className={classes.icon}
          src={useBaseUrl('/img/undraw_online_discussion.svg')}
        />
        <div className={classes.text}>comment in those threads</div>
      </div>
      <div className={clsx(classes.row, 'margin-top--md')}>
        <a
          className={clsx(
            classes.twitter,
            'button',
            'button--outline',
            'margin-right--md'
          )}
          href={twitterUrl}>
          Twitter
          <TwitterLogo />
        </a>
        <a
          className={clsx(classes.reddit, 'button', 'button--outline')}
          href={redditUrl}>
          Reddit
          <RedditLogo />
        </a>
      </div>
    </div>
  );
}
