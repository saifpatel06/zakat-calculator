import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/404/Error404.module.css';

const Custom404 = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [quote, setQuote] = useState(null);

  // Random Islamic quotes
  const islamicQuotes = [
    {
      text: "And whoever puts their trust in Allah, then He ˹alone˺ is sufficient for them.",
      source: "Quran 65:3"
    },
    {
      text: "Verily, with hardship comes ease.",
      source: "Quran 94:6"
    },
    {
      text: "So remember Me; I will remember you.",
      source: "Quran 2:152"
    },
    {
      text: "Allah does not burden a soul beyond that it can bear.",
      source: "Quran 2:286"
    }
  ];

  // Set random quote on client side only (fixes hydration error)
  useEffect(() => {
    setQuote(islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)]);
  }, []);

  // Auto redirect after countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Cancel auto redirect
  const cancelRedirect = () => {
    setCountdown(0);
  };

  // Popular pages to help users navigate
  const popularPages = [
    {
      icon: '🧮',
      title: 'Zakat Calculator',
      description: 'Calculate your Zakat obligation',
      link: '/calculator'
    },
    {
      icon: '📚',
      title: 'About Zakat',
      description: 'Learn about Zakat rules and guidelines',
      link: '/about'
    },
    {
      icon: '🌙',
      title: 'Ramadan Dashboard',
      description: 'Prayer times and daily activities',
      link: '/ramadan'
    },
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Frequently asked questions',
      link: '/faq'
    }
  ];

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Mercy Oceans</title>
        <meta name="description" content="The page you're looking for doesn't exist. Navigate to our main pages." />
      </Head>

      <div className={styles.container}>
        <div className={styles.errorCard}>
          
          {/* Decorative Pattern */}
          <div className={styles.decorativePattern}></div>

          {/* Error Icon & Number */}
          <div className={styles.errorHeader}>
            <div className={styles.iconWrapper}>
              <span className={styles.compassIcon}>🧭</span>
            </div>
            <h1 className={styles.errorNumber}>404</h1>
            <h2 className={styles.errorTitle}>Page Not Found</h2>
            <p className={styles.errorSubtitle}>
              The path you're seeking doesn't exist in our directory
            </p>
          </div>

          {/* Islamic Quote */}
          {quote && (
            <div className={styles.quoteSection}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quoteText}>{quote.text}</p>
              <p className={styles.quoteSource}>— {quote.source}</p>
            </div>
          )}

          {/* Auto Redirect Counter */}
          {countdown > 0 && (
            <div className={styles.redirectBox}>
              <div className={styles.redirectContent}>
                <span className={styles.redirectIcon}>⏱️</span>
                <div>
                  <div className={styles.redirectText}>
                    Redirecting to home page in <strong>{countdown}</strong> seconds
                  </div>
                  <button onClick={cancelRedirect} className={styles.cancelButton}>
                    Stay on this page
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Options */}
          <div className={styles.navigationSection}>
            <h3 className={styles.navigationTitle}>Where would you like to go?</h3>
            
            <div className={styles.quickLinks}>
              <Link href="/" className={styles.homeButton}>
                <span className={styles.buttonIcon}>🏠</span>
                Go to Homepage
              </Link>
              
              <button onClick={() => router.back()} className={styles.backButton}>
                <span className={styles.buttonIcon}>←</span>
                Go Back
              </button>
            </div>

            {/* Popular Pages */}
            <div className={styles.popularPages}>
              <h4 className={styles.pagesTitle}>Popular Pages</h4>
              <div className={styles.pagesGrid}>
                {popularPages.map((page, index) => (
                  <Link href={page.link} key={index} className={styles.pageCard}>
                    <span className={styles.pageIcon}>{page.icon}</span>
                    <div className={styles.pageContent}>
                      <div className={styles.pageTitle}>{page.title}</div>
                      <div className={styles.pageDescription}>{page.description}</div>
                    </div>
                    <span className={styles.pageArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className={styles.helpSection}>
            <div className={styles.helpCard}>
              <span className={styles.helpIcon}>💬</span>
              <div className={styles.helpContent}>
                <h4 className={styles.helpTitle}>Still need help?</h4>
                <p className={styles.helpText}>
                  If you believe this is an error, please let us know through our feedback form.
                </p>
                <Link href="/feedback" className={styles.helpLink}>
                  Report Issue →
                </Link>
              </div>
            </div>
          </div>

          {/* Search Suggestions */}
          <div className={styles.searchSection}>
            <h4 className={styles.searchTitle}>What were you looking for?</h4>
            <div className={styles.searchTags}>
              <Link href="/calculator" className={styles.tag}>Zakat Calculator</Link>
              <Link href="/about" className={styles.tag}>Zakat Rules</Link>
              <Link href="/ramadan" className={styles.tag}>Prayer Times</Link>
              <Link href="/about#nisab" className={styles.tag}>Nisab Threshold</Link>
              <Link href="/about#recipients" className={styles.tag}>Zakat Recipients</Link>
              <Link href="/faq" className={styles.tag}>FAQ</Link>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className={styles.footerNote}>
          <p>
            May Allah guide us on the right path. If you need assistance, feel free to{' '}
            <Link href="/feedback" className={styles.footerLink}>contact us</Link>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Custom404;