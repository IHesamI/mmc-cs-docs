import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type HighlightItem = {
  title: string;
  badge: string;
  description: ReactNode;
  icon: string;
};

const ProgramHighlights: HighlightItem[] = [
  {
    title: '12-Week Accelerator',
    badge: 'Zero Tuition',
    icon: '⚡',
    description: (
      <>
        Commit 15 hours per week to master core cloud and security concepts through self-paced learning, interactive labs, and peer-led study groups.
      </>
    ),
  },
  {
    title: 'Hands-On Labs & Projects',
    badge: 'Real-World Skills',
    icon: '🧪',
    description: (
      <>
        Practice on Google Cloud Skills Boost with real cloud environments. Build a portfolio of real cloud and security projects to showcase to top employers.
      </>
    ),
  },
  {
    title: 'Certifications & Exam Discount',
    badge: '50% Off Exam Voucher',
    icon: '🎓',
    description: (
      <>
        Prepare for recognized Google Cloud certification exams, earn digital badges, and receive a 50% discount voucher upon track completion.
      </>
    ),
  },
  {
    title: 'First-Gen Mentorship',
    badge: 'Community Support',
    icon: '👥',
    description: (
      <>
        Receive dedicated guidance from first-generation tech leaders and mentors who offer actionable career advice and industry insights.
      </>
    ),
  },
  {
    title: 'Career Placement Partner',
    badge: 'CareerCircle Access',
    icon: '💼',
    description: (
      <>
        Gain exclusive access to CareerCircle for resume building, 1:1 career coaching, virtual hiring fairs, and direct job matching with partner employers.
      </>
    ),
  },
  {
    title: 'Free Generative AI Training',
    badge: 'Bonus Skillset',
    icon: '🤖',
    description: (
      <>
        Access cutting-edge Generative AI courses included free in the program to keep your tech skills future-proof and highly competitive.
      </>
    ),
  },
];

function HighlightCard({title, badge, description, icon}: HighlightItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--lg')}>
      <div className={clsx('card card--full-height padding--md', styles.featureCard)}>
        <div className="card__header">
          <div className={styles.featureHeaderGroup}>
            <span className={styles.featureIcon}>{icon}</span>
            <span className="badge badge--secondary">{badge}</span>
          </div>
          <Heading as="h3" className="margin-top--sm">{title}</Heading>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export function ProgramOverviewSection(): ReactNode {
  return (
    <section className={styles.sectionPadding}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <span className="badge badge--primary margin-bottom--sm">Program Overview</span>
          <Heading as="h2" className={styles.sectionTitle}>
            What is the Google Cloud Career Launchpad?
          </Heading>
          <p className={styles.sectionSubtitle}>
            A specialized, zero-tuition pipeline created by <strong>Mentor Me Collective</strong> in partnership with <strong>Google Cloud</strong> to equip first-generation technologists with job-ready cloud skills and certifications in just 12 weeks.
          </p>
        </div>

        <div className="row">
          {ProgramHighlights.map((props, idx) => (
            <HighlightCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CybersecurityTrackSection(): ReactNode {
  return (
    <section className={clsx(styles.sectionPadding, styles.bgLight)}>
      <div className="container">
        <div className="row row--align-center">
          <div className="col col--6 margin-bottom--lg">
            <span className="badge badge--danger margin-bottom--sm">Featured Track</span>
            <Heading as="h2" className={styles.trackTitle}>
              🔒 Cloud Cybersecurity Track
            </Heading>
            <p className={styles.trackDescription}>
              The <strong>Cloud Cybersecurity Track</strong> prepares learners for high-demand, entry-level cybersecurity roles in modern cloud environments. Participants learn how to defend cloud infrastructure, manage identity and access, assess threat vectors, and respond to security incidents.
            </p>

            <Heading as="h4" className="margin-top--md">Key Skills You Will Acquire:</Heading>
            <ul className={styles.skillList}>
              <li> Network Security Fundamentals (TCP/IP, Firewalls, CIDR, DNS)</li>
              <li> Cloud Security Models & Best Practices (IAM, Zero Trust)</li>
              <li> Risk Assessment & Threat Mitigation Strategies</li>
              <li> Incident Response and Security Monitoring</li>
              <li> Hands-on Google Cloud Security Tools & Frameworks</li>
            </ul>

            <div className="margin-top--lg">
              <Link
                className="button button--primary button--lg margin-right--md"
                to="/docs/networking">
                Explore Cybersecurity Notes
              </Link>
              <a
                className="button button--outline button--primary button--lg"
                href="https://www.mentormecollective.org/google-cloud-launchpad"
                target="_blank"
                rel="noopener noreferrer">
                Apply on Official Site ↗
              </a>
            </div>
          </div>

          <div className="col col--6">
            <div className={clsx('card padding--lg', styles.cyberCard)}>
              <Heading as="h3" className="text--center margin-bottom--md">
                Career Opportunities & Track Details
              </Heading>

              <div className={styles.detailBox}>
                <Heading as="h4" className="margin-bottom--xs">🎯 Target Roles</Heading>
                <div className={styles.tagContainer}>
                  <span className="badge badge--info margin-right--xs margin-bottom--xs">Cloud Security Analyst</span>
                  <span className="badge badge--info margin-right--xs margin-bottom--xs">Cybersecurity Engineer</span>
                  <span className="badge badge--info margin-right--xs margin-bottom--xs">SOC Analyst</span>
                  <span className="badge badge--info margin-right--xs margin-bottom--xs">Cloud Security Consultant</span>
                </div>
              </div>

              <div className={clsx(styles.detailBox, 'margin-top--md')}>
                <Heading as="h4" className="margin-bottom--xs">💡 Prerequisites & Nice-To-Haves</Heading>
                <p className="margin-bottom--none">
                  No strict prior cloud experience required! Basic familiarity with networking concepts, security tools, or risk assessments is helpful. Supplemental learning materials are provided throughout the cohort.
                </p>
              </div>

              <div className={clsx(styles.detailBox, 'margin-top--md')}>
                <Heading as="h4" className="margin-bottom--xs">⏱️ Commitment & Format</Heading>
                <p className="margin-bottom--none">
                  12 weeks, ~15 hours per week. 100% online & self-paced with structured weekly study groups and live mentor check-ins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <ProgramOverviewSection />
      <CybersecurityTrackSection />
    </>
  );
}
