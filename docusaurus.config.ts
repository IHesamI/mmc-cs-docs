import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MMC Google Cloud Career Launchpad',
  tagline: 'Empowering first-generation technologists through Google Cloud Cybersecurity and Cloud Education',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://www.mentormecollective.org',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Mentor Me Collective',
      logo: {
        alt: 'Mentor Me Collective Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://www.mentormecollective.org/google-cloud-launchpad',
          label: 'Official Launchpad Page',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Networking & Cybersecurity Essentials',
              to: '/docs/networking',
            },
          ],
        },
        {
          title: 'Mentor Me Collective',
          items: [
            {
              label: 'Official Site',
              href: 'https://www.mentormecollective.org/',
            },
            {
              label: 'Google Cloud Launchpad',
              href: 'https://www.mentormecollective.org/google-cloud-launchpad',
            },
            {
              label: 'Slack Community',
              href: 'https://join.slack.com/t/mentormecollective/shared_invite/zt-2xcg3cu5f-0yXq2Dhpo1wol2E9_7kPDw',
            },
          ],
        },
        {
          title: 'Social & Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/mentormecollective',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/mentormecollective/',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/MentorMeCollective',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/MMCollectivee',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mentor Me Collective. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
