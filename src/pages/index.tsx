import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroBadgeGroup}>
          <span className="badge badge--secondary margin-bottom--md">
            Mentor Me Collective × Google Cloud
          </span>
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          Google Cloud Career Launchpad
        </Heading>
        <p className={styles.heroSubtitle}>
          Zero Tuition. Zero Excuses. Fully Indispensable.
        </p>
        <p className={styles.heroDescription}>
          Accelerate your tech growth through hands-on Google Cloud education, expert mentorship, and industry-recognized certifications in 12 weeks.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg margin-right--md"
            to="/docs/networking">
            Cybersecurity Notes 📖
          </Link>
          <a
            className="button button--outline button--secondary button--lg"
            href="https://www.mentormecollective.org/google-cloud-launchpad"
            target="_blank"
            rel="noopener noreferrer">
            Program Overview 🚀
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Google Cloud Career Launchpad | Mentor Me Collective"
      description="Mentor Me Collective Google Cloud Career Launchpad - Cloud Cybersecurity Track and Cloud Education">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
