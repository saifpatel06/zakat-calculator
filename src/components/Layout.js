import Header from './Header';
import styles from '../../styles/Layout.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <Image 
              src="/website-logo.png" 
              alt="Zakat Calculator Logo" 
              width={100}
              height={100} 
              className={styles.footerLogo} 
            />
            <p className={styles.footerText}>
              Calculate your Zakat accurately according to Islamic principles.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/calculator">Calculator</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Resources</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/about">About Zakat</Link></li>
              <li><Link href="/feedback">Feedback</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2026 Universal Zakat Calculator | Secure & Universal Calculation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;