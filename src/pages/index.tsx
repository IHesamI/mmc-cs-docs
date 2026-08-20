import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type DocumentItem = {
  title: string;
  description: string;
  link: string;
  badge: string;
};

const documents: DocumentItem[] = [
  {
    title: 'Cloud Security Foundations & IAM',
    description:
      'Learn about the CIA Triad, symmetric and asymmetric encryption, authentication vs. authorization (OAuth2, SAML), Cloud IAM policies, Zero Trust Architecture, and hands-on IAM troubleshooting scenarios.',
    link: '/docs/cloud-security-foundations',
    badge: 'Security & IAM',
  },
  {
    title: 'Identity and Access Management (IAM)',
    description:
      'Learn about Identity and Access Management (IAM), least-privilege IAM policies, RBAC architecture, MFA enforcement, and comparison of AWS, Azure, and GCP access models.',
    link: '/docs/identity-and-access-management',
    badge: 'Identity & Security',
  },
  {
    title: 'Cloud Network Security & Virtual Private Clouds',
    description:
      'Learn about Cloud Firewalls, micro-segmentation, stateful vs. stateless filtering, subnets, gateways, and Virtual Private Cloud (VPC) key concepts.',
    link: '/docs/cloud-network-security-vpc',
    badge: 'Networking & VPC',
  },
  {
    title: 'Cloud Networking & Cybersecurity',
    description:
      'Learn the essential networking concepts for cloud cybersecurity including TCP/IP, DNS, HTTP/HTTPS, VPNs, CIDR, and Firewalls.',
    link: '/docs/networking',
    badge: 'Networking',
  },
  {
    title: 'OS Security',
    description:
      'Learn about operating system security in cloud environments, Linux administration, Windows Event Logs, and IAM vs OS permissions.',
    link: '/docs/os-security',
    badge: 'Operating Systems',
  },
  {
    title: 'The Shared Responsibility Model',
    description:
      'Learn about the foundational framework of cloud security, responsibility distribution across IaaS, PaaS, and SaaS, and real-world attack scenarios.',
    link: '/docs/shared-responsibility-model',
    badge: 'Cloud Architecture',
  },
  {
    title: 'The Shared Fate Model',
    description:
      'Learn about the Shared Fate Model, an evolution of the Shared Responsibility Model featuring secure-by-default blueprints, automated guardrails, and joint security response.',
    link: '/docs/shared-fate-model',
    badge: 'Cloud Architecture',
  },
  {
    title: 'Phrases & Meanings',
    description:
      'Essential terms and definitions including server provisioning, on-premises, ephemeral workloads, and Function-as-a-Service (FaaS).',
    link: '/docs/phrases-meaning',
    badge: 'Glossary',
  },
  {
    title: 'Terraform Infrastructure Configuration',
    description:
      'Hands-on Infrastructure as Code (IaC) configuration examples for GCP VPC networks, firewall rules, and Compute Engine VMs using Terraform.',
    link: '/docs/terraform-temp',
    badge: 'Infrastructure as Code',
  },
];

function DocumentCard({title, description, link, badge}: DocumentItem) {
  return (
    <div className="col col--6 margin-bottom--lg">
      <Link to={link} className={styles.docCardLink}>
        <div className={clsx('card card--full-height padding--lg', styles.docCard)}>
          <div className={styles.docCardHeader}>
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
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Documentation Index
        </Heading>
        <p className={styles.heroSubtitle}>
          Google Cloud & Cybersecurity Study Resources
        </p>
        <p className={styles.heroDescription}>
          A comprehensive knowledge base and study guide hub covering Cloud Security Foundations, Identity & Access Management, Networking, OS Security, Cloud Architecture, and Infrastructure as Code.
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation | Cloud Security & Infrastructure Guides"
      description="Explore comprehensive documentation, study guides, and technical notes on Cloud Security Foundations, Identity and Access Management (IAM), Networking, OS Security, Shared Responsibility Model, Shared Fate Model, Cloud Network Security, and Terraform.">
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
