/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import { useThemeConfig, useTitleFormatter } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Seo({ title, description, keywords, image, children }) {
  const { image: defaultImage } = useThemeConfig();
  const pageTitle = useTitleFormatter(title);
  const pageImage = useBaseUrl(image || defaultImage, {
    absolute: true
  });
  return (
    <Head>
      {title && <title>{pageTitle}</title>}
      {title && <meta property="og:title" content={pageTitle} />}
      {title && <meta name="twitter:title" content={pageTitle} />}
      <meta property="og:site_name" content="React Native Render HTML" />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}

      {keywords && (
        <meta
          name="keywords"
          content={Array.isArray(keywords) ? keywords.join(',') : keywords}
        />
      )}

      {pageImage && <meta property="og:image" content={pageImage} />}
      {pageImage && <meta name="twitter:image" content={pageImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@jsamrn" />
      <meta name="twitter:site" content="@jsamrn" />

      {children}
    </Head>
  );
}
