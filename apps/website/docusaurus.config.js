const { WEBSITE_ROOT, WEBSITE_BASE } = require('@doc/constants');
const version = require('react-native-render-html/package.json').version;
const { existsSync } = require('fs');

const apisidebarPath = './apisidebar.json';
let hasAPIsidebar = existsSync(apisidebarPath);

const plugins = [
  'docusaurus-plugin-sass',
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
  title: 'Discover React Native Render HTML',
  tagline:
    'The hackable, full-featured Open Source HTML rendering solution for React Native.',
  url: WEBSITE_ROOT,
  baseUrl: WEBSITE_BASE,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico?v=1.0.0',
  organizationName: 'meliorence',
  projectName: 'react-native-render-html',
  plugins: plugins,
  themeConfig: {
    algolia: {
      apiKey: '4f9905bd301a15034820905263f47dda',
      indexName: 'meliorence',
      // Should be set to true for versioned sites
      contextualSearch: false,
      // Optional: Algolia search parameters
      searchParameters: {}
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula')
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true
    },
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ If you like react-native-render-html, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/meliorence/react-native-render-html">GitHub</a> and <a target="_blank" rel="noopener noreferrer" href="https://openbase.com/js/react-native-render-html?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge">write a review on openbase</a>! ⭐️',
      isCloseable: true,
      backgroundColor: 'rgb(20, 36, 83)',
      textColor: 'var(--ifm-color-white)'
    },
    navbar: {
      logo: {
        alt: 'React Native Render HTML Logo',
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
          label: 'Migration Guide',
          activeSidebarClassName: '__fun'
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          to:
            'https://github.com/meliorence/react-native-render-html/blob/master/HELP.adoc',
          label: 'Help',
          position: 'left'
        },
        {
          to:
            'https://github.com/meliorence/react-native-render-html/blob/master/CONTRIBUTING.adoc',
          label: 'Contributing',
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
          title: 'Overview',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro'
            },
            {
              label: 'Architecture',
              to: '/docs/architecture'
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
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/react-native-render-html'
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
          showReadingTime: true
          // Please change this to your repo.
          // editUrl: null
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss')
        }
      }
    ]
  ]
};
