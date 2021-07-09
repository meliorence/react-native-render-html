const { WEBSITE_ROOT, WEBSITE_BASE } = require('@doc/constants');
const version = require('react-native-render-html/package.json').version;
const { existsSync } = require('fs');

const apisidebarPath = './apisidebar.json';
let hasAPIsidebar = existsSync(apisidebarPath);

const plugins = [
  'docusaurus-plugin-sass',
  [
    'doc-docusaurus-rfg-plugin',
    {
      icon: '../../assets/favicon.svg',
      apiKey: '5cfedd426015fefc5fb4a1612a13ebdb930aaf46',
      name: 'Discover RNRH',
      themeColor: '#8181ff',
      backgroundColor: '#000040'
    }
  ],
  // Only include this plugin when the apisidebar file has been generated.
  hasAPIsidebar
    ? [
        '@docusaurus/plugin-content-docs',
        {
          id: 'api',
          path: 'api',
          routeBasePath: 'api',
          sidebarPath: require.resolve(apisidebarPath),
          disableVersioning: false
        }
      ]
    : null,
  [
    'doc-docusaurus-typedoc-plugin',
    {
      version,
      outDir: './api',
      sidebarFile: './apisidebar.json',
      typedoc: {
        entryPoints: ['../../packages/render-html/src/index.ts'],
        tsconfig: '../../packages/render-html/tsconfig.json',
        excludePrivate: true
      }
    }
  ]
].filter((c) => c !== null);

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Native Render HTML',
  tagline:
    'The hackable, full-featured Open Source HTML rendering solution for React Native.',
  url: WEBSITE_ROOT,
  baseUrl: WEBSITE_BASE,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  // TODO remove when this issue is resolved
  // https://github.com/facebook/docusaurus/issues/4923
  // Also remove the swizzled LayoutHead
  favicon: 'favicons/favicon-32x32.png',
  organizationName: 'meliorence',
  projectName: 'react-native-render-html',
  plugins: plugins,
  trailingSlash: false,
  themeConfig: {
    algolia: {
      apiKey: '4f9905bd301a15034820905263f47dda',
      indexName: 'meliorence',
      // Should be set to true for versioned sites
      contextualSearch: false,
      // Optional: Algolia search parameters
      searchParameters: {}
    },
    gtag: {
      trackingID: 'G-CYR1XDV25N',
      anonymizeIP: true
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula')
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'RNRH',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs'
        },
        {
          to: 'api/',
          activeBasePath: 'api',
          position: 'left',
          label: 'API'
        },
        {
          type: 'doc',
          docId: 'migration-guide',
          label: 'Migrating',
          activeSidebarClassName: '__fun'
        },
        {
          type: 'doc',
          docId: 'faq',
          label: 'FAQ',
          activeSidebarClassName: '__fun'
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          to: 'https://github.com/sponsors/jsamr',
          label: 'Sponsorship',
          position: 'left'
        },
        {
          to: `https://github.com/meliorence/react-native-render-html/releases/tag/v${version}`,
          label: `v${version}`,
          position: 'right'
        },
        {
          href: 'https://github.com/meliorence/react-native-render-html',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Essentials',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro'
            },
            {
              label: 'Architecture',
              to: '/docs/architecture'
            },
            {
              to: '/docs/faq',
              label: 'FAQ'
            }
          ]
        },
        {
          title: 'Content',
          items: [
            {
              label: 'Textual',
              to: '/docs/content/textual'
            },
            {
              label: 'Images',
              to: '/docs/content/images'
            },
            {
              label: 'Lists',
              to: '/docs/content/lists'
            },
            {
              label: 'Anchors',
              to: '/docs/content/anchors'
            }
          ]
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'Custom Rendering',
              to: '/docs/guides/custom-renderers'
            },
            {
              label: 'Styling',
              to: '/docs/guides/styling'
            },
            {
              label: 'DOM Tampering',
              to: '/docs/guides/dom-tampering'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              to: 'https://github.com/meliorence/react-native-render-html/blob/master/HELP.adoc',
              label: 'Help'
            },
            {
              to: 'https://github.com/meliorence/react-native-render-html/blob/master/CONTRIBUTING.adoc',
              label: 'Contributing'
            },
            {
              to: 'https://native-html.canny.io/features',
              label: 'Request features'
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-native-render-html'
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/dbEMMJM'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/meliorence/react-native-render-html'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/jsamrn?ref_src=twsrc%5Etfw'
            },
            {
              label: 'Rate this library',
              href: 'https://openbase.com/js/react-native-render-html?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Meliorence, Inc and Jules Sam. Randolph.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: null,
          disableVersioning: false
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            title: 'React Native Render HTML Official Blog',
            copyright: `Copyright © ${new Date().getFullYear()} Meliorence, Inc. and Jules Sam. Randolph`
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss')
        }
      }
    ]
  ]
};
