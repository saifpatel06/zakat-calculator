import Head from 'next/head';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import IslamicPatterns from '../src/components/Islamicpatterns';
import ArabicCalligraphy from '../src/components/Arabiccalligraphy';
import IslamicMotif from '../src/components/Islamicmotif';
import styles from '../styles/Home.module.css';
import Meta from '../src/components/Meta';
import RamadanDashboard from '../src/components/RamadanDashboard';
import Ramadaneducation from '../src/components/Ramadaneducation';

const Home = () => {
  return (
    <Layout>
      <Meta />
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section with Islamic Patterns */}
      <section className={styles.hero}>
        <IslamicPatterns variant="header" opacity={0.08} />
        <div className={styles.heroContent}>
          {/* Islamic Motif */}
          {/* <div className={styles.motifWrapper}>
            <IslamicMotif size="large" variant="crescent" animated={true} />
          </div> */}

          {/* Arabic Calligraphy */}
          <ArabicCalligraphy text="bismillah" position="center" />
          
          <h1 className={styles.heroTitle}>
            Calculate Your Zakat with Confidence
          </h1>
          <p className={styles.heroSubtitle}>
            The most comprehensive and user-friendly Zakat calculator. 
            Get accurate calculations based on Islamic principles in seconds.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/calculator" className={styles.primaryButton}>
              <span>Calculate Now</span>
              <span className={styles.buttonIcon}>→</span>
            </Link>
            <Link href="/faq" className={styles.secondaryButton}>
              <span>Learn More</span>
            </Link>
          </div>

          {/* Decorative Islamic ornament */}
          <div className={styles.ornamentDivider}>
            <span className={styles.ornament}>✦</span>
            <span className={styles.ornamentLine}></span>
            <span className={styles.ornament}>✦</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          {/* Section Header with Calligraphy */}
          <div className={styles.sectionHeader}>
            <ArabicCalligraphy text="alhamdulillah" position="center" />
            <h2 className={styles.sectionTitle}>Why Choose Our Calculator?</h2>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <IslamicPatterns variant="arabesque" opacity={0.05} />
              <span className={styles.featureIcon}>✨</span>
              <h3 className={styles.featureTitle}>Accurate Calculation</h3>
              <p className={styles.featureText}>
                Based on authentic Islamic principles and current Nisab values
              </p>
            </div>

            <div className={styles.featureCard}>
              <IslamicPatterns variant="arabesque" opacity={0.05} />
              <span className={styles.featureIcon}>🔒</span>
              <h3 className={styles.featureTitle}>Secure & Private</h3>
              <p className={styles.featureText}>
                Your data is never stored or shared. Complete privacy guaranteed
              </p>
            </div>

            <div className={styles.featureCard}>
              <IslamicPatterns variant="arabesque" opacity={0.05} />
              <span className={styles.featureIcon}>📱</span>
              <h3 className={styles.featureTitle}>Mobile Friendly</h3>
              <p className={styles.featureText}>
                Calculate your Zakat on any device, anytime, anywhere
              </p>
            </div>

            <div className={styles.featureCard}>
              <IslamicPatterns variant="arabesque" opacity={0.05} />
              <span className={styles.featureIcon}>💰</span>
              <h3 className={styles.featureTitle}>Multiple Assets</h3>
              <p className={styles.featureText}>
                Supports cash, gold, silver, business assets, and investments
              </p>
            </div>

            <div className={styles.featureCard}>
              <IslamicPatterns variant="arabesque" opacity={0.05} />
              <span className={styles.featureIcon}>📊</span>
              <h3 className={styles.featureTitle}>Detailed Breakdown</h3>
              <p className={styles.featureText}>
                See exactly how your Zakat is calculated step by step
              </p>
            </div>

            {/* <div className={styles.featureCard}>
              <IslamicPatterns variant="arabesque" opacity={0.05} />
              <span className={styles.featureIcon}>🌍</span>
              <h3 className={styles.featureTitle}>Multi-Currency</h3>
              <p className={styles.featureText}>
                Calculate in your local currency with automatic conversions
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Islamic Values Section */}
      <section className={styles.valuesSection}>
        <IslamicPatterns variant="mandala" opacity={0.06} />
        <div className={styles.valuesContent}>
          <IslamicMotif size="medium" variant="lantern" animated={true} />
          <ArabicCalligraphy text="zakat" position="center" />
          <h2 className={styles.valuesTitle}>Purify Your Wealth</h2>
          <p className={styles.valuesText}>
            "The believer's shade on the Day of Resurrection will be his charity."
          </p>
          <p className={styles.valuesSource}>- Prophet Muhammad (ﷺ)</p>
        </div>
      </section>

      {/* CTA Section with Islamic Design */}
      <section className={styles.cta}>
        <IslamicPatterns variant="header" opacity={0.1} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaMotifs}>
            <IslamicMotif size="small" variant="dome" animated={true} />
          </div>
          <h2 className={styles.ctaTitle}>Ready to Calculate Your Zakat?</h2>
          <p className={styles.ctaText}>
            Join thousands of Muslims who trust our calculator for accurate Zakat calculation
          </p>
          <ArabicCalligraphy text="barakallah" position="center" />
          <Link href="/calculator" className={styles.ctaButton}>
            <span>Get Started</span>
            <span className={styles.buttonArrow}>→</span>
          </Link>
          
          {/* Decorative bottom ornament */}
          <div className={styles.bottomOrnament}>
            <span className={styles.ornament}>✦</span>
          </div>
        </div>

      </section>
      <RamadanDashboard />
      <Ramadaneducation />
    </Layout>
  );
};

export default Home;