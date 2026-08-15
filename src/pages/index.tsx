import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type DocumentItem = {
  title: string;
  description: string;
  link: string;
  icon: string;
  badge: string;
};

const documents: DocumentItem[] = [
  {
    title: 'Cloud Security Foundations & IAM',
    description:
      'Learn about the CIA Triad, symmetric and asymmetric encryption, authentication vs. authorization (OAuth2, SAML), Cloud IAM policies, Zero Trust Architecture, and hands-on IAM troubleshooting scenarios.',
    link: '/docs/cloud-security-foundations',
    icon: '🛡️',
    badge: 'Security & IAM',
  },
  {
    title: 'Cloud Networking & Cybersecurity',
    description:
      'Learn the essential networking concepts for cloud cybersecurity including TCP/IP, DNS, HTTP/HTTPS, VPNs, CIDR, and Firewalls.',
    link: '/docs/networking',
    icon: '🌐',
    badge: 'Networking',
  },
  {
    title: 'OS Security',
    description:
      'Learn about operating system security in cloud environments, Linux administration, Windows Event Logs, and IAM vs OS permissions.',
    link: '/docs/os-security',
    icon: '💻',
    badge: 'Operating Systems',
  },
  {
    title: 'The Shared Responsibility Model',
    description:
      'Learn about the foundational framework of cloud security, responsibility distribution across IaaS, PaaS, and SaaS, and real-world attack scenarios.',
    link: '/docs/shared-responsibility-model',
    icon: '🤝',
    badge: 'Cloud Architecture',
  },
  {
    title: 'Phrases & Meanings',
    description:
      'Essential terms and definitions including server provisioning, on-premises, ephemeral workloads, and Function-as-a-Service (FaaS).',
    link: '/docs/phrases-meaning',
    icon: '📖',
    badge: 'Glossary',
  },
  {
    title: 'Terraform Infrastructure Configuration',
    description:
      'Hands-on Infrastructure as Code (IaC) configuration examples for GCP VPC networks, firewall rules, and Compute Engine VMs using Terraform.',
    link: '/docs/terraform-temp',
    icon: '⚙️',
    badge: 'Infrastructure as Code',
  },
];

function DocumentCard({title, description, link, icon, badge}: DocumentItem) {
  return (
    <div className="col col--6 margin-bottom--lg">
      <Link to={link} className={styles.docCardLink}>
        <div className={clsx('card card--full-height padding--lg', styles.docCard)}>
          <div className={styles.docCardHeader}>
            <span className={styles.docCardIcon}>{icon}</span>
            <span className="badge badge--secondary">{badge}</span>
          </div>
          <Heading as="h3" className="margin-top--md margin-bottom--sm">
            {title}
          </Heading>
          <p className={styles.docCardDescription}>{description}</p>
          <div className={styles.docCardFooter}>
            <span className={styles.readMoreText}>Read Document &rarr;</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MainHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Documentation Index
        </Heading>
        <p className={styles.heroSubtitle}>
          MMC Google Cloud Career Launchpad
        </p>
        <p className={styles.heroDescription}>
          Browse and access all study guides, cloud security notes, and technical documentation.
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation | MMC Google Cloud Career Launchpad"
      description="Explore all documentation topics and study materials for the MMC Google Cloud Career Launchpad, including Cloud Security Foundations, Networking, OS Security, Shared Responsibility Model, and Terraform.">
      <MainHeader />
      <main className="container margin-vert--xl">
        <section>
          <div className="text--center margin-bottom--lg">
            <Heading as="h2">Available Documents</Heading>
            <p className={styles.sectionSubtitle}>
              Select a document below to start reading
            </p>
          </div>
          <div className="row">
            {documents.map((doc, idx) => (
              <DocumentCard key={idx} {...doc} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
